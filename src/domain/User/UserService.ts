import User from './User';

class UserService {
    addUser = async (fname: string, lname: string, email: string) => {
        const user = new User({ fname, lname, email });
        await user.save();
    };

    deleteUser = async (userId: string) => {
        await User.findByIdAndDelete(userId);
    };

    updateUser = async (
        userId: string,
        fname: string,
        lname: string,
        email: string
    ) => {
        // await User.findByIdAndUpdate(userId, { fname, lname, email });
        await User.updateOne(
            { $or: [{ _id: userId }, { email: userId }] },
            { fname, lname, email }
        );
    };

    getUsers = async () => {
        return await User.find();
    };

    getUser = async (userId: string) => {
        return await User.findById(userId);
    };
}

export default UserService;
