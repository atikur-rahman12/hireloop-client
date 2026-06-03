import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.4.4"]);

import Features from "@/components/Features";
import NextRole from "@/components/NextRole";
import PricingCard from "@/components/PricingCard";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div>
      <StatsSection />

      <Features />
      <PricingCard />
      <NextRole />
    </div>
  );
}
