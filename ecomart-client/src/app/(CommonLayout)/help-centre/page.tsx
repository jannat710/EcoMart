import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionBanner from "@/components/ui/core/SectionBannar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function InformationPage() {
  // FAQ Data
  const faqData = [
    {
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign Up' button at the top right and fill out your personal details. You'll get access to exclusive deals and faster checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit/debit cards, mobile banking, bKash, Nagad, and digital wallets through our secure checkout.",
    },
    {
      question: "How can I sell my products on EcoMart?",
      answer:
        "Register as a vendor, go to your dashboard, and click on 'Add Product'. Provide accurate details and images, then submit for listing approval.",
    },
    {
      question: "When will I receive my order?",
      answer:
        "Orders are usually delivered within 1-3 business days depending on your location. You’ll receive tracking updates once your order is dispatched.",
    },
    {
      question: "Can I cancel or return a product?",
      answer:
        "Yes, you can request cancellation or return within 7 days of delivery, subject to our return policy. Go to 'My Orders' to initiate a return.",
    },
  ];

  // Privacy Policy Data
  const privacyPolicySections = [
    {
      title: "Information Collection",
      content:
        "We collect information such as name, email, contact number, and delivery address when you register, place orders, or subscribe to newsletters.",
    },
    {
      title: "Data Usage",
      content:
        "Your data helps us personalize your shopping experience, process your orders, and offer customer support. We never share your personal info with third parties without your consent.",
    },
    {
      title: "Cookies",
      content:
        "EcoMart uses cookies to remember your preferences, show personalized offers, and analyze website traffic. You can adjust your cookie settings anytime in your browser.",
    },
    {
      title: "Security",
      content:
        "We use SSL encryption, secure servers, and routine monitoring to protect your data. Your payment details are processed by certified third-party providers.",
    },
    {
      title: "Changes to Policy",
      content:
        "We may update this privacy policy occasionally. All changes will be posted here and, if significant, notified to you via email or pop-ups.",
    },
  ];

  // News Data
  const newsItems = [
    {
      title: "EcoMart Now Offers Same-Day Delivery",
      date: "April 25, 2025",
      content:
        "We’re excited to launch same-day delivery in select cities. Place your order before 12 PM and get it by evening!",
    },
    {
      title: "Scheduled Platform Maintenance",
      date: "April 10, 2025",
      content:
        "EcoMart will undergo routine maintenance on April 15th, 1:00 AM - 3:00 AM. Some features may be temporarily unavailable.",
    },
    {
      title: "New Vendor Partnership Program",
      date: "March 20, 2025",
      content:
        "We're welcoming more local organic vendors. If you're a small business looking to grow online, join our vendor program today!",
    },
  ];

  return (
    <div className="container">
      <SectionBanner subtitle="Home" title="Information Center" />

      {/* FAQ Section */}
      <section className="my-12 grid md:grid-cols-2" id="faq">
        <div className=" md:w-2/3 pr-14">
          <h2 className="text-3xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground ">
            Looking for answers ? Check if you find them here or{" "}
            <Link href="contact">
              {" "}
              <span className="font-bold hover:underline">Contact Us</span>
            </Link>
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator className="my-8" />

      {/* Privacy Policy */}
      <section className="mb-16" id="privacy">
        <h2 className="text-3xl font-semibold mb-6">Privacy Policy</h2>
        <div className=" p-6 rounded-lg shadow-sm border">
          {privacyPolicySections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-medium mb-3">{section.title}</h3>
              <p className="text-gray-400">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* News Section */}
      <section id="news">
        <h2 className="text-3xl font-semibold mb-6">Latest News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {newsItems.map((news, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
                <p className="text-sm text-gray-400">{news.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 line-clamp-3">{news.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
