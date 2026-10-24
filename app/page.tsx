 
import Link from "next/link";
import DestinationGrid from "@/components/destinations/DestinationGrid";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

const travelStyles = [
  {
    number: "01",
    title: "Ancient history",
    description: "Walk through centuries of extraordinary stories.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85",
    href: "/destinations?category=Historical",
  },
  {
    number: "02",
    title: "Wild landscapes",
    description: "Find your next view above the clouds.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    href: "/destinations?category=Natural",
  },
  {
    number: "03",
    title: "Culture & heritage",
    description: "Experience traditions that live through generations.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85",
    href: "/destinations?category=Cultural",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteNavbar />

      <main className="min-h-screen bg-[#faf9f6] text-stone-900">
        {/* HERO */}
        <section className="relative flex min-h-[590px] items-center overflow-hidden bg-stone-900 sm:min-h-[660px]">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90"
            alt="Majestic mountain peaks rising above the clouds"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-sm">
                A land of origins and wonders
              </p>

              <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find yourself
                <br />
                in <span className="font-serif italic text-amber-200">Ethiopia.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                From ancient kingdoms to breathtaking highlands, discover
                places that stay with you long after the journey ends.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-3 rounded-full bg-amber-200 px-7 py-4 text-sm font-semibold text-stone-950 transition hover:bg-amber-100"
                >
                  Explore destinations <span aria-hidden="true">↗</span>
                </Link>

                <a
                  href="#discover"
                  className="inline-flex items-center rounded-full border border-white/50 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Discover our Ethiopia
                </a>
              </div>

              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/25 pt-6 text-sm text-white/75">
                <span>✦ Ancient heritage</span>
                <span>✦ Extraordinary nature</span>
                <span>✦ Living cultures</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 right-8 hidden text-xs uppercase tracking-[0.25em] text-white/60 lg:block">
            The beginning of something unforgettable
          </div>
        </section>

        {/* INTRODUCTION */}
        <section id="discover" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                More than a destination
              </p>

              <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Some places you visit.
                <br />
                <span className="font-serif italic text-emerald-900">
                  Others you feel.
                </span>
              </h2>
            </div>

            <div>
              <p className="max-w-xl text-base leading-8 text-stone-600">
                Ethiopia brings together dramatic natural beauty, remarkable
                history, and diverse cultural traditions. Start with what
                interests you, then find the destination that speaks to you.
              </p>

              <Link
                href="/destinations"
                className="mt-5 inline-flex items-center gap-2 border-b border-emerald-900 pb-1 text-sm font-semibold text-emerald-900 transition hover:text-emerald-700"
              >
                View all destinations <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED DESTINATIONS */}
        <section className="border-y border-stone-200 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                  Your next adventure
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Places worth discovering
                </h2>

                <p className="mt-3 max-w-xl leading-7 text-stone-600">
                  Explore remarkable places, each with a story of its own.
                </p>
              </div>

              <Link
                href="/destinations"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-900 transition hover:text-emerald-700"
              >
                See every destination <span aria-hidden="true">→</span>
              </Link>
            </div>

            <DestinationGrid limit={4} />
          </div>
        </section>

        {/* TRAVEL STYLES */}
        <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                Find your kind of journey
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                What calls you?
              </h2>

              <p className="mt-4 leading-7 text-stone-600">
                Whether you love history, the outdoors, or discovering local
                traditions, there is more than one way to experience Ethiopia.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {travelStyles.map((style) => (
                <Link
                  key={style.number}
                  href="/destinations"
                  className="group relative min-h-[370px] overflow-hidden rounded-2xl bg-stone-900"
                >
                  <img
                    src={style.image}
                    alt={style.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="text-xs font-semibold tracking-[0.2em] text-amber-200">
                      {style.number} / EXPLORE
                    </span>

                    <h3 className="mt-3 text-2xl font-semibold">
                      {style.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {style.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                      Find your destination <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CALL TO ACTION */}
        <section className="bg-emerald-950 px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                Your story starts here
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                The extraordinary is
                <br />
                closer than you think.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-white/75">
                Find a place you love, learn what makes it special, and start
                planning your next Ethiopian adventure.
              </p>
            </div>

            <Link
              href="/destinations"
              className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-amber-200 px-7 py-4 text-sm font-semibold text-stone-950 transition hover:bg-amber-100"
            >
              Start exploring <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
