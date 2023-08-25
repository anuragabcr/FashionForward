import { getBillboard } from "@/actions/billboard";
import { getProducts } from "@/actions/products";
import Billboard from "@/components/Billboard";
import Container from "@/components/Container";
import ProductList from "@/components/ProductList";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("6569762a-7f9a-43ab-89ae-896eee1e096c");

  const products = await getProducts({ isFeatured: true });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
