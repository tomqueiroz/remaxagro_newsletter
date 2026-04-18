import React from 'react';
import Header from '../components/newsletter/Header';
import TickerBar from '../components/newsletter/TickerBar';
import Hero from '../components/newsletter/Hero';
import CommodityPanel from '../components/newsletter/CommodityPanel';
import NewsGrid from '../components/newsletter/NewsGrid';
import InsightsRadar from '../components/newsletter/InsightsRadar';
import BrokersSection from '../components/newsletter/BrokersSection';
import SubscribeForm from '../components/newsletter/SubscribeForm';
import Sidebar from '../components/newsletter/Sidebar';
import Footer from '../components/newsletter/Footer';

const Home: React.FC = () => {
  const editionNumber = 1;
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>
      <Header editionNumber={editionNumber} date={date} />
      <TickerBar />
      <Hero edition={`Edition ${editionNumber}`} date={date} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <CommodityPanel />
            <NewsGrid />
            <InsightsRadar />
            <BrokersSection />
            <SubscribeForm />
          </div>
          
          <aside className="w-full lg:w-72 shrink-0">
            <Sidebar />
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;