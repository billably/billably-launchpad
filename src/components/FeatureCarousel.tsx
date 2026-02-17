import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BillAnalysisCard, TimelineCard, CounselCard } from "./FeatureCards";

const FeatureCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const cards = [
    <BillAnalysisCard key="bill" />,
    <TimelineCard key="timeline" />,
    <CounselCard key="counsel" />,
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {cards.map((card, i) => (
          <div key={i} className="flex-[0_0_100%] min-w-0">
            <div className="glass-card rounded-xl overflow-y-auto font-inter" style={{ lineHeight: '1.5' }}>
              {card}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
