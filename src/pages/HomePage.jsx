import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsList } from "../api/news";
import FeaturedStory from "../components/FeaturedStory";
import NewsCard from "../components/NewsCard";
import { EmptyState, ErrorState, LoadingState } from "../components/Status";
import { categoryLabel } from "../utils/format";

export default function HomePage() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const load = () => {
    setStatus("loading");
    setError("");
    getNewsList()
      .then((data) => {
        setArticles(data);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return articles
      .filter((item) => (category ? item.category === category : true))
      .filter((item) => {
        if (!keyword) return true;
        return (
          item.title.toLowerCase().includes(keyword) ||
          item.excerpt.toLowerCase().includes(keyword) ||
          item.author.toLowerCase().includes(keyword)
        );
      })
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, [articles, category, query]);

  const [featured, ...rest] = filtered;

  return (
    <div className="page">
      <div className="page-toolbar">
        <div>
          <h1>{category ? categoryLabel(category) : "Berita terkini"}</h1>
          <p className="lede">
            {category
              ? `Liputan kategori ${categoryLabel(category).toLowerCase()}.`
              : "Ringkasan peristiwa politik, ekonomi, teknologi, olahraga, dan hiburan."}
          </p>
        </div>
        <label className="search">
          <span className="sr-only">Cari berita</span>
          <input
            type="search"
            placeholder="Cari judul, kutipan, atau penulis..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {status === "loading" ? <LoadingState /> : null}
      {status === "error" ? <ErrorState message={error} onRetry={load} /> : null}

      {status === "ready" && filtered.length === 0 ? (
        <EmptyState message="Tidak ada berita yang cocok dengan pencarian Anda." />
      ) : null}

      {status === "ready" && featured ? (
        <>
          {!query && !category ? <FeaturedStory article={featured} /> : null}
          <section className="news-grid" aria-label="Daftar berita">
            {(query || category ? filtered : rest).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </section>
        </>
      ) : null}
    </div>
  );
}
