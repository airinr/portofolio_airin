<template>
  <section
    id="achievements"
    class="max-w-4xl mx-auto pt-16 pb-16 px-6 antialiased selection:bg-accent selection:text-accent-ink"
  >
    <div class="flex items-center gap-6 mb-20" data-aos="fade-right">
      <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-ink">
        Recognitions, Awards & Certifications
      </h2>
      <div class="h-[1px] flex-grow bg-line"></div>
    </div>

    <div class="space-y-0">
      <div
        v-for="(award, index) in sortedAchievements"
        :key="index"
        class="group relative border-b border-line py-10 transition-all duration-500 first:pt-0 last:border-none"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <div
          class="absolute inset-x-0 inset-y-0 -mx-4 bg-card-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
        ></div>

        <div
          class="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
        >
          <div
            class="md:col-span-2 text-xs font-mono text-faint group-hover:text-ink transition-colors duration-500 md:pt-1"
          >
            0{{ index + 1 }}/
          </div>

          <div class="md:col-span-7">
            <div class="flex items-start gap-4">
              <button
                v-if="award.image"
                type="button"
                @click="openLightbox(award)"
                class="shrink-0 rounded-lg overflow-hidden border border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-ink cursor-zoom-in"
                :aria-label="'Lihat sertifikat ' + award.title"
              >
                <img
                  :src="award.image"
                  :alt="award.title"
                  class="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
              <div class="min-w-0">
                <h3
                  class="text-xl font-bold text-ink tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-500"
                >
                  {{ award.title }}
                </h3>
                <p class="text-[14px] text-muted font-light leading-relaxed">
                  {{ award.institution }}
                </p>
              </div>
            </div>
          </div>

          <div class="md:col-span-3 md:text-right">
            <span
              class="inline-block text-xs font-mono text-faint border border-line px-3 py-1 rounded-full bg-surface"
            >
              {{ award.period }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeLightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="lightbox.title"
      >
        <button
          type="button"
          class="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Tutup"
          @click="closeLightbox"
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <figure class="max-w-4xl w-full flex flex-col items-center gap-4">
          <img
            :src="lightbox.image"
            :alt="lightbox.title"
            class="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          />
          <figcaption class="text-center text-white/80 text-sm px-4">
            <span class="font-bold text-white">{{ lightbox.title }}</span>
            <span v-if="lightbox.period" class="text-white/50">
              · {{ lightbox.period }}
            </span>
          </figcaption>
        </figure>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useContent, sortAchievements } from "../composables/useContent";

const content = useContent();
const sortedAchievements = computed(() =>
  sortAchievements(content.value.achievements),
);

const lightbox = ref(null);

watch(lightbox, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

function openLightbox(award) {
  if (!award.image) return;
  lightbox.value = {
    image: award.image,
    title: award.title,
    period: award.period,
  };
}

function closeLightbox() {
  lightbox.value = null;
}

function onKeydown(e) {
  if (e.key === "Escape") closeLightbox();
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
section {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h3 {
  letter-spacing: -0.01em;
}
</style>
