"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddWishlistButton({
  productId,
  userId,
}: {
  productId: string;
  userId: string | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addWishlist = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        console.error("Failed to add wishlist:", result.error);
        toast.error("Failed to add to wishlist.");
      } else {
        console.log("Wishlist added successfully:", result);
        toast.success("Wishlist added successfully!");
        router.push(`/wishlists/${userId}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding wishlist:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div>
      <Button onClick={addWishlist} disabled={loading}>
        {loading ? "Adding..." : "Add to Wishlist"}
      </Button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        theme="colored"
      />
    </div>
  );
}
