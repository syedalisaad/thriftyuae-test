"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { InputField } from "./components/InputField";
import BookingDeliveryForm from "./components/BookingDelivery";
import { Field, ValidationError } from "./lib/types/booking";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("Start Booking");
  const [isDeliver, setIsDeliver] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [locationData, setLocationData] = useState<any[]>([]);
const [selectedPickUpCity, setSelectedPickUpCity] = useState("");
const [selectedDropOffCity, setSelectedDropOffCity] = useState("");

useEffect(() => {
  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/v1/locations');
      const json = await res.json();
      if (json.success) setLocationData(json.data);
    } catch (err) {
      console.error("Failed to load locations", err);
    }
  };
  fetchLocations();
}, []);
  const tabs: string[] = [
    "Start Booking",
    "Monthly Specials",
    "Personal Leasing",
  ];
  const handleTabChange = (tab: string) => {
    if (tab === "Personal Leasing") {
      window.location.href = "https://pl.thriftyuae.com/";
      return;
    }

    setActiveTab(tab);
  };

  const getFields = (): Field[] => {
    const pickUpAreas = locationData.find(l => l.city === selectedPickUpCity)?.areas || [];
  const dropOffAreas = locationData.find(l => l.city === selectedDropOffCity)?.areas || [];
    const baseFields: Field[] = [
      { label: "Pick Up City", type: "select", required: true,options: locationData.map(l => l.city), // Dynamic cities
      onChange: (e: any) => setSelectedPickUpCity(e.target.value) },
      { label: "Pick Up Location", type: "select", required: true ,name: "pick_up_location", 
      options: pickUpAreas },
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

    if (activeTab === "Start Booking") {
      return [
        ...baseFields,
        { label: "Drop Off City", type: "select", required: true,options: locationData.map(l => l.city),
        onChange: (e: any) => setSelectedDropOffCity(e.target.value) },
        { label: "Drop Off Location", type: "select",name: "drop_off_location", 
        options: dropOffAreas },
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
          name: "drop_off_time",
          required: true,
        },
      ];
    }

    if (activeTab === "Monthly Specials") {
      return baseFields;
    }

    return [];
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const formData = new FormData(e.currentTarget);

    const bodyData = Object.fromEntries(formData.entries());

    const finalPayload = {
      ...bodyData,
      activeTab: activeTab 
    };

    try {
      const response = await fetch("/api/v1/search", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload), 
      });

      const data = await response.json();

      if (data.success === false) {
        if (data.errors) {
          setErrors(data.errors);
        }
        return;
      }
    } catch (err) {
      console.error("Connection error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/home-page-banner.webp')`,
      }}
    >
      <div className="w-full  max-w-5xl bg-white/70 backdrop-blur-md shadow-2xl overflow-hidden rounded-sm border border-white/20 ">
        {" "}
        <div className="flex w-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
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
        {errors.length > 0 && (
          <div className="mx-8 mt-6 p-3 bg-[#fdf2f2] border border-[#f8d7da] rounded-sm transition-all animate-in fade-in slide-in-from-top-2">
            {errors.map((error, index) => (
              <p
                key={index}
                className="text-[#a94442] text-[13px] font-medium flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-[#a94442] rounded-full inline-block" />
                {error.message}
              </p>
            ))}
          </div>
        )}
        <form onSubmit={handleSearch}>
          {!isDeliver ? (
            <>
              <div className="p-4 md:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                {" "}
                {getFields().map((field, idx) => {
                  const isDateTime =
                    field.type === "date" || field.type === "time";

                  return (
                    <div
                      key={idx}
                      className={`${
                        isDateTime ? "col-span-1" : "col-span-2"
                      } sm:col-span-1`}
                    >
                      <InputField field={field} />
                    </div>
                  );
                })}
              </div>

             <div className="px-4 md:px-8 pb-6 grid grid-cols-2 items-center gap-4 w-full">
  {/* Column 1: Left Aligned */}
  <div className="flex justify-start">
    <button
      type="button"
      onClick={() => setIsDeliver(true)}
      className="flex items-center gap-2 md:gap-3 font-bold text-[12px] md:text-sm hover:text-blue-700 transition-colors group whitespace-nowrap"
    >
      <div className="relative w-6 h-3 md:w-7 md:h-4">
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
  </div>

  <div className="flex justify-end">
    <button
      type="submit"
      className="
       
        w-[100px] md:w-auto 
        py-2 md:py-2.5 
        px-0 md:px-10 
        text-[12px] md:text-sm
        
        bg-[#1e56a0] text-white font-bold uppercase tracking-wider 
        hover:bg-[#16427d] transition-all rounded-sm shadow-md active:scale-95
      "
    >
      Search
    </button>
  </div>
</div>
            </>
          ) : (
            <BookingDeliveryForm
              onBack={() => setIsDeliver(false)}
              activeTab={activeTab}
            />
          )}
        </form>
      </div>
    </div>
  );
}
