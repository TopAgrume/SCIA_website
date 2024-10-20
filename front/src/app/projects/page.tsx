"use client";

export default function Projects() {
  return (
    <div className="h-[calc(100vh-42px)] flex">
      <div className="w-1/2 h-[calc(100vh-42px)] overflow-y-auto p-4 bg-gray-100">
        <h1 className="text-xl font-bold mb-4">Intégrations</h1>
        <p>{"Scroll me ".repeat(500)}</p>
      </div>

      <div className="w-[2px] h-[calc(100vh-42px)] bg-gray-400"></div>

      <div className="w-1/2 h-[calc(100vh-42px)] overflow-y-auto p-4 bg-gray-200">
        <h1 className="text-xl font-bold mb-4">Présentations</h1>
        <p>{"Scroll me too ".repeat(500)}</p>
      </div>
    </div>
  );
}
