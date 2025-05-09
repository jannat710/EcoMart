import SectionTitle from "@/components/ui/core/SectionTitle";
import { Search, ShoppingCart, CreditCard, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Browse Our Products",
    desc: "Explore our wide range of fresh veggies, healthy meals, and tasty crops to suit your needs.",
    icon: Search, // Use directly imported icon
  },
  {
    title: "Add to Cart",
    desc: "Select your favorite products and add them to your cart with ease.",
    icon: ShoppingCart,
  },
  {
    title: "Choose Payment Method",
    desc: "Pay securely with a variety of options, including credit card, PayPal, or bank transfer.",
    icon: CreditCard,
  },
  {
    title: "Order Confirmation",
    desc: "Once your payment is confirmed, you’ll receive an order confirmation with delivery details.",
    icon: CheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <section>
      <SectionTitle
        title="How BasaFinder Works"
        subtitle="Easy steps to find, compare, and rent your next home"
      />

      <div className="bg-accent py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center px-4">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full shadow-md flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="uppercase text-primary text-sm tracking-widest font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
