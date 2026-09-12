const API_BASE = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.error || `Gagal memuat data (${response.status})`;
    throw new Error(message);
  }

  const payload = await response.json();
  return payload.data;
}

export function getNewsList() {
  return request("/api/news");
}

export function getNewsById(id) {
  return request(`/api/news/${id}`);
}

export function getComments(newsId) {
  return request(`/api/news/${newsId}/comments`);
}

export function postComment(newsId, comment) {
  return request(`/api/news/${newsId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
}
