<script setup>
import { computed, onMounted, ref, watch } from "vue";
import {
  useContent,
  saveDraft,
  resetToDefaults,
  downloadContentJson,
  loadDraft,
  setContent,
  clearDraft,
  compareAchievements,
} from "../composables/useContent";
import { fileToCompressedBase64 } from "../utils/image";
import { DEFAULT_CONTENT } from "../data/defaultContent";

const ADMIN_PASSWORD_HASH =
  "957f91f184d43d136a15482d517ead941ab55db5cb52f81c29fd0c229ddc8ab4";
const AUTH_KEY = "porto-admin-auth";

const content = useContent();
const password = ref("");
const authError = ref("");
const isLoggedIn = ref(false);
const activeTab = ref("hero");
const statusMsg = ref("");
const hasDraft = ref(false);

const editingSkill = ref(null);
const editingSkillIndex = ref(-1);
const editingAchievement = ref(null);
const editingAchievementIndex = ref(-1);
const editingProject = ref(null);
const editingProjectIndex = ref(-1);

const tabs = [
  { key: "hero", label: "Hero" },
  { key: "skills", label: "Skills" },
  { key: "achievements", label: "Sertifikat" },
  { key: "projects", label: "Projects" },
];

const sortedAchievements = computed(() =>
  content.value.achievements
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compareAchievements(a.item, b.item)),
);

onMounted(() => {
  isLoggedIn.value = localStorage.getItem(AUTH_KEY) === "1";
  hasDraft.value = loadDraft() !== null;
});

watch(isLoggedIn, (v) => {
  if (!v) {
    resetEditors();
  }
});

async function hashText(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login() {
  authError.value = "";
  const hash = await hashText(password.value);
  if (hash !== ADMIN_PASSWORD_HASH) {
    authError.value = "Password salah.";
    password.value = "";
    return;
  }
  localStorage.setItem(AUTH_KEY, "1");
  isLoggedIn.value = true;
  password.value = "";
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  isLoggedIn.value = false;
  activeTab.value = "hero";
}

function flash(msg) {
  statusMsg.value = msg;
  setTimeout(() => {
    if (statusMsg.value === msg) statusMsg.value = "";
  }, 3500);
}

function resetEditors() {
  editingSkill.value = null;
  editingSkillIndex.value = -1;
  editingAchievement.value = null;
  editingAchievementIndex.value = -1;
  editingProject.value = null;
  editingProjectIndex.value = -1;
}

function onSaveDraft() {
  saveDraft(content.value);
  hasDraft.value = true;
  flash("Draft tersimpan di browser ini.");
}

function onExport() {
  saveDraft(content.value);
  hasDraft.value = true;
  downloadContentJson(content.value);
  flash("content.json diunduh. Taruh di public/ lalu deploy.");
}

function onReset() {
  if (!confirm("Kembalikan semua konten ke default? Draft di browser akan dihapus.")) {
    return;
  }
  resetToDefaults();
  clearDraft();
  hasDraft.value = false;
  resetEditors();
  flash("Konten dikembalikan ke default.");
}

function onDraftFromStorage() {
  const draft = loadDraft();
  if (!draft) {
    flash("Tidak ada draft di browser.");
    return;
  }
  setContent(draft);
  hasDraft.value = true;
  flash("Draft dimuat dari browser.");
}

function blankSkill() {
  return { title: "", iconKey: "monitor", description: "", techStack: [] };
}

function blankAchievement() {
  return { title: "", institution: "", period: "", image: "" };
}

function blankProject() {
  return { title: "", tags: [], desc: "", status: "", github: "" };
}

function addSkill() {
  editingSkill.value = blankSkill();
  editingSkillIndex.value = -1;
}

function startEditSkill(index) {
  const copy = JSON.parse(JSON.stringify(content.value.skills[index]));
  copy.techStack = (copy.techStack || []).join(", ");
  editingSkill.value = copy;
  editingSkillIndex.value = index;
}

function saveSkillEntry() {
  const s = editingSkill.value;
  if (!s || !String(s.title).trim()) {
    flash("Judul skill wajib diisi.");
    return;
  }
  s.techStack = String(s.techStack || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (editingSkillIndex.value >= 0) {
    content.value.skills[editingSkillIndex.value] = { ...s };
  } else {
    content.value.skills.push({ ...s });
  }
  resetEditors();
  flash("Skill disimpan.");
}

function removeSkill(index) {
  if (!confirm("Hapus skill ini?")) return;
  content.value.skills.splice(index, 1);
  if (editingSkillIndex.value === index) resetEditors();
  flash("Skill dihapus.");
}

function addAchievement() {
  editingAchievement.value = blankAchievement();
  editingAchievementIndex.value = -1;
}

function startEditAchievement(index) {
  editingAchievement.value = JSON.parse(
    JSON.stringify(content.value.achievements[index]),
  );
  editingAchievementIndex.value = index;
}

function saveAchievementEntry() {
  const a = editingAchievement.value;
  if (!a || !String(a.title).trim()) {
    flash("Judul sertifikat wajib diisi.");
    return;
  }
  if (editingAchievementIndex.value >= 0) {
    content.value.achievements[editingAchievementIndex.value] = { ...a };
  } else {
    content.value.achievements.push({ ...a });
  }
  resetEditors();
  flash("Sertifikat disimpan.");
}

function removeAchievement(index) {
  if (!confirm("Hapus sertifikat ini?")) return;
  content.value.achievements.splice(index, 1);
  if (editingAchievementIndex.value === index) {
    resetEditors();
  } else if (editingAchievementIndex.value > index) {
    editingAchievementIndex.value -= 1;
  }
  flash("Sertifikat dihapus.");
}

function addProject() {
  editingProject.value = blankProject();
  editingProjectIndex.value = -1;
}

function startEditProject(index) {
  const copy = JSON.parse(JSON.stringify(content.value.projects[index]));
  copy.tags = (copy.tags || []).join(", ");
  editingProject.value = copy;
  editingProjectIndex.value = index;
}

function saveProjectEntry() {
  const p = editingProject.value;
  if (!p || !String(p.title).trim()) {
    flash("Judul project wajib diisi.");
    return;
  }
  p.tags = String(p.tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (editingProjectIndex.value >= 0) {
    content.value.projects[editingProjectIndex.value] = { ...p };
  } else {
    content.value.projects.push({ ...p });
  }
  resetEditors();
  flash("Project disimpan.");
}

function removeProject(index) {
  if (!confirm("Hapus project ini?")) return;
  content.value.projects.splice(index, 1);
  if (editingProjectIndex.value === index) resetEditors();
  flash("Project dihapus.");
}

async function onHeroPhoto(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    content.value.hero.photo = await fileToCompressedBase64(file, 1000);
    flash("Foto profil diperbarui.");
  } catch {
    flash("Gagal memproses gambar.");
  }
  e.target.value = "";
}

async function onAchievementImage(e) {
  const file = e.target.files?.[0];
  if (!file || !editingAchievement.value) return;
  try {
    editingAchievement.value.image = await fileToCompressedBase64(file, 1200);
    flash("Gambar sertifikat diperbarui.");
  } catch {
    flash("Gagal memproses gambar.");
  }
  e.target.value = "";
}

function removeAchievementImage() {
  if (editingAchievement.value) editingAchievement.value.image = "";
}

function cancelSkillEdit() {
  resetEditors();
}

function cancelAchievementEdit() {
  resetEditors();
}

function cancelProjectEdit() {
  resetEditors();
}
</script>

<template>
  <div class="min-h-screen bg-bg text-ink font-sans antialiased">
    <div v-if="!isLoggedIn" class="min-h-screen flex items-center justify-center px-6">
      <div class="w-full max-w-sm bg-surface rounded-2xl border border-line p-8 shadow-sm">
        <h1 class="text-2xl font-bold tracking-tight mb-2">Admin Access</h1>
        <p class="text-sm text-muted mb-6">
          Masukkan password untuk mengelola konten portofolio.
        </p>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink transition-colors"
              placeholder="••••••••"
              autofocus
            />
          </div>
          <p v-if="authError" class="text-sm text-red-600">{{ authError }}</p>
          <button
            type="submit"
            class="w-full py-3 bg-accent text-accent-ink font-bold rounded-xl hover:opacity-90 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>

    <div v-else>
      <header class="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-line">
        <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-3">
            <span class="text-sm font-black tracking-tighter">PORTFOLIO ADMIN</span>
            <span
              v-if="hasDraft"
              class="text-[10px] uppercase tracking-widest border border-line text-amber-500 bg-card-soft px-2 py-0.5 rounded"
            >
              Draft aktif
            </span>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <button
              @click="onSaveDraft"
              class="px-3 py-2 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-ink transition-colors"
            >
              Simpan draft
            </button>
            <button
              @click="onExport"
              class="px-3 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-accent-ink rounded-lg hover:opacity-90 transition-colors"
            >
              Export JSON
            </button>
            <button
              @click="onReset"
              class="px-3 py-2 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-red-400 hover:text-red-600 transition-colors"
            >
              Reset
            </button>
            <button
              @click="logout"
              class="px-3 py-2 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-ink transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto px-6 py-10">
        <p
          v-if="statusMsg"
          class="mb-6 text-sm font-medium text-emerald-500 bg-card-soft border border-line rounded-xl px-4 py-3"
        >
          {{ statusMsg }}
        </p>

        <div class="mb-8 flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors"
            :class="
              activeTab === tab.key
                ? 'bg-accent text-accent-ink border-ink'
                : 'bg-surface text-muted border-line hover:border-ink'
            "
          >
            {{ tab.label }}
          </button>
        </div>

        <section
          v-if="activeTab === 'hero'"
          class="bg-surface rounded-2xl border border-line p-6 md:p-8 space-y-6"
        >
          <h2 class="text-lg font-bold tracking-tight">Hero / Deskripsi</h2>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Nama</label>
            <input
              v-model="content.hero.name"
              type="text"
              class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
            />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
              Deskripsi (pakai **teks** untuk bold)
            </label>
            <textarea
              v-model="content.hero.description"
              rows="4"
              class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Foto profil</label>
            <div class="flex items-center gap-5">
              <img
                :src="content.hero.photo"
                alt="Preview"
                class="w-24 h-24 rounded-full object-cover border border-line"
              />
              <div class="space-y-2">
                <input type="file" accept="image/*" @change="onHeroPhoto" class="text-sm text-muted" />
                <button
                  v-if="content.hero.photo !== DEFAULT_CONTENT.hero.photo"
                  @click="content.hero.photo = DEFAULT_CONTENT.hero.photo"
                  class="block text-xs font-bold uppercase tracking-wider text-faint hover:text-red-600"
                >
                  Kembalikan foto default
                </button>
              </div>
            </div>
          </div>
        </section>

        <section v-else-if="activeTab === 'skills'" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold tracking-tight">Skills</h2>
            <button
              @click="addSkill"
              class="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-accent-ink rounded-lg hover:opacity-90"
            >
              + Tambah skill
            </button>
          </div>

          <div
            v-for="(skill, index) in content.skills"
            :key="index"
            class="bg-surface rounded-2xl border border-line p-5 flex items-center justify-between gap-4"
          >
            <div class="min-w-0">
              <h3 class="font-bold truncate">{{ skill.title }}</h3>
              <p class="text-xs text-faint font-mono truncate">
                {{ skill.iconKey }} · {{ skill.techStack.join(", ") }}
              </p>
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                @click="startEditSkill(index)"
                class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-ink"
              >
                Edit
              </button>
              <button
                @click="removeSkill(index)"
                class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-red-400 hover:text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>

          <div v-if="editingSkill" class="bg-surface rounded-2xl border border-line p-6 space-y-4">
            <h3 class="font-bold">{{ editingSkillIndex >= 0 ? "Edit skill" : "Skill baru" }}</h3>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Judul</label>
              <input
                v-model="editingSkill.title"
                type="text"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Icon</label>
              <select
                v-model="editingSkill.iconKey"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink bg-surface"
              >
                <option value="phone">Phone (Mobile)</option>
                <option value="monitor">Monitor (Web)</option>
                <option value="brain">Brain (ML)</option>
                <option value="cpu">CPU (IoT)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Deskripsi</label>
              <textarea
                v-model="editingSkill.description"
                rows="3"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Tech stack (pisahkan koma)</label>
              <input
                v-model="editingSkill.techStack"
                type="text"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div class="flex gap-2">
              <button
                @click="saveSkillEntry"
                class="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-accent-ink rounded-lg"
              >
                Simpan
              </button>
              <button
                @click="cancelSkillEdit"
                class="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-line rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </section>

        <section v-else-if="activeTab === 'achievements'" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold tracking-tight">Sertifikat / Prestasi</h2>
            <button
              @click="addAchievement"
              class="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-accent-ink rounded-lg hover:opacity-90"
            >
              + Tambah sertifikat
            </button>
          </div>

          <div
            v-for="row in sortedAchievements"
            :key="row.index"
            class="bg-surface rounded-2xl border border-line p-5 flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4 min-w-0">
              <img
                v-if="row.item.image"
                :src="row.item.image"
                alt=""
                class="w-14 h-14 rounded-lg object-cover border border-line shrink-0"
              />
              <div class="min-w-0">
                <h3 class="font-bold truncate">{{ row.item.title }}</h3>
                <p class="text-xs text-faint truncate">{{ row.item.period }}</p>
              </div>
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                @click="startEditAchievement(row.index)"
                class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-ink"
              >
                Edit
              </button>
              <button
                @click="removeAchievement(row.index)"
                class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-red-400 hover:text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>

          <div v-if="editingAchievement" class="bg-surface rounded-2xl border border-line p-6 space-y-4">
            <h3 class="font-bold">
              {{ editingAchievementIndex >= 0 ? "Edit sertifikat" : "Sertifikat baru" }}
            </h3>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Judul</label>
              <input
                v-model="editingAchievement.title"
                type="text"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Instansi / deskripsi</label>
              <textarea
                v-model="editingAchievement.institution"
                rows="3"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Periode</label>
              <input
                v-model="editingAchievement.period"
                type="text"
                placeholder="2025"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Gambar sertifikat (opsional)
              </label>
              <div class="flex items-center gap-4">
                <img
                  v-if="editingAchievement.image"
                  :src="editingAchievement.image"
                  alt=""
                  class="w-20 h-20 rounded-lg object-cover border border-line"
                />
                <div class="space-y-2">
                  <input type="file" accept="image/*" @change="onAchievementImage" class="text-sm text-muted" />
                  <button
                    v-if="editingAchievement.image"
                    @click="removeAchievementImage"
                    class="block text-xs font-bold uppercase tracking-wider text-faint hover:text-red-600"
                  >
                    Hapus gambar
                  </button>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="saveAchievementEntry"
                class="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-accent-ink rounded-lg"
              >
                Simpan
              </button>
              <button
                @click="cancelAchievementEdit"
                class="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-line rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </section>

        <section v-else class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold tracking-tight">Projects</h2>
            <button
              @click="addProject"
              class="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-accent-ink rounded-lg hover:opacity-90"
            >
              + Tambah project
            </button>
          </div>

          <div
            v-for="(item, index) in content.projects"
            :key="index"
            class="bg-surface rounded-2xl border border-line p-5 flex items-center justify-between gap-4"
          >
            <div class="min-w-0">
              <h3 class="font-bold truncate">{{ item.title }}</h3>
              <p class="text-xs text-faint truncate">{{ item.tags.join(", ") }}</p>
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                @click="startEditProject(index)"
                class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-ink"
              >
                Edit
              </button>
              <button
                @click="removeProject(index)"
                class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-red-400 hover:text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>

          <div v-if="editingProject" class="bg-surface rounded-2xl border border-line p-6 space-y-4">
            <h3 class="font-bold">{{ editingProjectIndex >= 0 ? "Edit project" : "Project baru" }}</h3>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Judul</label>
              <input
                v-model="editingProject.title"
                type="text"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Tags (pisahkan koma)</label>
              <input
                v-model="editingProject.tags"
                type="text"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Deskripsi</label>
              <textarea
                v-model="editingProject.desc"
                rows="3"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink resize-none"
              ></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Status (opsional)</label>
              <input
                v-model="editingProject.status"
                type="text"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">GitHub URL</label>
              <input
                v-model="editingProject.github"
                type="text"
                class="w-full px-4 py-3 border border-line rounded-xl focus:outline-none focus:border-ink"
              />
            </div>
            <div class="flex gap-2">
              <button
                @click="saveProjectEntry"
                class="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-accent-ink rounded-lg"
              >
                Simpan
              </button>
              <button
                @click="cancelProjectEdit"
                class="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-line rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </section>

        <div class="mt-10 bg-surface rounded-2xl border border-line p-6 text-sm text-muted space-y-2">
          <p class="font-bold text-ink uppercase text-xs tracking-wider">Cara publikasi</p>
          <p>1. Edit konten di atas, lalu klik <strong>Export JSON</strong>.</p>
          <p>2. Salin file <code class="font-mono">content.json</code> ke folder <code class="font-mono">public/</code> di project ini.</p>
          <p>3. Jalankan <code class="font-mono">npm run build</code> lalu deploy folder <code class="font-mono">dist/</code>.</p>
          <p class="text-amber-500 bg-card-soft border border-line rounded-lg px-3 py-2 mt-3">
            Draft di browser hanya terlihat di perangkat ini. Pengunjung lain melihat isi
            <code class="font-mono">public/content.json</code> setelah deploy.
          </p>
          <button
            @click="onDraftFromStorage"
            class="mt-2 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-line rounded-lg hover:border-ink"
          >
            Muat draft dari browser
          </button>
        </div>
      </main>
    </div>
  </div>
</template>
