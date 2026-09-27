const HEADING_LINES = ["Elevate Your", "Drive to", "Extraordinary", "Heights"];

export default function HeroContent() {
  return (
    <div className="flex h-full items-center px-6 sm:px-10 lg:px-16">
      <div className="max-w-xl">
        <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {HEADING_LINES.map((line, i) => (
            <span
              key={line}
              className="animate-fade-up block overflow-hidden"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {line}
            </span>
          ))}
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-sm text-lg font-light leading-relaxed text-[#BFBFBF]"
          style={{ animationDelay: "0.55s" }}
        >
          Crafting Power, Performance, and Style for the Ultimate Driving
          Experience.
        </p>

        <button
          type="button"
          className="animate-fade-up mt-10 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{ animationDelay: "0.7s" }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
