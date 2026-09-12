import { useEffect, useState } from "react";
import { LoadingState } from "./Status";
import { formatDate } from "../utils/format";
import { getComments } from "../api/news";

export default function CommentList({ newsId, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getComments(newsId)
      .then((commentsList) => {
        if (cancelled) return;
        setComments(commentsList);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [newsId, refreshTrigger]);

  if (loading) {
    return <LoadingState label="Memuat komentar..." />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (comments.length === 0) {
    return <p className="no-comments">Belum ada komentar. Jadilah yang pertama berkomentar!</p>;
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div key={comment._id || comment.createdAt} className="comment-item">
          <div className="comment-header">
            <strong>{comment.author}</strong>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
          </div>
          <p className="comment-content">{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
