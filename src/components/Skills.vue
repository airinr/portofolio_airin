<template>
  <section
    id="expertise-showcase"
    class="max-w-4xl mx-auto py-32 px-6 antialiased selection:bg-black selection:text-white"
  >
    <div class="flex items-center gap-6 mb-20" data-aos="fade-right">
      <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-black">
        What do I help?
      </h2>
      <div class="h-[1px] flex-grow bg-black/10"></div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 items-start"
    >
      <div class="md:col-span-5 space-y-4" data-aos="fade-right">
        <button
          v-for="(skill, index) in skillsData"
          :key="index"
          @click="activeTabIndex = index"
          class="w-full text-left flex items-center gap-5 p-5 rounded-xl border transition-all duration-300 outline-none group"
          :class="
            activeTabIndex === index
              ? 'border-black bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
              : 'border-black/5 bg-white text-black hover:border-black/20 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
          "
        >
          <div
            class="flex items-center justify-center w-12 h-12 rounded-full shrink-0 transition-colors duration-300"
            :class="
              activeTabIndex === index
                ? 'bg-white text-black'
                : 'bg-black text-white'
            "
          >
            <component :is="skill.icon" class="w-5 h-5" />
          </div>

          <div>
            <h3
              class="text-base font-bold tracking-tight transition-colors duration-300"
            >
              {{ skill.title }}
            </h3>
          </div>
        </button>
      </div>

      <div
        class="md:col-span-7 flex flex-col justify-center min-h-[260px]"
        data-aos="fade-up"
        :key="activeTabIndex"
      >
        <h2 class="text-4xl font-bold tracking-tighter text-black mb-6">
          {{ activeSkill.title }}
        </h2>

        <div
          class="space-y-4 text-[15px] text-black/60 leading-relaxed font-light max-w-lg mb-8"
        >
          <p>{{ activeSkill.description }}</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in activeSkill.techStack"
            :key="tech"
            class="text-xs font-mono px-3 py-1 rounded-md border border-black/10 bg-black/[0.02] text-black/70"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, h } from "vue";

// SVG Icons re-architected with h() render function for full Vite compatibility
const SmartphoneIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      [
        h("rect", {
          width: "14",
          height: "20",
          x: "5",
          y: "2",
          rx: "2",
          ry: "2",
        }),
        h("path", { d: "M12 18h.01" }),
      ],
    );
  },
};

const MonitorIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      [
        h("rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }),
        h("line", { x1: "8", x2: "16", y1: "21", y2: "21" }),
        h("line", { x1: "12", x2: "12", y1: "17", y2: "21" }),
      ],
    );
  },
};

const BrainIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      [
        h("path", {
          d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
        }),
        h("path", {
          d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
        }),
        h("path", { d: "M12 5v14" }),
      ],
    );
  },
};

const CpuIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      [
        h("rect", { width: "16", height: "16", x: "4", y: "4", rx: "2" }),
        h("rect", { width: "6", height: "6", x: "9", y: "9", rx: "1" }),
        h("path", { d: "M9 1v3" }),
        h("path", { d: "M15 1v3" }),
        h("path", { d: "M9 20v3" }),
        h("path", { d: "M15 20v3" }),
        h("path", { d: "M20 9h3" }),
        h("path", { d: "M20 15h3" }),
        h("path", { d: "M1 9h3" }),
        h("path", { d: "M1 15h3" }),
      ],
    );
  },
};

const activeTabIndex = ref(0);

const skillsData = ref([
  {
    title: "Mobile App Dev",
    icon: SmartphoneIcon,
    description:
      "Focusing on crafting high-performance, cross-platform mobile applications. Experienced in designing clean, interactive application architectures deeply integrated with real-time databases and seamless cloud systems.",
    techStack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore"],
  },
  {
    title: "Web Development",
    icon: MonitorIcon,
    description:
      "Building modern, highly interactive, and responsive web interfaces. Scaled frontend components alongside optimized build utilities and custom web dashboards connected to rapid backend infrastructures.",
    techStack: ["React.js", "Vite.js", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Machine Learning",
    icon: BrainIcon,
    description:
      "Implementing applied artificial intelligence solutions to deliver real-world impact. Focused on engineering data architectures using classification models and prediction logic to evaluate physiological or complex datasets.",
    techStack: ["Python", "FastAPI"],
  },
  {
    title: "IoT Engineering",
    icon: CpuIcon,
    description:
      "Bridging the physical world with digital intelligence. Highly proficient in microcontrollers configuration, parsing real-time biometrics or motion data feeds, and controlling responsive physical mechanisms smoothly.",
    techStack: ["ESP32", "ESP8266", "IoT Components"],
  },
]);

const activeSkill = computed(() => skillsData.value[activeTabIndex.value]);
</script>

<style scoped>
section {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h2,
h3 {
  letter-spacing: -0.02em;
}
</style>
