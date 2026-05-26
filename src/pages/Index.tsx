import { Hero } from "@/components/protocol/Hero";
import { Stages } from "@/components/protocol/Stages";
import { Scripts } from "@/components/protocol/Scripts";
import { PublicReplies } from "@/components/protocol/PublicReplies";
import { QuickReplies } from "@/components/protocol/QuickReplies";
import { ReplyFormulator } from "@/components/protocol/ReplyFormulator";
import { Scales } from "@/components/protocol/Scales";
import { Anamnese } from "@/components/protocol/Anamnese";
import { PsychOutreach } from "@/components/protocol/PsychOutreach";
import { Services } from "@/components/protocol/Services";
import { Faqs } from "@/components/protocol/Faqs";
import { Footer } from "@/components/protocol/Footer";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Hero />
    <Stages />
    <Scripts />
    <PublicReplies />
    <QuickReplies />
    <ReplyFormulator />
    <Scales />
    <Anamnese />
    <PsychOutreach />
    <Services />
    <Faqs />
    <Footer />
  </main>
);

export default Index;

