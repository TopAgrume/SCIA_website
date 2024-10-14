import { COLORS } from "@/lib/constants";
import { Jersey_25 } from "next/font/google";
import Image from "next/image";

const jersey = Jersey_25({
  weight: ["400"],
  subsets: ["latin"],
});

export default function NavigationBar() {
  return (
    <>
      <div
        className={`w-full h-10 bg-white flex ${jersey.className}`}
        style={{ backgroundColor: COLORS.taskbar_main }}
      >
        <button
          className="mt-auto mb-auto ml-6 mr-2 w-32 h-8 border flex justify-center items-center rounded-sm transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: COLORS.taskbar_button,
            borderColor: COLORS.taskbar_border,
          }}
        >
          <span className="align-middle font-black text-navbar">Accueil</span>
        </button>

        <button
          className="mt-auto mb-auto ml-2 mr-2 w-32 h-8 border flex justify-center items-center rounded-sm transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: COLORS.taskbar_button,
            borderColor: COLORS.taskbar_border,
          }}
        >
          <span className="align-middle font-black text-navbar">
            Evenements
          </span>
        </button>

        <button
          className="mt-auto mb-auto ml-2 mr-2 w-32 h-8 border flex justify-center items-center rounded-sm transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: COLORS.taskbar_button,
            borderColor: COLORS.taskbar_border,
          }}
        >
          <span className="align-middle font-black text-navbar">Projets</span>
        </button>

        <button
          className="mt-auto mb-auto ml-2 mr-2 w-32 h-8 border flex justify-center items-center rounded-sm transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: COLORS.taskbar_button,
            borderColor: COLORS.taskbar_border,
          }}
        >
          <span className="align-middle font-black text-navbar">
            Suggestions
          </span>
        </button>

        <div className="flex ml-auto">
          <button className="rounded-full pl-1 pr-1 mt-1 mb-1 hover:bg-slate-500 duration-200">
            <Image
              src="/moon.png"
              alt="light/dark mode"
              width={28}
              height={28}
            />
          </button>

          <button
            className="mt-auto mb-auto ml-4 mr-6 w-56 h-8 border flex justify-center items-center rounded-sm transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: COLORS.taskbar_button,
              borderColor: COLORS.taskbar_border,
            }}
          >
            <span className="align-middle font-black text-navbar">
              mael.reynaud
            </span>
          </button>
        </div>
      </div>
      <div className="w-full h-0.5 bg-black" />
    </>
  );
}
