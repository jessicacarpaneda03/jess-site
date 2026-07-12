import { Hero } from "@/components/protocol/Hero";
import { Stages } from "@/components/protocol/Stages";
import { Scripts } from "@/components/protocol/Scripts";
import { PublicReplies } from "@/components/protocol/PublicReplies";
import { QuickReplies } from "@/components/protocol/QuickReplies";
import { MessageLibrary } from "@/components/protocol/MessageLibrary";
import { ReplyFormulator } from "@/components/protocol/ReplyFormulator";
import { Scales } from "@/components/protocol/Scales";
import { Anamnese } from "@/components/protocol/Anamnese";
import { PsychOutreach } from "@/components/protocol/PsychOutreach";
import { DoctoraliaReviewReplies } from "@/components/protocol/DoctoraliaReviewReplies";
import { DoctoraliaTopics } from "@/components/protocol/DoctoraliaTopics";
import { BusinessCard } from "@/components/protocol/BusinessCard";
import { Services } from "@/components/protocol/Services";
import { Faqs } from "@/components/protocol/Faqs";
import { Footer } from "@/components/protocol/Footer";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Hero />
    <Stages />
    <Scripts />
    <PublicReplies />
    <DoctoraliaReviewReplies />
    <DoctoraliaTopics />
    <QuickReplies />
    <MessageLibrary />
    <ReplyFormulator />
    <Scales />
    <Anamnese />
    <PsychOutreach />
    <BusinessCard />
    <Services />
    <Faqs />
    <Footer />
  </main>
);

export default Index;

