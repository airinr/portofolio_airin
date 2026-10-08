<script setup>
import { ref } from "vue";

const email = "airinristianawork@gmail.com";
const subject = ref("");
const message = ref("");

const sendEmail = () => {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email,
    su: subject.value,
    body: message.value,
  });
  window.open(`https://mail.google.com/mail/?${params.toString()}`, "_blank");
};
</script>

<template>
  <footer
    id="contact"
    class="bg-surface border-t border-line pt-16 pb-12 px-6"
  >
    <div class="max-w-2xl mx-auto">
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-ink tracking-tight mb-4">
          Get in Touch
        </h2>
        <p class="text-muted">
          Have a project in mind or just want to say hi? Feel free to send me a
          message directly via Gmail.
        </p>
      </div>

      <form @submit.prevent="sendEmail" class="space-y-6">
        <div>
          <label
            class="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider"
            >Subject</label
          >
          <input
            v-model="subject"
            type="text"
            placeholder="What is this about?"
            class="w-full px-4 py-3 bg-field border border-field-border rounded-xl focus:outline-none focus:border-ink transition-colors"
            required
          />
        </div>
        <div>
          <label
            class="block text-sm font-semibold text-muted mb-2 uppercase tracking-wider"
            >Message</label
          >
          <textarea
            v-model="message"
            rows="4"
            placeholder="Your message here..."
            class="w-full px-4 py-3 bg-field border border-field-border rounded-xl focus:outline-none focus:border-ink transition-colors resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full py-4 bg-accent text-accent-ink font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
        >
          Send Message
        </button>
      </form>

      <div
        class="mt-24 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-faint font-medium"
      >
        <p>© 2026 Airin Ristiana. All rights reserved.</p>
        <div class="flex gap-8">
          <a
            href="https://github.com/airinr"
            target="_blank"
            class="hover:text-ink transition-colors"
            >GitHub</a
          >
          <a
            href="https://www.linkedin.com/in/airinristiana"
            target="_blank"
            class="hover:text-ink transition-colors"
            >LinkedIn</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
