"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWishlistButton({
  userId,
}: {
  userId: string | undefined;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/wishlists/${userId}`, {
        method: "DELETE",
        credentials: "include", // Ensures cookies are included in the request
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Failed to delete wishlist:", result.error);
      } else {
        console.log("Wishlist deleted successfully:", result.message);
        router.push(`/wishlists/${userId}`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={deleteWishlist}>
      <Button type="submit" disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
