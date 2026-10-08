<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import Skills from "./components/Skills.vue";
import Achievements from "./components/Achievements.vue";
import Footer from "./components/Footer.vue";
import Admin from "./components/Admin.vue";
import { initContent, useContent } from "./composables/useContent";
import AOS from "aos";
import "aos/dist/aos.css";

const content = useContent();
const isAdmin = ref(window.location.hash === "#/admin");
const isReady = ref(false);

function onHashChange() {
  isAdmin.value = window.location.hash === "#/admin";
  if (!isAdmin.value) {
    nextTick(() => {
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-in-out",
      });
      AOS.refresh();
    });
  }
}

onMounted(async () => {
  window.addEventListener("hashchange", onHashChange);
  await initContent();
  isReady.value = true;
  if (!isAdmin.value) {
    await nextTick();
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("hashchange", onHashChange);
});
</script>

<template>
  <Admin v-if="isAdmin" />

  <div
    v-else-if="isReady"
    class="min-h-screen bg-bg font-sans text-ink selection:bg-accent selection:text-accent-ink"
  >
    <Navbar />

    <div data-aos="fade-up">
      <Hero />
    </div>

    <Skills />

    <section id="projects" class="max-w-4xl mx-auto pt-16 pb-16 px-6 antialiased">
      <div class="flex items-center gap-6 mb-20" data-aos="fade-right">
        <h2
          class="text-[10px] font-black uppercase tracking-[0.4em] text-ink"
        >
          Selected Works
        </h2>
        <div class="h-[1px] flex-grow bg-line"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-20">
        <div
          v-for="(item, index) in content.projects"
          :key="item.title"
          class="group cursor-default"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <div class="flex items-baseline gap-4 mb-4">
            <span
              class="text-xs font-mono text-faint group-hover:text-ink transition-colors duration-500"
            >
              P.0{{ index + 1 }}/
            </span>
            <h3 class="text-2xl font-bold text-ink tracking-tighter">
              {{ item.title }}
            </h3>
          </div>

          <p
            class="text-[15px] text-muted leading-relaxed font-light group-hover:text-ink transition-colors duration-500 mb-6"
          >
            {{ item.desc }}
          </p>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="text-[10px] uppercase tracking-widest border border-line px-2 py-1 text-faint group-hover:border-hover-line group-hover:text-ink transition-all duration-500"
            >
              {{ tag }}
            </span>
          </div>

          <a
            :href="item.github"
            target="_blank"
            class="inline-flex items-center text-xs font-bold uppercase tracking-widest text-ink group-hover:translate-x-2 transition-transform duration-300"
          >
            View Repository <span class="ml-2">→</span>
          </a>

          <div
            class="mt-8 h-[1px] w-0 group-hover:w-full bg-ink transition-all duration-700 ease-in-out"
          ></div>
        </div>
      </div>
    </section>

    <Achievements />

    <Footer />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
