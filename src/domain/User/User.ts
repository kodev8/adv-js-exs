import { model, Document, Schema } from 'mongoose';

export interface User {
    fname: string;
    lname: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserDocument extends User, Document {}

const userSchema: Schema = new Schema(
    {
        fname: { type: String, required: [true, 'fname is required'] },
        lname: { type: String, required: [true, 'lname is required'] },
        email: { type: String, required: [true, 'email is required'] },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        toJSON: {
            transform: (_doc, ret): void => {
                delete ret.__v;
            },
        },
    }
);

export default model<UserDocument>('User', userSchema);
