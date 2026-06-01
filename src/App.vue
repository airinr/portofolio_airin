<script setup>
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import ProjectCard from "./components/ProjectCard.vue";
import Skills from "./components/Skills.vue";
import Achievements from "./components/Achievements.vue"; // 1. Impor komponen Achievements
import Footer from "./components/Footer.vue";
import { onMounted, nextTick } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const projects = [
  {
    title: "CalmiSense",
    tags: ["IoT", "ML", "React"],
    desc: "A wearable device for early panic detection in children with ASD, utilizing ESP32 and AI prediction.",
    status: "Top 10 Samsung Innovation Campus",
    github: "https://github.com/airinr/wearable_device_asd",
  },
  {
    title: "Smart Cashier AI",
    tags: ["Python", "FastAPI", "ML", "React"],
    desc: "Intelligent cashier system for diamond stores with buying and selling price prediction features.",
    github: "https://github.com/airinr/diamond_cashier",
  },
  {
    title: "Smart Hospital Queue",
    tags: ["Python", "FastAPI", "ML", "React"],
    desc: "An intelligent hospital queue management system that integrates Machine Learning algorithms to provide real-time patient wait-time predictions.",
    github: "https://github.com/airinr/hospital_queue_prediction",
  },
];

onMounted(async () => {
  await nextTick();
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out",
  });
});
</script>

<template>
  <div
    class="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white"
  >
    <Navbar />

    <div data-aos="fade-up">
      <Hero />
    </div>

    <Skills />

    <section id="projects" class="max-w-4xl mx-auto py-32 px-6 antialiased">
      <div class="flex items-center gap-6 mb-20" data-aos="fade-right">
        <h2
          class="text-[10px] font-black uppercase tracking-[0.4em] text-black"
        >
          Selected Works
        </h2>
        <div class="h-[1px] flex-grow bg-black/10"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-20">
        <div
          v-for="(item, index) in projects"
          :key="item.title"
          class="group cursor-default"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <div class="flex items-baseline gap-4 mb-4">
            <span
              class="text-xs font-mono text-black/30 group-hover:text-black transition-colors duration-500"
            >
              P.0{{ index + 1 }}/
            </span>
            <h3 class="text-2xl font-bold text-black tracking-tighter">
              {{ item.title }}
            </h3>
          </div>

          <p
            class="text-[15px] text-black/60 leading-relaxed font-light group-hover:text-black transition-colors duration-500 mb-6"
          >
            {{ item.desc }}
          </p>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="text-[10px] uppercase tracking-widest border border-black/10 px-2 py-1 text-black/40 group-hover:border-black/40 group-hover:text-black transition-all duration-500"
            >
              {{ tag }}
            </span>
          </div>

          <a
            :href="item.github"
            target="_blank"
            class="inline-flex items-center text-xs font-bold uppercase tracking-widest text-black group-hover:translate-x-2 transition-transform duration-300"
          >
            View Repository <span class="ml-2">→</span>
          </a>

          <div
            class="mt-8 h-[1px] w-0 group-hover:w-full bg-black transition-all duration-700 ease-in-out"
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
