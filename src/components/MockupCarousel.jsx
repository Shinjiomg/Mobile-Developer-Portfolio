import { createSignal, onCleanup, onMount, createEffect } from "solid-js";
import PhoneMockup from "./PhoneMockup.jsx";

const mockups = [
  { src: "/mockup1.png", appName: "Fitness App" },
  { src: "/mockup2.png", appName: "Egirl App" },
  { src: "/mockup1.png", appName: "Tareas App" },
  { src: "/mockup2.png", appName: "Social App" },
];

// Definimos las posiciones y transformaciones para cada carta
const cardTransforms = [
  // Frontal
  {
    z: 30,
    scale: 1.05,
    x: 0,
    y: 0,
    rotateZ: 0,
    opacity: 1,
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.3)",
  },
  // Medio
  {
    z: 20,
    scale: 0.95,
    x: -60,
    y: 10,
    rotateZ: -10,
    opacity: 0.8,
    boxShadow: "0 4px 16px 0 rgba(0,0,0,0.2)",
  },
  // Trasero
  {
    z: 10,
    scale: 0.9,
    x: -120,
    y: 20,
    rotateZ: -18,
    opacity: 0.5,
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.15)",
  },
  // Más trasero
  {
    z: 0,
    scale: 0.85,
    x: -180,
    y: 30,
    rotateZ: -24,
    opacity: 0.3,
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)",
  },
];

export default function MockupCarousel() {
  const [order, setOrder] = createSignal([0, 1, 2, 3]);
  const [isShuffling, setIsShuffling] = createSignal(false);
  const [hovered, setHovered] = createSignal(-1);
  const [frontHover, setFrontHover] = createSignal(false);
  const [transitionDirection, setTransitionDirection] = createSignal(null);
  const [incoming, setIncoming] = createSignal(null);
  const [outgoing, setOutgoing] = createSignal(null);
  let intervalId;
  const isHovered = { value: false };

  // Swipe en mobile
  let startX = null;
  let carouselRef;
  function handleTouchStart(e) { startX = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) handleShuffle('prev');
    else if (startX - endX > 40) handleShuffle('next');
    startX = null;
  }

  // Avanza el shuffle automáticamente
  onMount(() => {
    intervalId = setInterval(() => {
      if (!isHovered.value) {
        handleShuffle('next');
      }
    }, 4000);
  });
  onCleanup(() => clearInterval(intervalId));

  function handleShuffle(direction) {
    if (isShuffling()) return;
    setTransitionDirection(direction);
    setIsShuffling(true);

    // Determina el entrante ANTES de cambiar el orden
    let incomingIdx;
    if (direction === 'next') {
      incomingIdx = order()[1];
    } else {
      incomingIdx = order()[order().length - 1];
    }
    setIncoming({ idx: incomingIdx, direction });
    setOutgoing({ idx: order()[0], direction });

    setTimeout(() => {
      setOrder((prev) => {
        const newOrder = [...prev];
        if (direction === 'next') {
          const first = newOrder.shift();
          newOrder.push(first);
        } else {
          const last = newOrder.pop();
          newOrder.unshift(last);
        }
        return newOrder;
      });
      setTransitionDirection(null);
      setTimeout(() => {
        setIsShuffling(false);
        setIncoming(null);
        setOutgoing(null);
      }, 600);
    }, 400);
  }

  function handleMouseEnter() { isHovered.value = true; }
  function handleMouseLeave() { isHovered.value = false; }

  // Indicador de posición (dots)
  createEffect(() => {
    const idx = order()[0];
    const indicator = document.getElementById("carousel-indicator");
    if (indicator) {
      indicator.innerHTML = mockups.map((_, i) =>
        `<span style="width:10px;height:10px;border-radius:50%;display:inline-block;margin:0 2px;background:${i === idx ? '#2563eb' : '#444'};opacity:${i === idx ? '1' : '0.4'};"></span>`
      ).join("");
    }
  });

  return (
    <div
      ref={el => carouselRef = el}
      class="relative flex items-center justify-center w-[320px] md:w-[600px] h-[340px] md:h-[460px] select-none"
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
      ontouchstart={handleTouchStart}
      ontouchend={handleTouchEnd}
      tabIndex={0}
      aria-label="Carrusel de mockups"
    >

      {/* Mockups */}
      {order().map((mockupIdx, pos) => {
        const t = cardTransforms[pos];
        const isFront = pos === 0;
        if (!isFront) {
          return (
            <div
              class={`absolute transition-transform duration-700 ease-[cubic-bezier(.68,-0.55,.27,1.55)]`}
              style={`
                z-index: ${t.z};
                opacity: ${t.opacity};
                box-shadow: ${t.boxShadow};
                transform:
                  translateX(${t.x}px)
                  translateY(${t.y}px)
                  scale(${t.scale})
                  rotateZ(${t.rotateZ}deg)
                  perspective(800px)
                  rotateY(${isFront && frontHover() ? 24 : 0}deg);
              `}
              onMouseEnter={() => { setHovered(pos); }}
              onMouseLeave={() => { setHovered(-1); }}
            >
              <PhoneMockup appName={mockups[mockupIdx].appName}>
                <img src={mockups[mockupIdx].src} alt={mockups[mockupIdx].appName} class="w-full h-full object-cover" />
              </PhoneMockup>
              {/* Tooltip */}
              {hovered() === pos && (
                <div class="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-neutral-900 text-white text-xs px-2 2xl:px-3 py-1 rounded-full shadow-lg border border-blue-700 animate-fadein-tooltip pointer-events-none">
                  {mockups[mockupIdx].appName}
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
      {/* Renderizar el mockup saliente y el entrante en el frente */}
      {/* OUTGOING (saliente) */}
      {outgoing() && (
        <div
          class={`absolute transition-transform duration-700 ease-[cubic-bezier(.68,-0.55,.27,1.55)] ${
            outgoing().direction === 'next' ? 'animate-slide-out-right' : 'animate-slide-out-left'
          }`}
          style={`
            z-index: 30;
            opacity: 1;
            box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3);
            transform:
              translateX(0px)
              translateY(0px)
              scale(1.05)
              rotateZ(0deg)
              perspective(800px)
              rotateY(0deg);
          `}
        >
          <PhoneMockup appName={mockups[outgoing().idx].appName}>
            <img src={mockups[outgoing().idx].src} alt={mockups[outgoing().idx].appName} class="w-full h-full object-cover" />
          </PhoneMockup>
        </div>
      )}
      {/* INCOMING (entrante) */}
      {incoming() && (
        <div
          class={`absolute transition-transform duration-700 ease-[cubic-bezier(.68,-0.55,.27,1.55)] ${
            incoming().direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
          }`}
          style={`
            z-index: 30;
            opacity: 1;
            box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3);
            transform:
              translateX(0px)
              translateY(0px)
              scale(1.05)
              rotateZ(0deg)
              perspective(800px)
              rotateY(${frontHover() ? 24 : 0}deg);
          `}
        >
          <PhoneMockup appName={mockups[incoming().idx].appName}>
            <img src={mockups[incoming().idx].src} alt={mockups[incoming().idx].appName} class="w-full h-full object-cover" />
          </PhoneMockup>
        </div>
      )}
      {/* Si no hay transición, renderiza el frontal normalmente */}
      {!incoming() && !outgoing() && (
        <div
          class={`absolute transition-transform duration-700 ease-[cubic-bezier(.68,-0.55,.27,1.55)]`}
          style={`
            z-index: 30;
            opacity: 1;
            box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3);
            transform:
              translateX(0px)
              translateY(0px)
              scale(1.05)
              rotateZ(0deg)
              perspective(800px)
              rotateY(${frontHover() ? 24 : 0}deg);
          `}
          onMouseEnter={() => { setHovered(0); setFrontHover(true); }}
          onMouseLeave={() => { setHovered(-1); setFrontHover(false); }}
        >
          <PhoneMockup appName={mockups[order()[0]].appName}>
            <img src={mockups[order()[0]].src} alt={mockups[order()[0]].appName} class="w-full h-full object-cover" />
          </PhoneMockup>
          {/* Tooltip */}
          {hovered() === 0 && (
            <div class="md:block hidden absolute left-1/2 -translate-x-1/2 -bottom-8 bg-neutral-900 text-white text-xs px-2 2xl:px-3 py-1 rounded-full shadow-lg border border-blue-700 animate-fadein-tooltip pointer-events-none">
              {mockups[order()[0]].appName}
            </div>
          )}
        </div>
      )}
      <style>{`
        .animate-fadein-tooltip {
          animation: fadein-tooltip 0.3s cubic-bezier(.68,-0.55,.27,1.55) both;
        }
        @keyframes fadein-tooltip {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: none; }
        }
        @keyframes slide-out-right {
          to {
            transform: translateX(200px) scale(0.8) rotateZ(20deg);
            opacity: 0;
          }
        }
        @keyframes slide-out-left {
          to {
            transform: translateX(-200px) scale(0.8) rotateZ(-20deg);
            opacity: 0;
          }
        }
        .animate-slide-out-right {
          animation: slide-out-right 0.4s forwards;
        }
        .animate-slide-out-left {
          animation: slide-out-left 0.4s forwards;
        }
        @keyframes slide-in-right {
          from {
            transform: translateX(-200px) scale(0.8) rotateZ(-20deg);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1.05) rotateZ(0deg);
            opacity: 1;
          }
        }
        @keyframes slide-in-left {
          from {
            transform: translateX(200px) scale(0.8) rotateZ(20deg);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1.05) rotateZ(0deg);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s cubic-bezier(.68,-0.55,.27,1.55) both;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s cubic-bezier(.68,-0.55,.27,1.55) both;
        }
      `}</style>
    </div>
  );
} 