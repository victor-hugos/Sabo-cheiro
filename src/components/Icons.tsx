type P = { className?: string };
const base = "h-5 w-5";
const svg = (d: React.ReactNode) =>
  function Icon({ className }: P) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className ?? base} aria-hidden>
        {d}
      </svg>
    );
  };

export const BagIcon = svg(<><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></>);
export const SearchIcon = svg(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const UserIcon = svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>);
export const MenuIcon = svg(<path d="M4 6h16M4 12h16M4 18h16" />);
export const CloseIcon = svg(<path d="M6 6l12 12M18 6 6 18" />);
export const TruckIcon = svg(<><path d="M3 6h11v10H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>);
export const CardIcon = svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>);
export const ShieldIcon = svg(<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>);
export const LeafIcon = svg(<><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19 13 11" /></>);
export const TrashIcon = svg(<><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></>);
export const ChevronLeft = svg(<path d="m15 18-6-6 6-6" />);
export const ChevronRight = svg(<path d="m9 18 6-6-6-6" />);
export const WhatsIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? base} aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z" />
  </svg>
);
