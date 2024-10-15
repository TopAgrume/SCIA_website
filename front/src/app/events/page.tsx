import { Event } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function Events() {
  const events: Array<Event> = [];

  for (var i of [1, 2, 3, 4, 5]) {
    events.push({
      name: "SCIA website development",
      link: "https://github.com/TopAgrume/SCIA_website",
      place: "Paris",
      about:
        "C'est le développement du site internet de la majeure SCIA pour en faire un endroit accueillant, regroupant plein d'informations, de projets et de connaissances !",
      start_date: new Date(2024, 10, 15),
      end_date: new Date(2024, 10, 20),
      by: "Maël Reynaud & Alexandre Devaux-Rivière",
      participants: ["mael.reynaud", "alexandre.devaux-riviere"],
    } as Event);
  }

  return (
    <div className="flex flex-wrap p-5">
      <div className="bg-secondary border rounded-sm border-black block p-5">
        <div className="flex">
          <h1 className="text-2xl font-bold mb-1 mr-4">{events[0].name}</h1>
          <Link href={events[0].link} target="_blank" className="mt-2">
            <Image
              src="/external-link.png"
              alt="external link"
              width={16}
              height={16}
            />
          </Link>
        </div>
        <h2 className="text-lg">{events[0].place}</h2>
        <h3 className="text-sm mb-4">
          {events[0].end_date == null
            ? events[0].start_date.toLocaleString().split(",")[0]
            : `du ${events[0].start_date.toLocaleString().split(",")[0]} au ${
                events[0].end_date.toLocaleString().split(",")[0]
              }`}
        </h3>
        <p className="mb-4">{events[0].about}</p>
        <p className="text-sm mb-5">{`par ${events[0].by}`}</p>
        <div className="flex">
          <button className="text-xs p-2 bg-taskbar_button border border-black rounded-md font-bold mr-4 hover:bg-taskbar_button_hover">
            😊 J'y serai !
          </button>
          <p className="text-xs mt-auto mb-auto">
            Voir la liste des participants
          </p>
        </div>
      </div>
    </div>
  );
}
