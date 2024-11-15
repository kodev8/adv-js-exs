import { Response, Request, Router } from 'express';
import ProductService from '../domain/Product/ProductService';
import statusCodes from '../constants/statusCodes';
import {
    productValidator,
    productParamValidator,
} from '../middleware/productValidator';

const productService = new ProductService();

const addProduct = async (req: Request, res: Response): Promise<Response> => {
    const { name, price, desc } = req.body;

    try {
        await productService.addProduct(name, desc, price);
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: 'Unable to add product',
        });
    }

    return res.status(statusCodes.success).json({
        message: 'Product added successfully',
    });
};

const removeProduct = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { productId } = req.params;

    try {
        await productService.removeProduct(productId);
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: 'Unable to remove product',
        });
    }

    return res.status(statusCodes.success).json({
        message: 'Product removed successfully',
    });
};

const updateProduct = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { productId } = req.params;
    const { name, price, desc } = req.body;

    try {
        await productService.updateProduct(productId, name, price, desc);
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: 'Unable to update product',
        });
    }

    return res.status(statusCodes.success).json({
        message: 'Product updated successfully',
    });
};

const getProducts = async (_req: Request, res: Response): Promise<Response> => {
    const products = await productService.getProducts();
    return res.status(statusCodes.success).json({
        products,
    });
};

const getProduct = async (req: Request, res: Response): Promise<Response> => {
    const { productId } = req.params;
    const product = await productService.getProduct(productId);
    return res.status(statusCodes.success).json({
        product,
    });
};
const productRoutes = Router();

productRoutes.post('/', productValidator, addProduct);
productRoutes.delete('/:productId', productParamValidator, removeProduct);
productRoutes.put(
    '/:productId',
    productParamValidator,
    productValidator,
    updateProduct
);
productRoutes.get('/', getProducts);
productRoutes.get('/:productId', productParamValidator, getProduct);

export default productRoutes;
