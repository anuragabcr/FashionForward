import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);

  return res.json();
};

export const getCategory = async (id: string): Promise<Category> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};
