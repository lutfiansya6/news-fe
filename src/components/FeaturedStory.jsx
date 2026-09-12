import { Link } from "react-router-dom";
import { categoryLabel, formatDate } from "../utils/format";

export default function FeaturedStory({ article }) {
  if (!article) return null;

  return (
    <article className="featured">
      <Link to={`/berita/${article.id}`} className="featured-media">
        <img src={article.imageUrl} alt="" />
      </Link>
      <div className="featured-body">
        <p className="kicker">Sorotan hari ini</p>
        <p className={`badge badge-${article.category}`}>
          {categoryLabel(article.category)}
        </p>
        <h2>
          <Link to={`/berita/${article.id}`}>{article.title}</Link>
        </h2>
        <p className="excerpt">{article.excerpt}</p>
        <p className="meta">
          {article.author} · {formatDate(article.publishedAt)}
        </p>
        <Link className="read-more" to={`/berita/${article.id}`}>
          Baca selengkapnya
        </Link>
      </div>
    </article>
  );
}
