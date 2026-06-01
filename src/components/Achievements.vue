<template>
  <section
    id="achievements"
    class="max-w-4xl mx-auto py-32 px-6 antialiased selection:bg-black selection:text-white"
  >
    <div class="flex items-center gap-6 mb-20" data-aos="fade-right">
      <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-black">
        Recognitions, Awards & Certifications
      </h2>
      <div class="h-[1px] flex-grow bg-black/10"></div>
    </div>

    <div class="space-y-0">
      <div
        v-for="(award, index) in achievementsData"
        :key="index"
        class="group relative border-b border-black/5 py-10 transition-all duration-500 first:pt-0 last:border-none"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <div
          class="absolute inset-x-0 inset-y-0 -mx-4 bg-black/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
        ></div>

        <div
          class="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
        >
          <div
            class="md:col-span-2 text-xs font-mono text-black/30 group-hover:text-black transition-colors duration-500 md:pt-1"
          >
            0{{ index + 1 }}/
          </div>

          <div class="md:col-span-7">
            <h3
              class="text-xl font-bold text-black tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-500"
            >
              {{ award.title }}
            </h3>
            <p class="text-[14px] text-black/50 font-light leading-relaxed">
              {{ award.institution }}
            </p>
          </div>

          <div class="md:col-span-3 md:text-right">
            <span
              class="inline-block text-xs font-mono text-black/40 border border-black/10 px-3 py-1 rounded-full bg-white"
            >
              {{ award.period }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

// Data prestasi dan sertifikasi nasional/global Anda
const achievementsData = ref([
  {
    title: "Top 10 Finalist — Samsung Innovation Campus",
    institution:
      "National innovation program. Developed CalmiSense, an AI-integrated wearable device built with an ESP32 for early physiological and biometrics monitoring.",
    period: "2025 - 2026",
  },
  {
    title: "Top 40 Coder — National Coding Competition",
    institution:
      "Recognized among the top 40 software engineering and competitive programming talents at the national level.",
    period: "2025",
  },
  {
    title: "Cisco Certified Network Associate (CCNA)",
    institution:
      "Cisco Global Certification. Validating comprehensive knowledge in network fundamentals, IP connectivity, security fundamentals, and automation.",
    period: "2026",
  },
  {
    title: "Sertifikasi Kompetensi BNSP — Software Development",
    institution:
      "Badan Nasional Sertifikasi Profesi (BNSP) Indonesia. Certified Professional Competency in core programming methodologies and software engineering practices.",
    period: "2026",
  },
]);
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
