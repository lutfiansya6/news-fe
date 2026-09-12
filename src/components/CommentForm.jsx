import { useState } from "react";

export default function CommentForm({ newsId, onSubmit }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit({ author, text });
      setAuthor("");
      setText("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="author">Nama</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="Masukkan nama Anda"
        />
      </div>
      <div className="form-group">
        <label htmlFor="text">Komentar</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
          placeholder="Tulis komentar Anda di sini"
        />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? "Mengirim..." : "Kirim Komentar"}
      </button>
    </form>
  );
}
