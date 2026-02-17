import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, CheckCircle2 } from "lucide-react";

const WaitlistForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    stage: "",
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.stage) errs.stage = "Select your company stage";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <section id="waitlist" className="py-20 px-6">
        <div className="max-w-[600px] mx-auto glass-card rounded-xl p-10 text-center space-y-4">
          <CheckCircle2 className="size-12 text-primary mx-auto" />
          <h3 className="text-2xl font-bold text-foreground">
            Thanks for joining!
          </h3>
          <p className="text-muted-foreground">
            Check your email for confirmation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-20 px-6">
      <div className="max-w-[600px] mx-auto bg-card border border-border shadow-2xl rounded-xl p-8 lg:p-10">
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground font-display">
            Request early access
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Company name"
              />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="website">Company Website</Label>
              <Input
                id="website"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="yourcompany.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Company Stage</Label>
            <Select
              value={form.stage}
              onValueChange={(v) => update("stage", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pre-seed">Pre-seed</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series-a">Series A+</SelectItem>
                <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
              </SelectContent>
            </Select>
            {errors.stage && (
              <p className="text-sm text-destructive">{errors.stage}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full text-base font-bold mt-2">
            Join the waitlist
            <Sparkles className="size-4" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default WaitlistForm;
