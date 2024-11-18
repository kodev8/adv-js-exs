import { model, Document, Schema } from 'mongoose';
import { Subscriber, NotifyData } from 'src/observable/Observable';

type Order = {
    product: string;
    quantity: number;
}

export interface User extends Subscriber{
    fname: string;
    lname: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
    orders?: Order[];
}

const onNotify = (data: NotifyData) => {
    switch (data.type) {
        case 'order':
            console.log(data.message);
            break;
        default:
            console.log('Unknown event');
    }
}
export interface UserDocument extends User, Document {}

const userSchema: Schema = new Schema(
    {
        fname: { type: String, required: [true, 'fname is required'] },
        lname: { type: String, required: [true, 'lname is required'] },
        email: { type: String, required: [true, 'email is required'] },
        orders: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
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

userSchema.methods.onNotify = onNotify;

export default model<UserDocument>('User', userSchema);
