import Categories from "@/components/home/Categories";
import Feature from "@/components/home/Feature";
import HeroSection from "@/components/home/HeroSection";
import NewArrival from "@/components/home/NewArrival";
import Promotion from "@/components/home/Promotion";
import TrendingProducts from "@/components/home/TrendingProducts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Feature />
      <Categories />
      <NewArrival />
      <Promotion />
      <TrendingProducts />
    </>
  );
}
