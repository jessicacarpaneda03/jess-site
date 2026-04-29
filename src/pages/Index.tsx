import { Hero } from "@/components/protocol/Hero";
import { Stages } from "@/components/protocol/Stages";
import { Scripts } from "@/components/protocol/Scripts";
import { PublicReplies } from "@/components/protocol/PublicReplies";
import { Services } from "@/components/protocol/Services";
import { Faqs } from "@/components/protocol/Faqs";
import { Footer } from "@/components/protocol/Footer";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Hero />
    <Stages />
    <Scripts />
    <PublicReplies />
    <Services />
    <Faqs />
    <Footer />
  </main>
);

export default Index;

