import { Receipt, Map, Handshake } from "lucide-react";

const BillAnalysisCard = () => {
  const examples = [
    {
      matter: "Merger & Acquisition — TechCorp",
      firm: "Sterling & Associates",
      issue: "Junior associates billed at senior rates",
      savings: "$12,000",
    },
    {
      matter: "Employment Contract Review",
      firm: "Harper & Mills LLP",
      issue: "Partner billing for template work",
      savings: "$5,200",
    },
    {
      matter: "Series A Financing Documents",
      firm: "Caldwell Partners",
      issue: "Excessive revision rounds on standard terms",
      savings: "$8,400",
    },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Receipt className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Stop Overpaying for Legal Work</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Instantly analyze legal bills, flag inflated time entries, and get AI-generated language you can send directly to your law firm.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-1">
        {examples.map((ex, i) => (
          <div key={i} className="bg-card rounded-lg p-4 shadow-sm border border-border/50">
            <p className="font-semibold text-sm text-card-foreground">{ex.matter}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{ex.firm}</p>
            <p className="text-xs text-destructive font-medium mt-1.5">{ex.issue}</p>
            <div className="flex items-center justify-between mt-2.5">
              <span className="text-xs font-medium bg-savings text-savings-foreground px-3 py-1 rounded-full">
                Savings: {ex.savings}
              </span>
              <span className="text-xs font-medium text-primary cursor-pointer hover:underline">sample email</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimelineCard = () => {
  const milestones = [
    {
      period: "Next 30 days",
      title: "HIPAA Business Associate Agreements (BAAs)",
      status: "⚠️ Action needed",
      statusColor: "text-warning",
      requirement: "Required before: Pilot launch with beta users",
      cost: "$2,500–$4,000",
      actions: ["find template", "get counsel"],
    },
    {
      period: "Next 60 days",
      title: "New York DFS Cybersecurity Regulation Compliance",
      status: "📅 Coming up",
      statusColor: "text-primary",
      requirement: "Required before: Storing patient health data",
      cost: "$6,000–$10,000",
      actions: ["view requirements", "get quote"],
    },
    {
      period: "Next 90 days",
      title: "FDA Software as Medical Device (SaMD) Assessment",
      status: "🔍 Plan ahead",
      statusColor: "text-muted-foreground",
      requirement: "Required if: App provides diagnostic recommendations",
      cost: "$12,000–$18,000",
      actions: ["check eligibility", "schedule consult"],
    },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Map className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Stay Ahead of Your Legal Timeline</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Personalized compliance roadmap with key deadlines, cost estimates, and direct connections to counsel.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-1">
        {milestones.map((m, i) => (
          <div key={i} className="bg-card rounded-lg p-4 shadow-sm border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium bg-savings text-savings-foreground px-2.5 py-0.5 rounded-full">{m.period}</span>
              <span className={`text-xs font-medium ${m.statusColor}`}>{m.status}</span>
            </div>
            <p className="font-semibold text-sm text-card-foreground mt-2">{m.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.requirement}</p>
            <p className="text-xs text-muted-foreground">Estimated cost: {m.cost}</p>
            <div className="flex gap-3 mt-2.5">
              {m.actions.map((action) => (
                <span key={action} className="text-xs font-medium text-primary cursor-pointer hover:underline">{action}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm font-medium text-primary cursor-pointer hover:underline mt-auto">
        View full 12-month roadmap →
      </p>
    </div>
  );
};

const CounselCard = () => {
  const firms = [
    {
      matter: "Seed financing documents",
      stage: "Pre-seed",
      firm: "Chen & Partners",
      fit: "100+ Seed deals, avg. $12K all-in",
      rating: 5.0,
      review: "Transparent, fast, founder-friendly",
      action: "request intro",
    },
    {
      matter: "Employment agreements (5 hires)",
      stage: "Pre-seed, 8 employees",
      firm: "Prakash Legal",
      fit: "Flat $3K for standard package, 48hr turnaround",
      rating: 4.5,
      review: "Great for early-stage templates",
      action: "get quote",
    },
  ];

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span className="text-warning text-xs">
        {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
        <span className="text-muted-foreground ml-1">({rating})</span>
      </span>
    );
  };

  return (
    <div className="h-full flex flex-col gap-4 p-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Handshake className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Find the Right Counsel</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Connect with vetted counsel who understand startups, with transparent pricing and proven track records at your stage.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-1">
        {firms.map((f, i) => (
          <div key={i} className="bg-card rounded-lg p-4 shadow-sm border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium bg-savings text-savings-foreground px-2.5 py-0.5 rounded-full">{f.stage}</span>
            </div>
            <p className="font-semibold text-sm text-card-foreground mt-2">{f.matter}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Firm match: <span className="text-card-foreground font-medium">{f.firm}</span></p>
            <p className="text-xs text-primary/80 bg-primary/5 rounded px-2 py-1 mt-1.5">{f.fit}</p>
            <div className="flex items-center justify-between mt-2.5">
              <div className="flex flex-col">
                {renderStars(f.rating)}
                <span className="text-xs text-muted-foreground italic mt-0.5">"{f.review}"</span>
              </div>
              <span className="text-xs font-medium text-primary cursor-pointer hover:underline">{f.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { BillAnalysisCard, TimelineCard, CounselCard };
