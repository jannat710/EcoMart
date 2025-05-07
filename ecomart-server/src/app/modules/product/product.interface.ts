export interface IProduct {
  name: string;
  brand: string;
  image?: string;
  price: number;
  category:
    | 'Grocery'
    | 'Electronics'
    | 'Clothing'
    | 'Beauty'
    | 'Home'
    | 'Sports';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
