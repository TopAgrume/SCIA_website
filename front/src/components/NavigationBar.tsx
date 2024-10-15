"use client";

import { Jersey_25 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const jersey = Jersey_25({
  weight: ["400"],
  subsets: ["latin"],
});

export default function NavigationBar() {
  const buttonClasses =
    "mt-auto mb-auto ml-2 mr-2 w-32 h-8 border flex justify-center items-center rounded-sm transition-all duration-300 bg-taskbar_button border-taskbar_border hover:bg-taskbar_button_hover";

  return (
    <div className="sticky top-0">
      <div className={`w-full h-10 flex ${jersey.className} bg-taskbar_main`}>
        <button className={buttonClasses + " ml-6"}>
          <Link href="/home">
            <span className="align-middle font-black text-navbar">Accueil</span>
          </Link>
        </button>

        <button className={buttonClasses}>
          <Link href="/events">
            <span className="align-middle font-black text-navbar transform-none">
              Evenements
            </span>
          </Link>
        </button>

        <button className={buttonClasses}>
          <Link href="/projects">
            <span className="align-middle font-black text-navbar">Projets</span>
          </Link>
        </button>

        <button className={buttonClasses}>
          <Link href="/suggestions">
            <span className="align-middle font-black text-navbar">
              Suggestions
            </span>
          </Link>
        </button>

        <div className="flex ml-auto">
          <button className="rounded-full pl-1 pr-1 mt-1 mb-1 hover:bg-taskbar_button_hover duration-500">
            <Image
              src="/moon.png"
              alt="light/dark mode"
              width={28}
              height={28}
            />
          </button>

          <button className={buttonClasses + " ml-4 mr-6 w-56"}>
            <span className="align-middle font-black text-navbar">
              mael.reynaud
            </span>
          </button>
        </div>
      </div>
      <div className="w-full h-0.5 bg-black" />
    </div>
  );
}
