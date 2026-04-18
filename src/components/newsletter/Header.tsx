import React from 'react';

interface HeaderProps {
  editionNumber: number;
  date: string;
}

const Header: React.FC<HeaderProps> = ({ editionNumber, date }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-[#0F2A1A] text-white">
      {/* Main Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Logo and Partnership */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline">
              <span className="text-[#CC0000] font-bold text-3xl">RE/MAX</span>
              <span className="text-[#C9A84C] font-bold text-3xl ml-1">AGRO</span>
            </div>
            <div className="ml-4 text-sm text-gray-300">
              em parceria com <span className="font-semibold">DATAGRO</span>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('inscrever-se')}
            className="bg-[#C9A84C] text-[#0F2A1A] px-6 py-2 rounded-md font-semibold hover:bg-[#B89840] transition-colors"
          >
            Inscrever-se
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8 border-t border-gray-700 pt-4">
          <button
            onClick={() => scrollToSection('cotacoes')}
            className="text-gray-300 hover:text-[#C9A84C] transition-colors font-medium"
          >
            Cotações
          </button>
          <button
            onClick={() => scrollToSection('destaques')}
            className="text-gray-300 hover:text-[#C9A84C] transition-colors font-medium"
          >
            Destaques
          </button>
          <button
            onClick={() => scrollToSection('insights')}
            className="text-gray-300 hover:text-[#C9A84C] transition-colors font-medium"
          >
            Insights
          </button>
          <button
            onClick={() => scrollToSection('corretores')}
            className="text-gray-300 hover:text-[#C9A84C] transition-colors font-medium"
          >
            Corretores
          </button>
        </nav>
      </div>

      {/* Bottom Bar - Edition and Date */}
      <div className="bg-[#0A1F12] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <span className="text-[#C9A84C] font-semibold">Edição #{editionNumber}</span>
          </div>
          <div className="text-sm text-gray-400">
            {date}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;