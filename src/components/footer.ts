export function renderFooter(): string {
  return `
    <footer class="scroll-reveal border-t border-base-300 bg-base-100 text-base-content">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">

        <a href="/" class="text-xl font-black">
          SOLE<span class="text-orange-500">ST.</span>
        </a>

        <p class="text-sm text-base-content/70">
          Find your sole. Make your move.
        </p>

        <p class="text-sm text-base-content/60">
          &copy; 2026 SOLEST. Student project.
        </p>

      </div>
    </footer>
  `;
}
