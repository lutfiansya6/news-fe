import { Link } from "react-router-dom";
import { categoryLabel, formatShortDate } from "../utils/format";

export default function NewsCard({ article }) {
  return (
    <article className="news-card">
      <Link to={`/berita/${article.id}`} className="news-card-media">
        <img src={article.imageUrl} alt="" />
      </Link>
      <div className="news-card-body">
        <p className={`badge badge-${article.category}`}>
          {categoryLabel(article.category)}
        </p>
        <h3>
          <Link to={`/berita/${article.id}`}>{article.title}</Link>
        </h3>
        <p className="excerpt">{article.excerpt}</p>
        <p className="meta">
          {article.author} · {formatShortDate(article.publishedAt)}
        </p>
      </div>
    </article>
  );
}
