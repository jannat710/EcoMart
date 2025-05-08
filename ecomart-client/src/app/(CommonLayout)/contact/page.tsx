import SectionBanner from "@/components/ui/core/SectionBannar";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div>
      <SectionBanner title="Contact Us" subtitle="Home" />
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 w-full px-4 md:px-0 mx-auto gap-10 md:gap-32 min-h-screen justify-center items-center">
        <div>
          <h2 className="text-2xl pt-4 md:pt-0 md:text-3xl font-bold ">
            Contact Us
          </h2>
          <p className="pt-6 pb-12 ">
            {"We'd"} love to hear from you! Whether you have questions about our
            eco-friendly products, need assistance with an order, or want to
            partner with us as a vendor — feel free to reach out anytime.
          </p>
          <div className="grid grid-cols-1 gap-10">
            <div className="flex items-center gap-6">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm ">Email</p>
                <Link
                  href="mailto:info@bikeshop.com"
                  className=" hover:underline"
                >
                  info@ecomart.com
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm ">Phone</p>
                <Link href="tel:+61406000000" className="hover:underline">
                  +23 200 000 000
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm">Location</p>
                <p className="">Dhaka,Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full h-[334px] lg:h-[600px] pb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29203.581321715606!2d90.36759040000001!3d23.802675200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1746711355720!5m2!1sen!2sbd
"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl shadow-lg w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
