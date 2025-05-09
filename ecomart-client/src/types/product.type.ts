export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  images?: string[];
  price: number;
  category:
    | "Grocery"
    | "Electronics"
    | "Clothing"
    | "Beauty"
    | "Home"
    | "Sports";
  description: string;
  quantity: number;
  inStock: boolean;
  rating?: number;
  totalReviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
