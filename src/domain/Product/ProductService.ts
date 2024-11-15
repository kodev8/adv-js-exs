import Product from './Product';
import dotenv from 'dotenv';
dotenv.config();

class ProductService {
    async addProduct(name: string, desc: string, price: number) {
        const product = new Product({ name, desc, price });
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
}

export default ProductService;
