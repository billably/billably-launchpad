import { Button } from "@/components/ui/button";
import FeatureCarousel from "@/components/FeatureCarousel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row container max-w-6xl mx-auto px-6 py-12 lg:py-20 gap-10 lg:gap-12">
        {/* Hero - Left */}
          <div className="flex flex-col justify-center lg:w-1/2 gap-6 font-display">
          <h1 className="text-4xl lg:text-5xl font-semibold gradient-text leading-tight mb-6">billably</h1>
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground leading-snug">
            AI-powered legal operations platform designed for founders
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            Slash legal bills, navigate compliance, and manage all legal work in one place — including connections to vetted law firms when you need them. Move faster, spend less, stay protected — without the overhead.
          </p>
          <div>
            <Button size="lg" className="text-sm font-medium px-8">
              Join the waitlist
            </Button>
          </div>
        </div>

        {/* Feature Carousel - Right */}
        <div className="lg:w-1/2">
          <FeatureCarousel />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
