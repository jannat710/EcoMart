import DynamicCategories from "@/components/modules/home/DynamicCategories";
import FeaturesProducts from "@/components/modules/home/FeatureProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Newsletter from "@/components/modules/home/Newsletter";
import Offer from "@/components/modules/home/Offer";
import Pricings from "@/components/modules/home/Pricings";
import Testimonials from "@/components/modules/home/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesProducts />
      <DynamicCategories />
      <Offer />
      <HowItWorks />
      <Pricings />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;
