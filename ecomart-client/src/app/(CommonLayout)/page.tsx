import HeroSection from "@/components/modules/home/HeroSection";
import Newsletter from "@/components/modules/home/Newsletter";
import Pricings from "@/components/modules/home/Pricings";
import Testimonials from "@/components/modules/home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <h1>Features Product</h1>
      <h1>How it works</h1>
      <h1>Dynamic Categories</h1>
      <h1>Offer</h1>
      <Pricings />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;
