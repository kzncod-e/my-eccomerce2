import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./helpers/jwt";

// Ingat: middleware hanya bisa ada satu
export const middleware = async (request: NextRequest) => {
  // Log all requests except specific static or image files
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("/favicon.ico") &&
    !request.url.includes("/products/limit")
  ) {
    console.log(request.method, request.url, "ini url");
  }

  // Handle authorization for all wishlists endpoints, both in `/api` and without `/api`
  if (
    request.url.includes("wishlists") ||
    request.url.includes("/api/wishlists")
  ) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    if (!token) {
      // return NextResponse.json({
      //   statusCode: 401,
      //   error: "Unauthorized",
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, request.url)
      );
      // });
    }
    const tokenData = await verifyTokenJose<{ id: string; email: string }>(
      token.value
    );

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.payload.id);
    requestHeaders.set("x-user-email", tokenData.payload.email);
    return NextResponse.next({
      headers: requestHeaders,
    });
  }
  return NextResponse.next();
};
