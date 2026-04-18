import React from 'react';

interface HeroProps {
  edition?: string;
  date?: string;
}

const Hero: React.FC<HeroProps> = ({ edition = '001', date = new Date().toLocaleDateString('pt-BR') }) => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop)',
        }}
      />
      
      {/* Dark Green Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-75" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Edition Badge */}
        <div className="mb-8">
          <span className="inline-block px-6 py-2 text-sm font-semibold tracking-wider text-green-900 bg-yellow-500 rounded-full">
            EDIÇÃO {edition}
          </span>
        </div>
        
        {/* Headline */}
        <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
          Prezado parceiro do{' '}
          <span className="text-yellow-500">agronegócio</span>
        </h1>
        
        {/* Editorial Greeting */}
        <p className="mb-8 text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
          Bem-vindo à newsletter semanal RE/MAX AGRO, desenvolvida em parceria com a DATAGRO. 
          Aqui você encontra as principais análises, tendências e insights do mercado agropecuário 
          brasileiro, reunidos especialmente para você que está na linha de frente do agronegócio.
        </p>
        
        {/* Signature Line */}
        <div className="flex flex-col items-center space-y-2">
          <div className="h-px w-32 bg-yellow-500 mb-2" />
          <p className="text-sm md:text-base text-gray-300 font-medium">
            Powered by <span className="text-yellow-500 font-bold">DATAGRO</span>
          </p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;