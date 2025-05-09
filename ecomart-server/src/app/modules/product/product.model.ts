import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => val.length > 0,
        message: 'At least one image is required',
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: {
        values: [
          'Grocery',
          'Electronics',
          'Clothing',
          'Beauty',
          'Home',
          'Sports',
        ],
        message: '{VALUE} is not a valid category',
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
    },
    totalReviews: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProduct>('Product', productSchema);
export default Product;
