import { Request, Response, NextFunction } from 'express';
import Product from '../domain/Product/Product';
import statusCodes from '../constants/statusCodes';
import User from '../domain/User/User';
import {
    validateBody,
    validateString,
    validateObjectId,
} from '../utils/validator';

export const productValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!validateBody(['name', 'price', 'desc', 'stock'], req.body)) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide all required fields only',
        });
    }

    const { name, price, desc, stock } = req.body;

    try {
        validateString('name', name);
    } catch (error) {
        return res.status(statusCodes.badRequest).json({
            message: error.message,
        });
    }

    try {
        validateString('desc', desc);
    } catch (error) {
        return res.status(statusCodes.badRequest).json({
            message: error.message,
        });
    }

    try {
        const formatPrice = parseFloat(price);
        if (isNaN(formatPrice)) {
            throw new Error('Price must be a number');
        }
        req.body.price = formatPrice;
    } catch (error) {
        return res.status(statusCodes.badRequest).json({
            message: error.message,
        });
    }

    try {
        const formatStock = parseInt(stock);
        if (isNaN(formatStock)) {
            throw new Error('Stock must be a number');
        }
        req.body.stock = formatStock;
    } catch (error) {
        return res.status(statusCodes.badRequest).json({
            message: error.message,
        });
    }

    next();
};

export const productParamValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { productId } = req.params;

    if (!productId || !validateObjectId(productId)) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide a valid product id',
        });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(statusCodes.notFound).json({
            message: 'Product not found',
        });
    }
    next();
};

export const orderBodyValidator = (fields: string[]) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (!validateBody(fields, req.body)) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide all required fields only',
        });
    }

    const { productId, userId, quantity } = req.body;


    if (!productId || !validateObjectId(productId)) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide a valid product id',
        });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(statusCodes.notFound).json({
            message: 'Product not found',
        });
    }

    if (!userId || !validateObjectId(userId)) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide a valid user id',
        });
    }

    const user = await User.findOne({ $or: [{ _id: userId }, { email: userId }] });
    if (!user) {
        return res.status(statusCodes.notFound).json({
            message: 'User not found',
        });
    }

    if (fields.includes('quantity')) {
        const quantityInt = parseInt(quantity);
        if (isNaN(quantityInt)) {
            return res.status(statusCodes.badRequest).json({
                message: 'Quantity must be a number',
            });
        }
        req.body.quantity = quantityInt;
    }


    next();
};
