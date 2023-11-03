"use client";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import Button from "./Button";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

const NavbarActions = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const cart = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {!isLoaded || !userId ? (
        <Button
          className=" bg-slate-300 text-green-700"
          onClick={() => router.push("/sign-in")}
        >
          Login
        </Button>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
      {userId && (
        <Button
          className=" bg-slate-100 text-black"
          onClick={() => router.push("/orders")}
        >
          Orders
        </Button>
      )}
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
