// Twitter/X uses the exact same card as Open Graph — keeping the visual
// identical across every social platform. Re-exporting from the OG file
// means there's one source of truth: edit opengraph-image.tsx and X follows.
export {
  default,
  alt,
  size,
  contentType,
} from "./opengraph-image";
