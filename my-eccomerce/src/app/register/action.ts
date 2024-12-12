import { MyResponse } from "@/db/models/users";

import { redirect } from "next/navigation";

const handleFormAction = async (formData: FormData) => {
  "use server";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      method: "POST",
      // Karena backendnya menerima tipe data "json" (lihat function POST pada /src/routes/users/route.ts), maka kita harus menerima bodynya dalam bentuk json juga.const
      body: JSON.stringify({
        name: formData.get("name")!,
        username: formData.get("username")!,
        email: formData.get("email")!,
        password: formData.get("password")!,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseJson: MyResponse<unknown> = await response.json();
  if (!response.ok) {
    let message = responseJson.error ?? "Something went wrong!";

    return redirect(`/register?error=${encodeURIComponent(message)}`);
  }
  return redirect("/login");
};
export default handleFormAction;
