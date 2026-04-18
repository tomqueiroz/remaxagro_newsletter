import React, { useState } from 'react';

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="inscrever" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-8 md:p-12 text-center">
          {!submitted ? (
            <>
              <div className="inline-block bg-yellow-600 text-white text-xs font-bold px-4 py-2 rounded-full mb-6">
                EXCLUSIVO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Receba nossa newsletter direto na sua caixa de entrada
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Fique por dentro das últimas notícias, dicas exclusivas e conteúdos especiais. Inscreva-se agora e não perca nenhuma novidade!
              </p>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu melhor e-mail"
                    required
                    className="w-full px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105"
                >
                  Inscrever-se Agora
                </button>
              </form>
            </>
          ) : (
            <div className="py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Inscrição Confirmada!
              </h3>
              <p className="text-green-100 text-lg">
                Obrigado por se inscrever! Você receberá nossa newsletter em breve no e-mail: <span className="font-semibold text-yellow-400">{email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubscribeForm;