import { Response, Request, Router } from 'express';
import UserService from '../domain/User/UserService';
import statusCodes from '../constants/statusCodes';
import {
    userParamValidator,
    userBodyValidator,
} from '../middleware/userValidator';

const userService = new UserService();

const addUser = async (req: Request, res: Response): Promise<Response> => {
    const { fname, lname, email } = req.body;

    try {
        await userService.addUser(fname, lname, email);
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: 'Unable to add user',
        });
    }
    return res.status(statusCodes.created).json({
        message: 'User added successfully',
    });
};

const removeUser = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;
    try {
        await userService.deleteUser(userId);
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: 'Unable to delete user',
        });
    }
    await userService.deleteUser(userId);
    return res.status(statusCodes.success).json({
        message: 'User removed successfully',
    });
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;
    const { fname, lname, email } = req.body;

    try {
        await userService.updateUser(userId, fname, lname, email);
    } catch (error) {
        return res.status(statusCodes.serverError).json({
            message: 'Unable to update user',
        });
    }
    return res.status(statusCodes.success).json({
        message: 'User updated successfully',
    });
};

const getUsers = async (_req: Request, res: Response): Promise<Response> => {
    const users = await userService.getUsers();
    return res.status(statusCodes.success).json({
        users,
    });
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
    return res.status(statusCodes.success).json({
        user: req.body.user,
    });
};

const userRoutes = Router();

userRoutes.post('/', userBodyValidator, addUser);
userRoutes.delete('/:userId', userParamValidator, removeUser);
userRoutes.put('/:userId', userBodyValidator, userParamValidator, updateUser);
userRoutes.get('/', getUsers);
userRoutes.get('/:userId', userParamValidator, getUser);

export default userRoutes;
