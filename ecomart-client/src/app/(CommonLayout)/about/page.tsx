import SectionBanner from "@/components/ui/core/SectionBannar";

const AboutPage = () => {
  return (
    <div>
      <SectionBanner title="About Us" subtitle="Home" />
      <section className="bg-background text-foreground px-4 md:px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
          <div className="md:w-1/3">
            <h2 className="text-2xl md:text-3xl font-semibold uppercase">
              A Brief History
            </h2>
          </div>
          <div className="md:w-2/3 space-y-4 text-sm md:text-base text-muted-foreground">
            <p>
              Ecomart began with a mission to make everyday shopping smarter,
              simpler, and more sustainable. From fresh produce to everyday
              essentials, we bring quality products directly to your doorstep.
            </p>
            <p>
              Today, Ecomart serves thousands of happy customers across the
              country with a commitment to value, variety, and speed. We’re
              redefining convenience in online shopping — one order at a time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
