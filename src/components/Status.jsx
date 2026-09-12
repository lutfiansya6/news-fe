export function LoadingState({ label = "Memuat berita..." }) {
  return (
    <div className="status-box" role="status">
      <span className="spinner" aria-hidden="true" />
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="status-box error" role="alert">
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="retry-btn" onClick={onRetry}>
          Coba lagi
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="status-box">
      <p>{message}</p>
    </div>
  );
}
