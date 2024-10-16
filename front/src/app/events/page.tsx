"use client";

import { Event } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type EventCardProps = {
  event: Event;
  i: number;
};

function EventCard({ event, i }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [onParticipantsList, setOnParticipantsList] = useState<boolean>(false);

  return (
    <div
      ref={cardRef}
      className={`bg-secondary border rounded-sm border-black block p-5 mt-5 ${i % 2 == 0 ? "" : "ml-auto"} w-8/12`}
    >
      <div className="flex">
        <h1 className="text-2xl font-bold mb-1 mr-4">{event.name}</h1>
        <Link href={event.link} target="_blank" className="mt-2">
          <Image
            src="/external-link.png"
            alt="external link"
            width={16}
            height={16}
          />
        </Link>
      </div>
      <h2 className="text-lg">{event.place}</h2>
      <h3 className="text-sm mb-4">
        {event.end_date == null
          ? event.start_date.toLocaleString().split(",")[0]
          : `du ${event.start_date.toLocaleString().split(",")[0]} au ${
              event.end_date.toLocaleString().split(",")[0]
            }`}
      </h3>
      <p className="mb-4">{event.about}</p>
      <p className="text-sm mb-5">{`par ${event.by}`}</p>
      <div className="flex">
        <button className="text-xs p-2 bg-taskbar_button border border-black rounded-md font-bold mr-4 hover:bg-taskbar_button_hover">
          😊 J'y serai !
        </button>
        <p
          onMouseEnter={() => setOnParticipantsList(true)}
          onMouseOut={() => setOnParticipantsList(false)}
          className="text-xs mt-auto mb-auto hover:cursor-grab"
        >
          Voir la liste des participants
        </p>
        {onParticipantsList ? <p>GROS CACA</p> : null}
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <style jsx>{`
        .loader {
          border: 16px solid #999999;
          border-top: 16px solid #bab7b7;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader" />
    </div>
  );
}

export default function Events() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const events: Array<Event> = [];
  for (let i of [1, 2, 3, 4, 5]) {
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
      {loading ? (
        <Loading />
      ) : (
        events.map((event, i) => {
          return (
            <div key={i} className="flex w-full mb-5">
              {i % 2 === 0 ? (
                <>
                  <EventCard key={i} event={event} i={i} />
                  <div className={`ml-5 relative w-4/12 mt-5`}>
                    <Image
                      src={`/cats/${i}.jpg`}
                      alt="goofy cat"
                      layout="fill"
                      objectFit="fill"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={`mr-5 relative w-4/12 mt-5`}>
                    <Image
                      src={`/cats/${i}.jpg`}
                      alt="goofy cat"
                      layout="fill"
                      objectFit="fill"
                    />
                  </div>
                  <EventCard key={i} event={event} i={i} />
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
