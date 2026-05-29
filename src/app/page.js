import Features from "@/components/Features";
import PricingCard from "@/components/PricingCard";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div>
      <StatsSection />

      <Features />
      <PricingCard />
    </div>
  );
}
