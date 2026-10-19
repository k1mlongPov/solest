export type Theme = "light" | "dark";

const THEME_KEY = "solest-theme";

export function getSavedTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "dark";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

export function initializeTheme(): void {
  applyTheme(getSavedTheme());
}
