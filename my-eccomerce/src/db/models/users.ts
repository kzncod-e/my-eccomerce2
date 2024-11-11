import { getDb } from "../config";

import { Db, ObjectId } from "mongodb";
import { hash } from "@/helpers/bcrypt";

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type UserType = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};
type uniqueUser = {
  username: string;
  email: string;
};
export type UserLogin = {
  username: string;
  email: string;
  password: string;
};
export type UserInput = Omit<UserType, "_id">;
export const getUser = async () => {
  const db: Db = await getDb();
  const user = db.collection("Users");
  return user;
};

export const createUser = async (user: UserInput) => {
  const modifierUser: UserInput = {
    ...user,
    password: hash(user.password),
  };

  const userCollection = await getUser();
  const User = await userCollection.insertOne(modifierUser);
  return User;
};
type inputLogin = Omit<UserLogin, "username">;
export const findUser = async (user: inputLogin) => {
  const userCollection = await getUser();
  const User = (await userCollection.findOne({
    email: user.email,
  })) as UserType;
  // if (!User) {
  //   throw new Error("Username not found");
  // }

  return User;
};
