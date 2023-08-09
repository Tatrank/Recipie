import { User } from "next-auth";

export type FullRecepi = {
  id: string;
  name: string;
  difficulty: string;
  disclaimer: string;
  userId: string;
  published: string;
  likes: Like[];
  categories: CategoriesType[];
  groceries_measueres: Groceries_measueres[];
  user: UserType;
};

export type Groceries_measueres = {
  id: string;
  groceryId: string;
  measureId: string;
};

export type CategoriesType = {
  id: string;
  name: string;
};

export type Like = {
  id: string;
  UserId: string;
  recipeId: string;
};
export type UserType = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: "user" | "admin" | "basic";
};
