<template>
  <nav
    class="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-slate-100"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <a
        href="#home"
        class="text-xl font-black tracking-tighter text-black select-none"
      >
        AIRIN
      </a>

      <div class="hidden md:flex items-center space-x-8 text-sm font-medium">
        <a
          href="#home"
          class="text-slate-600 hover:text-black transition-colors duration-300"
        >
          Home
        </a>

        <a
          href="#expertise-showcase"
          class="text-slate-600 hover:text-black transition-colors duration-300"
        >
          Skills
        </a>
        <a
          href="#projects"
          class="text-slate-600 hover:text-black transition-colors duration-300"
        >
          Projects
        </a>
        <a
          href="#contact"
          class="inline-flex items-center justify-center bg-black text-white px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md hover:bg-neutral-800 transition-colors duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
        >
          Contact
        </a>
      </div>
    </div>
  </nav>
</template>
