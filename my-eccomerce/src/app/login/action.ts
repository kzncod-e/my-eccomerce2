"use server";
import { signToken } from "@/helpers/jwt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { findUser } from "@/db/models/users";
import { compare } from "@/helpers/bcrypt";
const handleFormAction = async (formData: FormData) => {
  "use server";

  let userInput = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const userInputSchema = z.object({
    email: z.string().email().min(1, "email is required"),
    password: z.string().trim().min(1, "password is required"),
  });
  let parsedData = userInputSchema.safeParse(userInput);

  if (!parsedData.success) {
    // !! Ingat, jangan di-throw kecuali ingin menghandle error di sisi client via error.tsx !
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    // Mengembalikan error via redirect
    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${errFinalMessage}`
    );
  }

  let user = await findUser(parsedData.data);
  if (!user) {
    const err: string = `username - username not found`;
    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=${err} `);
  }
  if (!compare(parsedData.data.password, user.password)) {
    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?error=Invalid%20password `
    );
  }
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = signToken(payload);
  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 120),
    sameSite: "strict",
  });
  redirect("/");
};
export default handleFormAction;