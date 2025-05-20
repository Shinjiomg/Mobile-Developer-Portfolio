import { createSignal } from "solid-js";
import { IconMail, IconAddressBook } from "@tabler/icons-solidjs";

export default function FabContact() {
  const [open, setOpen] = createSignal(false);

  function handleFabClick() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      {/* FAB */}
      <button
        class="fixed bottom-18 md:bottom-8 right-3 md:right-8 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all hover:scale-105 duration-300 hover:cursor-pointer"
        onClick={handleFabClick}
        aria-label="Contacto rápido"
      >
        <IconAddressBook size={32} />
      </button>

      {/* Overlay */}
      {open() && (
        <div
          class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Action Sheet */}
      <div
        class={`fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 ${
          open() ? "translate-y-0" : "translate-y-full"
        }`}
        style="will-change: transform;"
        aria-modal="true"
        role="dialog"
      >
        <div class="mx-auto max-w-3xl w-full bg-neutral-900 rounded-t-2xl border-t border-blue-500 shadow-2xl p-6">
          <div class="flex flex-col items-center">
            <div class="w-12 h-1.5 bg-neutral-700 rounded-full mb-4" />
            <h2 class="text-xl font-bold text-blue-400 mb-2">Contacto Rápido</h2>
            <p class="text-gray-300 mb-6 text-center">
              ¿Quieres contactarme? Elige una opción:
            </p>
            <a
              href="mailto:contact@devmobile.com"
              class="w-full mb-3 flex items-center justify-center gap-2 border-2 border-blue-500/30 bg-blue-500/30 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition hover:scale-102 duration-300 hover:cursor-pointer"
            >
              <IconMail size={20} />
              Email
            </a>
            <button
              class="w-full mb-3 flex items-center justify-center gap-2 border-2 border-green-500/30 bg-green-500/30 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition hover:scale-102 duration-300 hover:cursor-pointer"
              onClick={() => window.open('https://wa.me/15551234567', '_blank')}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.43.02 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
              WhatsApp
            </button>
            <button
              class="w-full flex items-center justify-center gap-2 border-2 border-red-500/30 bg-red-500/30 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition hover:scale-102 duration-300 hover:cursor-pointer"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
