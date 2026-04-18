import { newsItems } from '../../lib/data';

export default function NewsGrid() {
  const [featuredNews, ...remainingNews] = newsItems;

  return (
    <section id="destaques" className="py-12 px-4 max-w-6xl mx-auto">
      {/* Section Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-red-600 pl-4">
          Destaques da Semana
        </h2>
      </div>

      {/* Featured News Card - Full Width */}
      <div className="mb-8">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={featuredNews.imageUrl}
                alt={featuredNews.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                {featuredNews.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {featuredNews.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {featuredNews.summary}
              </p>
              <p className="text-sm text-gray-500">{featuredNews.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining News - 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingNews.map((news) => (
          <div
            key={news.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            {/* Content */}
            <div className="p-5">
              <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {news.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {news.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {news.summary}
              </p>
              <p className="text-xs text-gray-500">{news.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}