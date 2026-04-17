export const REDIRECTS = {};

export function getRedirect(path) {
  return REDIRECTS[path] || null;
}
