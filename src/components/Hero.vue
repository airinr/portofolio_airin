<template>
  <section
    class="max-w-2xl mx-auto px-6 pt-32 pb-16 antialiased font-sans text-black selection:bg-black selection:text-white"
  >
    <div class="mb-12" data-aos="fade-down">
      <img
        src="/src/assets/airin.jpg"
        alt="Airin Ristiana"
        class="w-40 h-40 rounded-full object-cover hover:grayscale-0 border border-black/5 shadow-sm transition-all duration-500 hover:scale-110 cursor-pointer"
      />
    </div>

    <h1
      class="text-5xl md:text-6xl font-bold tracking-tighter text-black mb-10"
      data-aos="fade-up"
    >
      Hi there.
    </h1>

    <div
      class="space-y-6 text-[1.1rem] leading-relaxed text-black/60 font-light"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <p>
        I’m <span class="text-black font-bold">Airin Ristiana</span>, a
        developer and tech enthusiast currently in my 6th semester. I spend my
        time at the intersection of
        <strong class="text-black font-semibold">Machine Learning</strong>,
        <strong class="text-black font-semibold">Mobile Development</strong>,
        and <strong class="text-black font-semibold">Web Development</strong>,
        focusing on creating smart tools that feel intuitive.
      </p>

      <p>
        Securing a place in the
        <span class="text-black font-semibold"
          >Top 10 Teams at Samsung Innovation Campus 2025/2026</span
        >
        with my project
        <span class="italic text-black font-medium border-b border-black/20"
          >Calmisense</span
        >, and being a
        <span class="text-black font-semibold">top 40 coder</span> in national
        competitions, my goal is to build technology that doesn't just work, but
        actually matters.
      </p>
    </div>

    <div
      class="mt-12 flex gap-8 text-xs font-bold uppercase tracking-widest text-black/40"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <a
        href="https://github.com/airinr"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-black transition-colors duration-300"
        >GitHub</a
      >

      <a
        href="https://www.linkedin.com/in/airinristiana"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-black transition-colors duration-300"
        >LinkedIn</a
      >

      <a
        href="mailto:irinristi@gmail.com"
        class="hover:text-black transition-colors duration-300"
        >Email</a
      >
    </div>
  </section>
</template>

<style scoped>
/* Typography Refinement */
section {
  letter-spacing: -0.01em;
}

h1 {
  font-family: "Inter", sans-serif;
  line-height: 0.9;
}

/* Membuat teks deskripsi terasa lebih clean */
p {
  word-spacing: 0.02em;
}
</style>
