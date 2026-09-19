const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatDate(iso) {
  if (!iso) return "";
  return dateFormatter.format(new Date(iso));
}

export function formatShortDate(iso) {
  if (!iso) return "";
  return shortDateFormatter.format(new Date(iso));
}

export const CATEGORY_LABELS = {
  politik: "Politik",
  teknologi: "Teknologi",
  olahraga: "Olahraga",
  hiburan: "Hiburan",
  ekonomi: "Ekonomi",
};

export const CATEGORY_BY_ID = {
  1: { name: "Teknologi", slug: "teknologi" },
  2: { name: "Ekonomi", slug: "ekonomi" },
  3: { name: "Olahraga", slug: "olahraga" },
  4: { name: "Hiburan", slug: "hiburan" },
  5: { name: "Politik", slug: "politik" },
};

export const CATEGORY_NAME_TO_ID = {
  teknologi: 1,
  ekonomi: 2,
  olahraga: 3,
  hiburan: 4,
  politik: 5,
};

export function getCategoryId(cat) {
  if (typeof cat === "number") return cat;
  if (!cat) return null;
  return CATEGORY_NAME_TO_ID[String(cat).toLowerCase()] ?? null;
}

export function categoryLabel(category) {
  if (category == null) return "";
  if (typeof category === "number") {
    return CATEGORY_BY_ID[category]?.name || String(category);
  }
  const lower = String(category).toLowerCase();
  return CATEGORY_LABELS[lower] || category;
}

export function categorySlug(category) {
  if (category == null) return "";
  if (typeof category === "number") {
    return CATEGORY_BY_ID[category]?.slug || String(category);
  }
  return String(category).toLowerCase();
}
