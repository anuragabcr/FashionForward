import { Product } from "@/types";
import qs from "query-string";

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export const getProduct = async (id: string): Promise<Product> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};
