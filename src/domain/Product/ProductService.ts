import Product from './Product';
import Observable from '../../observable/Observable';
import User from '../User/User';
import dotenv from 'dotenv';

dotenv.config();

class ProductService {
    observable: Observable;
    constructor() {
        this.observable = new Observable();
    }
    async addProduct(name: string, desc: string, price: number, stock: number) {
        const product = new Product({ name, desc, price, stock });
        await product.save();
        return product;
    }

    async removeProduct(productId: string) {
        const product = await Product.findByIdAndDelete(productId);
        return product;
    }

    async updateProduct(
        productId: string,
        name: string,
        price: number,
        desc: string
    ) {
        const product = await Product.findByIdAndUpdate(
            productId,
            { name, price, desc },
            { new: true }
        );
        return product;
    }

    async getProducts() {
        return await Product.find();
    }

    async getProduct(productId: string) {
        return await Product.findById(productId);
    }

    async makeOrder(productId: string, userId: string, quantity: number) {
        const product = await Product.findById(productId);
        const remainingStock = product.stock - quantity;

        if (remainingStock < 0) {
            throw new Error('Not enough stock');
        }

        await User.findOneAndUpdate(
            {
                $or: [{ _id: userId }, { email: userId }],
            },
            {
                $push: {
                    orders: {
                        product: product._id,
                        quantity,
                    },
                },
            },
            { new: true }
        );

        product.stock = remainingStock;
        await product.save();

        if (remainingStock <= 5) {
            this.observable.notify({
                type: 'order',
                meta: { productId }, 
                message: `Product: ${product.name} Low stock`
            });
        }

    }

    async addToCart(productId: string, userId: string) {
        const user = await User.findOne({
            $or: [{ _id: userId }, { email: userId }],
        });

        user.meta = { productId };
        this.observable.subscribe(user)
    }

}

export default ProductService;
