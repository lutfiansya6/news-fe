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
  return dateFormatter.format(new Date(iso));
}

export function formatShortDate(iso) {
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

export function categoryLabel(category) {
  // Handle category ID (number)
  if (typeof category === 'number') {
    return CATEGORY_BY_ID[category]?.name || category;
  }
  // Handle category slug (string)
  return CATEGORY_LABELS[category] || category;
}

export function categorySlug(categoryId) {
  if (typeof categoryId === 'number') {
    return CATEGORY_BY_ID[categoryId]?.slug || categoryId;
  }
  return categoryId;
}
