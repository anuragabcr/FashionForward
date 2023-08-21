import { getBillboard } from "@/actions/billboard";
import { getProducts } from "@/actions/products";
import Billboard from "@/components/Billboard";
import Container from "@/components/Container";
import ProductList from "@/components/ProductList";

const HomePage = async () => {
  const billboard = await getBillboard("913fb373-d9cb-41b3-8232-3f9ef36b2a82");

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
