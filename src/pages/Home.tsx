import NewsletterHeader from "@/components/newsletter/NewsletterHeader";
import HeroIntro from "@/components/newsletter/HeroIntro";
import QuotationsPanel from "@/components/newsletter/QuotationsPanel";
import NewsHighlights from "@/components/newsletter/NewsHighlights";
import InsightsForecast from "@/components/newsletter/InsightsForecast";
import BrokersTeam from "@/components/newsletter/BrokersTeam";
import SubscribeSection from "@/components/newsletter/SubscribeSection";
import NewsletterFooter from "@/components/newsletter/NewsletterFooter";
import LGPDConsentBanner from "@/components/newsletter/LGPDConsentBanner";
import ExitIntentPopup from "@/components/newsletter/ExitIntentPopup";
import FirstClickPopup from "@/components/newsletter/FirstClickPopup";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E8]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NewsletterHeader />
      <HeroIntro />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Painel de Cotações full width */}
        <div className="mb-10">
          <QuotationsPanel />
        </div>

        {/* Conteúdo full-width */}
        <div className="space-y-10">
          <NewsHighlights />
          <InsightsForecast />
          <BrokersTeam />
          <SubscribeSection />
        </div>
      </main>

      <NewsletterFooter />
      <LGPDConsentBanner />
      <ExitIntentPopup />
      <FirstClickPopup />
    </div>
  );
}
