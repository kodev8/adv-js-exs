import { Request, Response, NextFunction } from 'express';
import statusCodes from '../constants/statusCodes';
import {
    validateName,
    validateEmail,
    validateBody,
    validateObjectId,
} from '../utils/validator';
import User from '../domain/User/User';

export const userBodyValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validFields = ['fname', 'lname', 'email'];
    if (!validateBody(validFields, req.body)) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide all required fields only',
        });
    }

    if (!validateEmail(req.body.email)) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide a valid email',
        });
    }

    if (await User.exists({ email: req.body.email })) {
        return res.status(statusCodes.badRequest).json({
            message: 'Email already exists',
        });
    }

    const { fname, lname } = req.body;

    if (!validateName(fname) || !validateName(lname)) {
        return res.status(statusCodes.badRequest).json({
            message:
                'First name and last name must be a string with no weird characters !',
        });
    }

    next();
};

export const userParamValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(statusCodes.badRequest).json({
            message: 'Please provide a valid user id',
        });
    }

    let user;
    if (validateObjectId(userId)) {
        user = await User.findById(userId);
    } else {
        user = await User.findOne({ email: userId });
    }

    if (!user) {
        return res.status(statusCodes.notFound).json({
            message: 'User not found',
        });
    }

    req.body.user = user;

    next();
};
