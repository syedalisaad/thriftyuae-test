"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

interface TimePickerProps {
  name?: string;
  defaultValue?: string;
  required?: boolean;
}

export default function TimePicker({
  name,
  defaultValue,
  required,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);
  const [showHourGrid, setShowHourGrid] = useState(false);
  const [ampm, setAmpm] = useState("AM");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowHourGrid(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const adjustHour = (delta: number) => {
    setHour((prev) => {
      let next = prev + delta;
      if (next > 12) return 1;
      if (next < 1) return 12;
      return next;
    });
  };

  const adjustMinute = (delta: number) => {
    setMinute((prev) => {
      let next = prev + delta;
      if (next >= 60) return 0;
      if (next < 0) return 55;
      return next;
    });
  };

  const selectHour = (h: number) => {
    setHour(h);
    setShowHourGrid(false);
  };

  const timeString = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return (
    <div className="relative w-full font-sans" ref={wrapperRef}>
      <input type="hidden" name={name} value={timeString} required={required} />

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-2 border border-gray-300 rounded bg-white cursor-pointer hover:border-[#1a56be] transition-all h-[35px]"
      >
        <span className="text-sm font-medium text-gray-800">{timeString}</span>
        <Clock className="w-4 h-4 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute bottom-full mb-2 bg-white border border-gray-200 shadow-2x2 rounded-lg z-[200] p-4 flex items-center gap-4">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => adjustHour(1)}
              className="text-[#1a56be] hover:bg-blue-50 p-1 rounded-full"
            >
              <ChevronUp size={24} strokeWidth={3} />
            </button>

            <span
              className="text-2x2 font-bold text-gray-900 w-10 text-center select-none cursor-pointer"
              onClick={() => setShowHourGrid(true)}
            >
              {hour.toString().padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => adjustHour(-1)}
              className="text-[#1a56be] hover:bg-blue-50 p-1 rounded-full"
            >
              <ChevronDown size={24} strokeWidth={3} />
            </button>
          </div>

          <span className="text-2x2 font-bold text-gray-300">:</span>

          {/* Minute controls */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => adjustMinute(5)}
              className="text-[#1a56be] hover:bg-blue-50 p-1 rounded-full"
            >
              <ChevronUp size={24} strokeWidth={3} />
            </button>

            <span className="text-2x2 font-bold text-gray-900 w-10 text-center select-none">
              {minute.toString().padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => adjustMinute(-5)}
              className="text-[#1a56be] hover:bg-blue-50 p-1 rounded-full"
            >
              <ChevronDown size={24} strokeWidth={3} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setAmpm(ampm === "AM" ? "PM" : "AM")}
            className="ml-2 bg-[#1a56be] hover:bg-[#1649a1] text-white px-3 py-2 rounded-md text-sm font-bold shadow-md"
          >
            {ampm}
          </button>
        </div>
      )}

      {showHourGrid && (
        <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 shadow-xl rounded-lg p-4 grid grid-cols-3 gap-2 z-[300] w-[200px]">
          {hours.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => selectHour(h)}
              className={`py-3 rounded text-sm font-semibold ${
                hour === h
                  ? "bg-[#1a56be] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {h.toString().padStart(2, "0")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
