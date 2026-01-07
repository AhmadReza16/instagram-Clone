export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("access"));
}
