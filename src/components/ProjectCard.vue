<script setup>
defineProps(["data"]);
</script>

<template>
  <div
    class="bg-white rounded-2xl p-8 border border-slate-200 hover:border-black transition-all duration-500 group flex flex-col h-full"
  >
    <div class="flex flex-wrap gap-2 mb-6">
      <span
        v-for="tag in data.tags"
        :key="tag"
        class="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-800 px-2 py-1 rounded"
      >
        {{ tag }}
      </span>
    </div>

    <div class="flex-grow">
      <h3
        class="text-xl font-bold mb-3 text-slate-900 group-hover:text-black transition"
      >
        {{ data.title }}
      </h3>
      <p class="text-slate-500 text-sm leading-relaxed mb-8 font-normal">
        {{ data.desc }}
      </p>
    </div>

    <div
      class="flex items-center justify-between pt-6 border-t border-slate-100"
    >
      <div
        class="flex items-center text-[11px] font-medium uppercase tracking-tight text-slate-400"
      >
        <span class="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2"></span>
        {{ data.status }}
      </div>

      <a
        :href="data.github"
        target="_blank"
        class="text-slate-400 hover:text-black transition-colors"
        aria-label="GitHub Repository"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>
