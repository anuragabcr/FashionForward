"use client";

import { useEffect, useState } from "react";

import CartItem from "./components/CartItem";
import Container from "@/components/Container";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export const revalidate = 0;

const CartPage = () => {
  const { userId } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setIsMounted(true);

    const loadInitialData = async () => {
      const response = await axios.get(`/api/orders?id=${userId}`);
      if (response.status == 200) setOrders(response.data);
    };
    loadInitialData();
  }, [userId]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Orders</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {orders.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul>
                {orders.map((order, index) => (
                  <CartItem key={index} data={order} setOrders={setOrders} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
