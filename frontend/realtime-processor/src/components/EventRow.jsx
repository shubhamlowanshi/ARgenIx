import React from "react";

const EventRow = ({ index, event }) => {
  if (!event) return null;

  const isNew =
    Date.now() -
      new Date(event.createdAt || Date.now()).getTime() <
    4000;

  return (
    <div
      className={`grid grid-cols-4 p-2 border-b border-white/10 text-sm transition hover:bg-white/5 ${
        isNew ? "animate-pulse bg-green-900/10" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {event.name}
        {isNew && (
          <span className="text-[10px] bg-green-700 px-1 rounded">
            NEW
          </span>
        )}
      </div>

      <div className="text-green-400 font-mono">
        {event.value}
      </div>

      <div className="text-gray-400">
        {event.time || "just now"}
      </div>

      <div className="text-xs text-gray-500">
        {event._id || index}
      </div>
    </div>
  );
};

export default React.memo(EventRow);
