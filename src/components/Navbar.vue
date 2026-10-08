<script setup>
import { useTheme } from "../composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <nav
    class="fixed w-full z-50 top-0 left-0 bg-surface/80 backdrop-blur-md border-b border-line"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a
        href="#home"
        class="text-xl font-black tracking-tighter text-ink select-none"
      >
        AIRIN
      </a>

      <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
        <a
          href="#home"
          class="text-muted hover:text-ink transition-colors duration-300"
        >
          Home
        </a>

        <a
          href="#expertise-showcase"
          class="text-muted hover:text-ink transition-colors duration-300"
        >
          Skills
        </a>
        <a
          href="#projects"
          class="text-muted hover:text-ink transition-colors duration-300"
        >
          Projects
        </a>
        <a
          href="#achievements"
          class="text-muted hover:text-ink transition-colors duration-300"
        >
          Achievements
        </a>
        <button
          type="button"
          @click="toggleTheme"
          class="inline-flex items-center justify-center w-9 h-9 rounded-md border border-line text-ink hover:bg-card-soft transition-colors duration-300"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
        >
          <svg
            v-if="theme === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
        <a
          href="#contact"
          class="inline-flex items-center justify-center bg-accent text-accent-ink px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md hover:opacity-90 transition-opacity duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
        >
          Contact
        </a>
      </div>

      <div class="flex md:hidden items-center gap-2">
        <button
          type="button"
          @click="toggleTheme"
          class="inline-flex items-center justify-center w-9 h-9 rounded-md border border-line text-ink"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg
            v-if="theme === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
        <a
          href="#contact"
          class="inline-flex items-center justify-center bg-accent text-accent-ink px-3 py-2 text-xs uppercase tracking-wider font-bold rounded-md"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
</template>
