import { createUser, getUser } from "@/db/models/users";
import { NextResponse } from "next/server";
import { z } from "zod";
export type myResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};
const userInputSchema = z.object({
  name: z.string(),
  username: z.string().min(1, "Username is required"),
  email: z.string().email(),
  password: z.string().min(5),
});
export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const userCollection = await getUser();
    //ma
    const parsedData = userInputSchema.safeParse(data);
    const uniqueEmail = await userCollection.findOne({
      email: parsedData.data?.email,
    });
    const uniqueUsername = await userCollection.findOne({
      email: parsedData.data?.username,
    });
    if (uniqueEmail) {
      throw new Error(" Email is already used");
    }
    if (uniqueUsername) {
      throw new Error("Username is already used");
    }
    if (!parsedData.success) throw parsedData.error;
    const user = await createUser(parsedData.data);

    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 201,
        message: "success create user",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;
      return NextResponse.json<myResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json<myResponse<never>>(
      {
        statusCode: 500,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
};
