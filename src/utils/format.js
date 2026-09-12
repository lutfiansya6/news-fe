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

export function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}
