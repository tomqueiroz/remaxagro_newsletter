import NewsletterHeader from "@/components/newsletter/NewsletterHeader";
import HeroIntro from "@/components/newsletter/HeroIntro";
import QuotationsPanel from "@/components/newsletter/QuotationsPanel";
import NewsHighlights from "@/components/newsletter/NewsHighlights";
import InsightsForecast from "@/components/newsletter/InsightsForecast";
import NewsletterSidebar from "@/components/newsletter/NewsletterSidebar";
import BrokersTeam from "@/components/newsletter/BrokersTeam";
import SubscribeSection from "@/components/newsletter/SubscribeSection";
import NewsletterFooter from "@/components/newsletter/NewsletterFooter";
import LGPDConsentBanner from "@/components/newsletter/LGPDConsentBanner";
import ExitIntentPopup from "@/components/newsletter/ExitIntentPopup";

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

        {/* Layout 2 colunas: conteúdo principal + sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna principal */}
          <div className="flex-1 min-w-0 space-y-10">
            <NewsHighlights />
            <InsightsForecast />
            <BrokersTeam />
            <SubscribeSection />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="lg:sticky lg:top-6">
              <NewsletterSidebar />
            </div>
          </div>
        </div>
      </main>

      <NewsletterFooter />
      <LGPDConsentBanner />
      <ExitIntentPopup />
    </div>
  );
}
