import Link from "next/link";
import { CalendarDays, Menu } from "lucide-react";

const NAV_LINKS = ["FAQ", "Contact", "About Us"];

export default function Navbar({
  showBooking = false,
  className = "absolute",
}: {
  showBooking?: boolean;
  className?: string;
}) {
  return (
    <header className={`top-0 left-0 z-20 w-full ${className}`}>
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center gap-14">
          <Link
            href="/"
            className="text-lg font-light tracking-[0.15em] text-white sm:text-xl"
          >
            AERION&nbsp;GT
          </Link>

          <ul className="hidden items-center gap-14 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm font-light tracking-wide text-white/90 transition-colors hover:text-white"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          {showBooking && (
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-light text-white transition-colors hover:bg-white/10 sm:flex"
            >
              <CalendarDays size={16} strokeWidth={1.5} />
              Book a Test Drive
            </button>
          )}

          <button
            type="button"
            aria-label="Open menu"
            className="text-white transition-opacity hover:opacity-70"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </header>
  );
}
