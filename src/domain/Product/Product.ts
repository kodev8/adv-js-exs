import { Document, Schema, model } from 'mongoose';

export interface Prouduct {
    name: string;
    desc: string;
    price: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface ProuductDocument extends Prouduct, Document {}

const productSchema: Schema = new Schema(
    {
        name: { type: String, required: [true, 'name is required'] },
        desc: { type: String, required: [true, 'desc is required'] },
        price: { type: Number, required: [true, 'price is required'] },
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

export default model<ProuductDocument>('Product', productSchema);
