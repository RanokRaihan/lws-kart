import Categories from "@/components/home/Categories";
import Feature from "@/components/home/Feature";
import HeroSection from "@/components/home/HeroSection";
import NewArrival from "@/components/home/NewArrival";
import Promotion from "@/components/home/Promotion";
import TrendingProducts from "@/components/home/TrendingProducts";
export const metadata = {
  title: "Home | lws cart",
  description:
    "Enjoy seamless shopping, secure payments, and fast deliveries.Discover deals, discounts, and exclusive offers just for you!Shop with us and experience the future of ecommerce, today!",
  openGraph: {
    images: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
};
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
