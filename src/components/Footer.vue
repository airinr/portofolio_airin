<script setup>
import { ref } from "vue";

const email = "irinristi@gmail.com";
const subject = ref("");
const message = ref("");

const sendEmail = () => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(message.value)}`;
  window.location.href = mailtoLink;
};
</script>

<template>
  <footer
    id="contact"
    class="bg-white border-t border-slate-100 pt-24 pb-12 px-6"
  >
    <div class="max-w-2xl mx-auto">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">
          Get in Touch
        </h2>
        <p class="text-slate-500">
          Have a project in mind or just want to say hi? Feel free to send me a
          message directly to my email.
        </p>
      </div>

      <form @submit.prevent="sendEmail" class="space-y-6">
        <div>
          <label
            class="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
            >Subject</label
          >
          <input
            v-model="subject"
            type="text"
            placeholder="What is this about?"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-black transition-colors"
            required
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
            >Message</label
          >
          <textarea
            v-model="message"
            rows="4"
            placeholder="Your message here..."
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-black transition-colors resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          Send Message
        </button>
      </form>

      <div
        class="mt-24 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400 font-medium"
      >
        <p>© 2026 Airin Ristiana. All rights reserved.</p>
        <div class="flex gap-8">
          <a
            href="https://github.com/airinr"
            target="_blank"
            class="hover:text-black transition-colors"
            >GitHub</a
          >
          <a href="#" class="hover:text-black transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
</template>
