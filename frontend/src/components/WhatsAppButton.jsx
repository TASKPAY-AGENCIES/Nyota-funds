const WHATSAPP_NUMBER = "254782634172";
const MESSAGE = "Hello Nyota Funds, Nitaaply aje ili niweze kupata Nyota funds?, Nisaidie";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/40 transition-transform hover:scale-110 active:scale-95"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <svg viewBox="0 0 32 32" className="relative h-8 w-8 fill-white">
        <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.2 1.62 6.02L4 29l8.12-1.58a12 12 0 0 0 3.92.66C22.68 28.08 28 22.68 28 16.04 28 9.4 22.68 3 16.04 3zm0 22a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-4.82.94.98-4.7-.24-.38A9.9 9.9 0 0 1 6.1 15.04C6.1 9.58 10.56 5.1 16.04 5.1c5.46 0 9.9 4.48 9.9 9.94 0 5.5-4.44 9.96-9.9 9.96zm5.44-7.42c-.3-.14-1.76-.86-2.04-.96-.28-.1-.48-.14-.68.14-.2.3-.78.96-.96 1.16-.18.2-.36.22-.66.08-.3-.14-1.26-.46-2.4-1.48-.88-.8-1.48-1.76-1.66-2.06-.18-.3-.02-.46.14-.6.14-.14.3-.36.46-.54.14-.18.2-.3.3-.5.1-.2.04-.38-.02-.52-.08-.14-.68-1.64-.92-2.24-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.1 3 1.26 3.2c.14.2 2.18 3.32 5.28 4.66.74.32 1.32.5 1.76.64.74.24 1.42.2 1.96.12.6-.1 1.76-.72 2.02-1.42.24-.7.24-1.3.18-1.42-.08-.12-.28-.2-.58-.34z" />
      </svg>
    </a>
  );
}
