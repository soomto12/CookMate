const UNSPLASH_SEARCH_URL = "https://api.unsplash.com/search/photos";

// Unsplash asks API apps to link back with these UTM params.
const UTM = "utm_source=cookmate&utm_medium=referral";

export interface RecipeImage {
  imageUrl: string;
  imageCredit: string;
  imageCreditUrl: string;
}

interface UnsplashPhoto {
  urls?: { regular?: string };
  links?: { download_location?: string };
  user?: { name?: string; links?: { html?: string } };
}

// Looks up one landscape food photo for a dish. Never throws: a missing key,
// rate limit, network error or empty result all return null so recipe creation
// is never blocked by the image lookup.
export const findRecipeImage = async (query: string): Promise<RecipeImage | null> => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;

  try {
    const params = new URLSearchParams({
      query: `${query} food`,
      per_page: "1",
      orientation: "landscape",
      content_filter: "high",
    });

    const response = await fetch(`${UNSPLASH_SEARCH_URL}?${params}`, {
      headers: { Authorization: `Client-ID ${accessKey}`, "Accept-Version": "v1" },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { results?: UnsplashPhoto[] };
    const photo = data.results?.[0];

    const imageUrl = photo?.urls?.regular;
    const credit = photo?.user?.name;
    const profileUrl = photo?.user?.links?.html;
    if (!photo || !imageUrl || !credit || !profileUrl) return null;

    // Unsplash requires reporting when a photo is used. Fire and forget.
    const downloadLocation = photo.links?.download_location;
    if (downloadLocation) {
      void fetch(downloadLocation, { headers: { Authorization: `Client-ID ${accessKey}` } }).catch(
        () => undefined,
      );
    }

    return {
      imageUrl,
      imageCredit: credit,
      imageCreditUrl: `${profileUrl}?${UTM}`,
    };
  } catch {
    return null;
  }
};
