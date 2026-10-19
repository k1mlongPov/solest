import "./style.css";
import {
  renderNavbar,
  initializeThemeToggle,
  initializeMobileNav,
} from "./components/navbar";
import { renderFooter } from "./components/footer";
import { initializeTheme } from "./utils/theme";
import { initializeScrollReveal } from "./utils/scroll-reveal";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find the #app element.");
}

initializeTheme();
app.innerHTML = `
  <div class="min-h-screen bg-base-100 text-base-content">
    ${renderNavbar()}

    <main>
      <!-- Section 1: Brand story -->
      <section class="scroll-reveal relative overflow-hidden border-b border-base-300">
        <div class="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>

        <div class="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <p class="text-sm font-bold tracking-[0.25em] text-orange-400">
              OUR STORY
            </p>

            <h1 class="mt-5 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              MORE THAN<br />
              <span class="text-orange-500">JUST SHOES.</span>
            </h1>

            <p class="mt-6 max-w-xl text-lg leading-8 text-base-content/60">
              We believe the right pair of sneakers is more than something
              you wear. It is part of how you express yourself, explore
              the world, and move through every day.
            </p>

            <a
              href="/shop.html"
              class="mt-8 inline-block rounded-full bg-orange-500 px-7 py-4 font-bold transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Explore our collection &rarr;
            </a>
          </div>

          <div class="relative">
            <div class="absolute inset-8 rounded-full bg-orange-500/20 blur-3xl"></div>

            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=85"
              alt="Red sneaker representing the bold SOLEST style"
              class="relative h-80 w-full rounded-3xl object-cover shadow-2xl sm:h-110"
            />

            <div class="absolute -bottom-5 left-5 rounded-2xl border border-base-300 bg-base-200 p-5 shadow-xl sm:left-8">
              <p class="text-xs font-bold tracking-widest text-orange-400">
                OUR PHILOSOPHY
              </p>
              <p class="mt-2 text-lg font-black">
                Find your sole.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Mission and values -->
      <section class="scroll-reveal mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div class="mx-auto max-w-3xl text-center">
          <p class="text-sm font-bold tracking-[0.2em] text-orange-400">
            WHAT WE BELIEVE
          </p>

          <h2 class="mt-4 text-3xl font-black sm:text-4xl">
            Your style. Your journey.
          </h2>

          <p class="mt-5 leading-7 text-base-content/60">
            SOLEST is a student-created sneaker marketplace concept
            built around self-expression, everyday style, and the
            excitement of discovering your next favorite pair.
          </p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <article class="rounded-2xl border border-base-300 bg-base-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl text-orange-400">
              ✳
            </div>

            <h3 class="mt-6 text-xl font-bold">Self-expression</h3>

            <p class="mt-3 leading-7 text-base-content/60">
              Find styles that reflect your personality.
              Your sneakers should feel like you.
            </p>
          </article>

          <article class="rounded-2xl border border-base-300 bg-base-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl text-orange-400">
              ↗
            </div>

            <h3 class="mt-6 text-xl font-bold">Everyday movement</h3>

            <p class="mt-3 leading-7 text-base-content/60">
              Explore different sneaker styles for your
              everyday routines and personal adventures.
            </p>
          </article>

          <article class="rounded-2xl border border-base-300 bg-base-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl text-orange-400">
              ◈
            </div>

            <h3 class="mt-6 text-xl font-bold">Thoughtful choices</h3>

            <p class="mt-3 leading-7 text-base-content/60">
              Compare styles, discover categories, and
              choose a pair that fits your preferences.
            </p>
          </article>
        </div>
      </section>

      <!-- Section 3: Why SOLEST -->
      <section class="scroll-reveal border-y border-base-300 bg-base-200">
        <div class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p class="text-sm font-bold tracking-[0.2em] text-orange-400">
              THE SOLEST DIFFERENCE
            </p>

            <h2 class="mt-4 text-3xl font-black sm:text-4xl">
              A collection for every kind of move.
            </h2>

            <p class="mt-5 leading-7 text-base-content/60">
              From relaxed everyday looks to running-inspired styles
              and basketball silhouettes, our demo collection brings
              different sneaker categories together in one place.
            </p>

            <ul class="mt-7 space-y-4">
              <li class="flex items-start gap-3">
                <span class="font-black text-orange-400">✓</span>
                <span class="text-base-content/70">Explore multiple sneaker categories.</span>
              </li>

              <li class="flex items-start gap-3">
                <span class="font-black text-orange-400">✓</span>
                <span class="text-base-content/70">Compare prices and product details.</span>
              </li>

              <li class="flex items-start gap-3">
                <span class="font-black text-orange-400">✓</span>
                <span class="text-base-content/70">Save your selections in a shopping cart.</span>
              </li>
            </ul>

            <a
              href="/shop.html"
              class="mt-8 inline-block font-bold text-orange-400 transition hover:text-orange-300"
            >
              Discover the shop &rarr;
            </a>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80"
              alt="Sneaker from a contemporary collection"
              loading="lazy"
              class="mt-8 h-56 w-full rounded-2xl bg-white object-cover transition duration-500 hover:scale-[1.02]"
            />

            <img
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80"
              alt="Lifestyle sneaker with a modern design"
              loading="lazy"
              class="h-56 w-full rounded-2xl bg-white object-cover transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      <!-- Section 4: Contact -->
      <section id="contact" class="scroll-reveal mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div class="grid gap-10 md:grid-cols-2">
          <div>
            <p class="text-sm font-bold tracking-[0.2em] text-orange-400">
              GET IN TOUCH
            </p>

            <h2 class="mt-4 text-3xl font-black sm:text-4xl">
              Let's talk sneakers.
            </h2>

            <p class="mt-5 max-w-lg leading-7 text-base-content/60">
              Have a question or want to share your favorite sneaker
              style? Use this demo contact form to try out the interface.
            </p>

            <div class="mt-8 rounded-2xl border border-base-300 bg-base-200 p-6">
              <p class="text-sm text-base-content/60">Brand</p>
              <p class="mt-1 font-bold">SOLEST — Find Your Sole</p>

              <p class="mt-5 text-sm text-base-content/60">Project type</p>
              <p class="mt-1 font-bold">Frontend student project</p>

              <p class="mt-5 text-sm leading-6 text-slate-500">
                This is a demonstration website. No real customer
                support service is connected.
              </p>
            </div>
          </div>

          <form id="contact-form" class="rounded-2xl border border-base-300 bg-base-200 p-6 sm:p-8">
            <div>
              <label for="contact-name" class="text-sm font-semibold">
                Your name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                required
                minlength="2"
                maxlength="80"
                autocomplete="name"
                placeholder="Enter your name"
                class="mt-2 w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-base-content outline-none placeholder:text-slate-500 focus:border-orange-500"
              />
            </div>

            <div class="mt-5">
              <label for="contact-email" class="text-sm font-semibold">
                Email address
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxlength="254"
                autocomplete="email"
                placeholder="you@example.com"
                class="mt-2 w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-base-content outline-none placeholder:text-slate-500 focus:border-orange-500"
              />
            </div>

            <div class="mt-5">
              <label for="contact-message" class="text-sm font-semibold">
                Your message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="4"
                required
                minlength="10"
                maxlength="1000"
                placeholder="Tell us what's on your mind..."
                class="mt-2 w-full resize-y rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-base-content outline-none placeholder:text-slate-500 focus:border-orange-500"
              ></textarea>
            </div>

            <button
              type="submit"
              class="mt-6 w-full rounded-full bg-orange-500 px-6 py-4 font-bold transition hover:bg-orange-600"
            >
              Send message &rarr;
            </button>

            <p id="form-feedback" class="mt-4 text-sm text-orange-400" aria-live="polite"></p>
          </form>
        </div>
      </section>
    </main>

    ${renderFooter()}
  </div>
`;
initializeThemeToggle();
initializeMobileNav();
initializeScrollReveal();

const contactForm = document.querySelector<HTMLFormElement>("#contact-form");
const feedback = document.querySelector<HTMLParagraphElement>("#form-feedback");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity() || !feedback) {
    return;
  }

  feedback.textContent =
    "Thanks for trying our demo! Your message has not been sent to a real inbox.";

  contactForm.reset();
});
