import {
  IconHome,
  IconCode,
  IconUser,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconDeviceMobile,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-solidjs";
import { createSignal, onMount } from "solid-js";
const currentYear = new Date().getFullYear();

export default function Footer() {
  onMount(() => {
    // Smooth scroll para enlaces
    document.querySelectorAll("a[data-scroll]").forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                setActiveTab(anchor.getAttribute("href").substring(1));
            }
        });
    });

    // Observer para detectar sección activa
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        },
        { threshold: 0.5 }
    );

    // Observar todas las secciones
    document.querySelectorAll("section[id]").forEach((section) => {
        observer.observe(section);
    });
});
  return (
    <footer class="bg-neutral-900/80 py-8 backdrop-blur-md border-t border-blue-800/30">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <img src="juan.jpg" alt="avatar" class="object-cover w-24 h-24 text-blue-400 bg-neutral-800 rounded-full border-2 border-blue-400 shadow" />
          <div>
            <span class="block text-lg font-bold text-blue-400">Desarrollador Mobile</span>
            <span class="block text-xs text-gray-500 mt-1">📍 Bogotá, Colombia</span>
            <span class="block text-xs text-gray-500 mt-1">📞 +57 317 800 0000</span>
            <span class="block text-xs text-gray-500 mt-1">📧 juan.cuellar@gmail.com</span>
          </div>

        </div>
        <div class="flex flex-col items-center gap-3">
          <span class="italic text-gray-400 text-center max-w-xs">
            "Apasionado por crear experiencias móviles intuitivas y de alto rendimiento."
          </span>
          <div class="flex flex-wrap gap-2 justify-center">
            <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/30">Kotlin</span>
            <span class="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30">Jetpack Compose</span>
            <span class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30">Android</span>
          </div>
          <span class="text-xs text-blue-400 mt-2">Disponible para nuevos proyectos freelance</span>
        </div>
        <div class="flex flex-col items-center gap-3">
          <div class="flex gap-4">
            <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" class="group relative text-gray-400 hover:text-blue-400 transition-colors" aria-label="GitHub">
              <IconBrandGithub class="w-6 h-6" />
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" class="group relative text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <IconBrandLinkedin class="w-6 h-6" />
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">LinkedIn</span>
            </a>
            <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" class="group relative text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
              <IconBrandTwitter class="w-6 h-6" />
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">Twitter</span>
            </a>
            <a href="https://www.instagram.com/tuusuario" target="_blank" rel="noopener noreferrer" class="group relative text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
              <IconBrandInstagram class="w-6 h-6" />
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">Instagram</span>
            </a>
            <a href="https://www.facebook.com/tuusuario" target="_blank" rel="noopener noreferrer" class="group relative text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
              <IconBrandFacebook class="w-6 h-6" />
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">Facebook</span>
            </a>
          </div>
          <div class="gap-2 flex-row md:flex-col hidden md:flex">
            <a href="#contact" data-scroll class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-full shadow transition-all font-semibold text-sm">
              <IconMail class="w-5 h-5" />
              Contáctame
            </a>
          </div>
          <div class="mt-2 text-right text-gray-500 text-xs">
            <p>&copy; {currentYear} Juan Cuellar.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
