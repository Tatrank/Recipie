import { User } from "next-auth";

let IP_ADDRESS: string = "213.29.217.252";

export type FullRecepi = {
  image_url: string;
  image_key: string;
  description: string;
  time_difficulty: string;
  id: string;
  name: string;
  difficulty: string;
  disclaimer: string;
  userId: string;
  published: string;
  likes: Like[];
  comments: Comments[];
  categories: CategoriesType[];
  groceries_measueres: Groceries_measueres[];
  user: UserType;
};

export type Comments = {
  id: string;
  text: string;
  UserId: string;
  recipeId: string;
  User: UserType;
};

export type Groceries_measueres = {
  id: string;
  groceryId: string;
  measureId: string;
  grocery: Grocery;
  measure: Measure;
};

export type Grocery = {
  id: string;
  name: string;
};

export type Measure = {
  id: string;
  value: string;
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
  recipies: {}[];
  role: "user" | "admin" | "basic";
};
