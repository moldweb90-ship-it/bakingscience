export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographerUrl: string;
  alt: string;
  avgColor: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};

export type PexelsSearchOptions = {
  query: string;
  perPage?: number;
  page?: number;
  orientation?: "landscape" | "portrait" | "square";
  size?: "large" | "medium" | "small";
  color?: string;
  locale?: string;
};

type PexelsSearchResponse = {
  page: number;
  per_page: number;
  total_results: number;
  photos: Array<{
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    alt: string;
    avg_color: string;
    src: PexelsPhoto["src"];
  }>;
};

export function getPexelsAttribution(photo: PexelsPhoto): string {
  return `Photo by ${photo.photographer} on Pexels`;
}

export async function searchPexelsPhotos(options: PexelsSearchOptions): Promise<PexelsPhoto[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error("PEXELS_API_KEY is not configured.");
  }

  const params = new URLSearchParams({
    query: options.query,
    per_page: String(Math.min(Math.max(options.perPage ?? 10, 1), 80)),
    page: String(Math.max(options.page ?? 1, 1)),
    locale: options.locale ?? "en-US",
  });

  if (options.orientation) params.set("orientation", options.orientation);
  if (options.size) params.set("size", options.size);
  if (options.color) params.set("color", options.color);

  const response = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
    headers: { Authorization: apiKey },
    next: { revalidate: 60 * 60 * 24 * 7 },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pexels API failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as PexelsSearchResponse;
  return data.photos.map((photo) => ({
    id: photo.id,
    width: photo.width,
    height: photo.height,
    url: photo.url,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    alt: photo.alt,
    avgColor: photo.avg_color,
    src: photo.src,
  }));
}
