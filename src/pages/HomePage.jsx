import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsList } from "../api/news";
import FeaturedStory from "../components/FeaturedStory";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import { EmptyState, ErrorState, LoadingState } from "../components/Status";
import { categoryLabel } from "../utils/format";

const LIMIT = 10;

export default function HomePage() {
  const { categoryId } = useParams();
  const categoryIdNum = categoryId ? Number.parseInt(categoryId, 10) : null;

  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = (targetPage) => {
    setStatus("loading");
    setError("");
    getNewsList(categoryIdNum, targetPage, LIMIT)
      .then((res) => {
        setArticles(res.data ?? res);
        setTotalPages(res.pagination?.totalPages ?? 1);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  };

  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
    setQuery("");
    load(1);
  }, [categoryIdNum]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    load(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return articles;
    return articles.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.excerpt.toLowerCase().includes(keyword) ||
        item.author.toLowerCase().includes(keyword)
    );
  }, [articles, query]);

  const [featured, ...rest] = filtered;

  return (
    <div className="page">
      <div className="page-toolbar">
        <div>
          <h1>{categoryIdNum ? categoryLabel(categoryIdNum) : "Berita terkini"}</h1>
          <p className="lede">
            {categoryIdNum
              ? `Liputan kategori ${categoryLabel(categoryIdNum).toLowerCase()}.`
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
      {status === "error" ? <ErrorState message={error} onRetry={() => load(page)} /> : null}

      {status === "ready" && filtered.length === 0 ? (
        <EmptyState message="Tidak ada berita yang cocok dengan pencarian Anda." />
      ) : null}

      {status === "ready" && featured ? (
        <>
          {/* Featured story only on first page, no filter, no search */}
          {page === 1 && !query && !categoryIdNum ? (
            <FeaturedStory article={featured} />
          ) : null}

          <section className="news-grid" aria-label="Daftar berita">
            {(page === 1 && !query && !categoryIdNum ? rest : filtered).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </section>

          {/* Hide pagination when searching client-side */}
          {!query && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : null}
    </div>
  );
}

