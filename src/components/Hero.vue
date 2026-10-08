<template>
  <section
    class="max-w-2xl mx-auto px-6 pt-32 pb-8 antialiased font-sans text-ink selection:bg-accent selection:text-accent-ink"
  >
    <div class="mb-12" data-aos="fade-down">
      <img
        :src="content.hero.photo"
        :alt="content.hero.name"
        class="w-40 h-40 rounded-full object-cover hover:grayscale-0 border border-line shadow-sm transition-all duration-500 hover:scale-110 cursor-pointer"
      />
    </div>

    <h1
      class="text-5xl md:text-6xl font-bold tracking-tighter text-ink mb-10"
      data-aos="fade-up"
    >
      Hi there.
    </h1>

    <div
      class="space-y-6 text-[1.1rem] leading-relaxed text-muted font-light"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <p>
        <template v-for="(part, i) in descriptionParts" :key="i">
          <strong v-if="part.bold" class="text-ink font-semibold">{{ part.text }}</strong>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </div>

    <div
      class="mt-12 flex gap-8 text-xs font-bold uppercase tracking-widest text-faint"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <a
        href="https://github.com/airinr"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-ink transition-colors duration-300"
        >GitHub</a
      >

      <a
        href="https://www.linkedin.com/in/airinristiana"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-ink transition-colors duration-300"
        >LinkedIn</a
      >

      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=airinristianawork@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-ink transition-colors duration-300"
        >Email</a
      >
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useContent, parseBold } from "../composables/useContent";

const content = useContent();
const descriptionParts = computed(() => parseBold(content.value.hero.description || ""));
</script>

<style scoped>
section {
  letter-spacing: -0.01em;
}

h1 {
  font-family: "Inter", sans-serif;
  line-height: 0.9;
}

p {
  word-spacing: 0.02em;
}
</style>
