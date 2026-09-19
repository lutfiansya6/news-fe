const API_BASE = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.error || `Gagal memuat data (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

/**
 * Fetch paginated news list.
 * @returns {Promise<{ data: Article[], pagination: { page, limit, total, totalPages } }>}
 */
export function getNewsList(categoryId, page = 1, limit = 10) {
  const params = new URLSearchParams({ page, limit });
  if (categoryId) params.set("category", categoryId);
  return request(`/api/news?${params}`);
}

export function getNewsById(id) {
  return request(`/api/news/${id}`).then((r) => r.data);
}

export function getComments(newsId) {
  return request(`/api/news/${newsId}/comments`).then((r) => r.data);
}

export function postComment(newsId, comment) {
  return request(`/api/news/${newsId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((r) => r.data);
}
