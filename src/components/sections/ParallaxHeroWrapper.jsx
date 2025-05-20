import { createSignal, onCleanup, onMount } from "solid-js";

export default function ParallaxHeroWrapper(props) {
  const [progress, setProgress] = createSignal(0);
  let ref;

  const handleScroll = () => {
    if (!ref) return;
    const rect = ref.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Calcula cuánto del hero ha salido de la pantalla (0 = arriba, 1 = fuera)
    let p = Math.min(Math.max(-rect.top / windowHeight, 0), 1);
    setProgress(p);
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  });
  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  // Estilos reactivos
  const style = () => {
    const p = progress();
    return {
      opacity: `${1 - p * 1.2}`,
      transform: `translateY(${p * -60}px) scale(${1 - p * 0.05})`,
      filter: `blur(${p * 8}px)`
    };
  };

  return (
    <div ref={el => ref = el} style={style()} class="transition-all duration-200 will-change-transform will-change-opacity">
      {props.children}
    </div>
  );
} 