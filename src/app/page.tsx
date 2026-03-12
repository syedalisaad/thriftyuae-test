"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { InputField } from "./components/InputField";
import BookingDiliveryForm from "./components/BookingDilivery";

interface BookingField {
  label: string;
  type: "select" | "date" | "time";
  val?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("Start Booking");
  const [isDiliver, setIsDiliver] = useState<boolean>(false);

  const tabs: string[] = [
    "Start Booking",
    "Monthly Specials",
    "Personal Leasing",
  ];

  const getFields = (): BookingField[] => {
    const baseFields: BookingField[] = [
      { label: "Pick Up City", type: "select", required: true },
      { label: "Pick Up Location", type: "select", required: true },
      {
        label: "Pick Up Date",
        type: "date",
        val: "03/12/2026",
      },
      {
        label: "Pick Up Time",
        type: "time",
        val: "08:00 AM",
      },
    ];

    if (activeTab === "Monthly Specials") {
      return [...baseFields];
    }

    return [
      ...baseFields,
      { label: "Drop Off City", type: "select", required: true },
      { label: "Drop Off Location", type: "select" },
      {
        label: "Drop Off Date",
        type: "date",
        val: "03/15/2026",
        required: true,
      },
      {
        label: "Drop Off Time",
        type: "time",
        val: "08:00 AM",
        required: true,
      },
    ];
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for: ${activeTab}`);
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/home-page-banner.webp')" }}
    >
      <div className="w-full max-w-5xl bg-white/95 shadow-2xl overflow-hidden rounded-sm">

        {/* Tabs */}
        <div className="flex w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center font-bold transition-colors 
              border-l-[0.5px] border-gray-300/40 first:border-l-0 ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-[#1e56a0] text-white hover:bg-[#16427d]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch}>
          {!isDiliver ? (
            <>
              {/* Fields */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                {getFields().map((field, idx) => (
                  <InputField key={idx} field={field} />
                ))}
              </div>

              {/* Deliver button */}
              <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsDiliver(true)}
                  className="flex items-center gap-3 font-bold text-sm hover:text-blue-700 transition-colors group"
                >
                  <div className="relative w-7 h-4">
                    <Image
                      alt="Deliver to me"
                      src="https://www.thriftyuae.com/icons/deliver-to-me-car.svg"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <span className="flex items-center gap-1">
                    Deliver to me
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </button>

                {/* Search button */}
                <button
                  type="submit"
                  className="bg-[#1e56a0] text-white px-6 py-2 font-bold uppercase tracking-wider hover:bg-[#16427d] transition-all rounded-sm shadow-md active:scale-95"
                >
                  Search
                </button>
              </div>
            </>
          ) : (
            <BookingDiliveryForm
              onBack={() => setIsDiliver(false)}
              activeTab={activeTab}
            />
          )}
        </form>

      </div>
    </div>
  );
}
