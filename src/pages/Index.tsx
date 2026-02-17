import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import FeatureCarousel from "@/components/FeatureCarousel";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top section — light background */}
      <div className="bg-background relative">
        {/* Login link */}
        <header className="container max-w-6xl mx-auto px-6 py-5 flex justify-end">
          <a
            href="/login"
            className="text-sm font-medium text-foreground border border-border rounded-lg px-4 py-2 hover:bg-accent transition-colors"
          >
            Log in
          </a>
        </header>

        {/* Hero */}
        <main className="flex flex-col lg:flex-row container max-w-6xl mx-auto px-6 pt-4 pb-32 lg:pb-40 gap-10 lg:gap-12">
          {/* Hero - Left */}
          <div className="flex flex-col justify-center lg:w-1/2 gap-6">
            <h1
              className="text-4xl lg:text-5xl font-black gradient-text leading-tight mb-6 font-display"
            >
              billably
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold text-foreground leading-snug">
              AI-powered legal operations platform designed for founders
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Slash legal bills, navigate compliance, and manage all legal work
              in one place — including connections to vetted law firms when you
              need them. Move faster, spend less, stay protected — without the
              overhead.
            </p>
            <div>
              <Button
                size="lg"
                className="text-base font-bold px-8"
                onClick={() =>
                  document
                    .getElementById("waitlist")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join the waitlist
                <Sparkles className="size-4" />
              </Button>
            </div>
          </div>

          {/* Feature Carousel - Right */}
          <div className="lg:w-1/2">
            <FeatureCarousel />
          </div>
        </main>
      </div>

      {/* Bottom section — deep background */}
      <div className="bg-surface-deep flex-1 relative">
        {/* Waitlist card floating over the split */}
        <div className="relative -mt-30 lg:-mt-42 z-10">
          <WaitlistForm />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
