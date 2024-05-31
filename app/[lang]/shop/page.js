import ShopProductContainer from "@/components/shop/ShopProductContainer";
import { Suspense } from "react";

export default async function ShopPage({ searchParams }) {
  return (
    <Suspense fallback={<h1>Loading products...</h1>}>
      <ShopProductContainer searchParams={searchParams} />
    </Suspense>
  );
}
