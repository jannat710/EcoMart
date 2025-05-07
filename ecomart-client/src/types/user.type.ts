export interface IUser {
  userId: string;
  name?: string;
  email?: string;
  role: "admin" | "customer";
  _id?: string;
  isActive?: boolean;
}
