export default function PhoneMockup(props) {
    return (
      <div class={`relative group ${props.class || ""}`}>
        {/* Marco del teléfono */}
        <div class="relative w-[160px] md:w-[220px] h-[320px] md:h-[440px] rounded-[32px] bg-neutral-900 p-2 md:p-3 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105">
          {/* Notch */}
          <div class="absolute top-0 left-0 right-0 h-5 md:h-6 z-20 flex justify-center">
            <div class="w-20 md:w-28 h-5 md:h-6 bg-black rounded-b-2xl"></div>
          </div>
          {/* Pantalla */}
          <div class="w-full h-full rounded-[24px] overflow-hidden relative bg-white">
            {props.children}
            {/* Reflejo sutil */}
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          </div>
          {/* Indicador home */}
          <div class="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 md:w-24 h-1 bg-neutral-700 rounded-full"></div>
        </div>
        {/* Sombra/glow */}
        <div class="absolute -inset-2 bg-blue-500/5 rounded-[40px] -z-10 blur-2xl"></div>
        {/* Tooltip/tag */}
        {props.appName && (
          <div class="absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200">
            <span class="bg-neutral-800 text-white text-xs px-3 py-1 rounded-full shadow-lg border border-neutral-700">
              {props.appName}
            </span>
          </div>
        )}
      </div>
    );
  }