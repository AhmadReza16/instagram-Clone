/**
 * Convert relative image URLs to absolute URLs
 * Handles both API paths (/api/...) and media paths (/media/...)
 */
export function getImageUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;

  // If already absolute URL, return as is
  if (url.startsWith("http")) {
    return url;
  }

  // Get base URL (without /api)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://127.0.0.1:8000";

  // Ensure path starts with / for proper concatenation
  let path = url.startsWith("/") ? url : `/${url}`;

  // If path doesn't already contain /media/, prepend it
  // This handles cases where Django returns /profile_images/ instead of /media/profile_images/
  if (!path.includes("/media/")) {
    path = `/media${path}`;
  }

  // Combine with relative path
  return `${baseUrl}${path}`;
}
