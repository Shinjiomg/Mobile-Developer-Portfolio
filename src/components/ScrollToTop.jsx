import { createSignal, onMount, onCleanup } from "solid-js";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = createSignal(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return (
    <button
      onClick={scrollToTop}
      class={`fixed right-4 md:right-9 bottom-36 md:bottom-28 bg-blue-500/20 hover:bg-blue-500/30 text-white p-3 rounded-full border border-blue-500/30 transition-all duration-300 z-100 ${
        isVisible() ? "opacity-100 translate-y-0 cursor-pointer hover:scale-110" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Volver arriba"
    >
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
} 