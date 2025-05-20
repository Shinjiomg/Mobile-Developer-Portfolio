import {
    IconHome,
    IconCode,
    IconBulb,
    IconUser,
    IconMail,
    IconDownload,
    IconDeviceMobile,
} from "@tabler/icons-solidjs";
import { onMount, createSignal } from "solid-js";

const links = [
    {
        name: "Inicio",
        href: "#hero",
        icon: IconHome,
    },
    {
        name: "Proyectos",
        href: "#projects",
        icon: IconCode,
    },
    {
        name: "Habilidades",
        href: "#skills",
        icon: IconBulb,
    },
    {
        name: "Sobre mi",
        href: "#about",
        icon: IconUser,
    },
    {
        name: "Contacto",
        href: "#contact",
        icon: IconMail,
    },
];

export default function Header() {
    const [activeTab, setActiveTab] = createSignal("hero");

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
        <>
            {/* Toolbar superior solo mobile */}
            <div class="fixed top-0 left-0 right-0 z-50 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4 py-3 md:hidden">
                <div class="flex items-center gap-2">
                    <img src="logo.webp" alt="Logo" class="w-12 h-12" />
                    <span class="font-bold text-blue-500">Juan Cuellar</span>
                </div>
                <a
                    href="/cv.pdf"
                    download
                    class="flex items-center gap-2 border-2 bg-blue-500/40 border-blue-600 text-white px-3 py-1 rounded-full font-semibold hover:bg-blue-500/10 hover:text-blue-500 transition-colors hover:scale-105 duration-300 text-sm"
                >
                    <IconDownload size={18} />
                    Descargar CV
                </a>
            </div>
            {/* Header Desktop/Tablet */}
            <div class="w-full flex justify-center pt-6 fixed top-0 left-0 right-0 z-50 hidden md:flex">
                <header class="backdrop-blur bg-[#27272B99]/70 rounded-full px-4 py-2 flex items-center gap-6 w-3/4 md:max-w-6xl 2xl:max-w-6xl mx-4">
                    <div class="flex items-center gap-2">
                        <img src="logo.webp" alt="Logo" class="w-14 h-12" />
                        <span class="font-bold text-blue-500">Juan Cuellar</span>
                    </div>
                    <nav class="flex-1 flex items-center gap-6 justify-center">
                        {links.map((link) => (
                            <a
                                data-scroll
                                href={link.href}
                                class={`flex items-center gap-2 text-gray-100 hover:text-blue-500 transition-colors md:text-sm 2xl:text-base hover:scale-105 duration-300 hover:bg-blue-500/10 rounded-full px-2 py-1 2xl:px-3 2xl:py-2 ${activeTab() === link.href.substring(1) ? "text-blue-500 bg-blue-500/10" : ""
                                    }`}
                            >
                                <link.icon />
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <a
                        href="/cv.pdf" target="_blank"
                        class="flex items-center gap-2 border-2 bg-blue-500/40 border-blue-600 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-blue-500/30 hover:text-blue-200 transition-colors hover:scale-105 duration-300"
                    >
                        <IconDownload />
                        Descargar CV
                    </a>
                </header>
            </div>

            {/* Navegación Móvil */}
            <nav class="fixed bottom-0 left-0 right-0 z-1000 bg-neutral-900 border-t border-neutral-800 flex justify-around py-2 md:hidden">
                {links.map((link) => (
                    <a
                        href={link.href}
                        data-scroll
                        class={`flex flex-col items-center ${activeTab() === link.href.substring(1)
                                ? "text-blue-500"
                                : "text-gray-400"
                            }`}
                    >
                        <link.icon size={24} />
                        <span class="text-xs">{link.name}</span>
                    </a>
                ))}
            </nav>
        </>
    );
}