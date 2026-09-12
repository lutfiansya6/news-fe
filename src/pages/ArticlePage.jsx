import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewsById, getNewsList, postComment } from "../api/news";
import NewsCard from "../components/NewsCard";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { ErrorState, LoadingState } from "../components/Status";
import { categoryLabel, formatDate } from "../utils/format";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setError("");

    Promise.all([getNewsById(id), getNewsList()])
      .then(([detail, list]) => {
        if (cancelled) return;
        setArticle(detail);
        setRelated(
          list.filter(
            (item) => item.category === detail.category && item.id !== detail.id,
          ),
        );
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleCommentSubmit = async (comment) => {
    try {
      await postComment(id, comment);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  if (status === "loading") {
    return <LoadingState label="Memuat artikel..." />;
  }

  if (status === "error") {
    return (
      <div className="page">
        <ErrorState message={error} />
        <p className="back-row">
          <Link to="/">Kembali ke beranda</Link>
        </p>
      </div>
    );
  }

  return (
    <article className="article-page">
      <p className="breadcrumb">
        <Link to="/">Beranda</Link>
        <span aria-hidden="true"> / </span>
        <Link to={`/kategori/${article.category}`}>
          {categoryLabel(article.category)}
        </Link>
      </p>
      <p className={`badge badge-${article.category}`}>
        {categoryLabel(article.category)}
      </p>
      <h1>{article.title}</h1>
      <p className="article-meta">
        {article.author} · {formatDate(article.publishedAt)}
      </p>
      <figure className="article-hero">
        <img src={article.imageUrl} alt="" />
      </figure>
      <p className="lede">{article.excerpt}</p>
      <div className="article-body">
        {article.content.split(/(?<=\.)\s+/).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="comments-section">
        <h2>Komentar</h2>
        <CommentForm newsId={id} onSubmit={handleCommentSubmit} />
        <CommentList newsId={id} refreshTrigger={refreshTrigger} />
      </section>

      {related.length > 0 ? (
        <section className="related">
          <h2>Berita terkait</h2>
          <div className="news-grid">
            {related.map((item) => (
              <NewsCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
