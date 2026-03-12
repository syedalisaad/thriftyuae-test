"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { InputField } from "./InputField";

interface Props {
  onBack: () => void;
  activeTab: string;
}

export default function BookingDiliveryForm({ onBack, activeTab }: Props) {
  const [returnType, setReturnType] = useState("collection");
  const [returnLocation, setReturnLocation] = useState("same");

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg font-sans ">
      <div className="mb-6">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center text-sm font-bold mb-2 hover:text-[#1a56be] transition-colors"
        >
          <span className="mr-1 text-lg">‹</span> Deliver to me
        </button>

        <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
          *Delivery time may vary due to traffic conditions. We appreciate your
          patience as we work diligently to ensure your delivery reaches you as
          soon as possible. Additional charges for delivery and collection may
          apply.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            field={{ label: "Delivery City", type: "select", required: true }}
          />
          <InputField
            field={{ label: "Delivery Area", type: "select", required: true }}
          />
          <InputField
            field={{
              label: "Delivery Address",
              type: "text",
              val: "",
              required: false,
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            field={{
              label: "Delivery Date",
              type: "date",
              val: "2026-03-12",
              required: true,
              icon: <Calendar size={18} />,
            }}
          />
          <InputField
            field={{
              label: "Delivery Time",
              type: "time",
              val: "08:00 AM",
              required: true,
            }}
          />
        </div>

        {activeTab === "Start Booking" && (
          <div className="space-y-6 pt-4 ">
            <div className="space-y-3">
              <h3 className="text-[14px] font-bold text-black">
                How would you like to return the car?
              </h3>

              <div className="flex gap-4 items-center text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="returnType"
                    value="dropoff"
                    checked={returnType === "dropoff"}
                    onChange={(e) => setReturnType(e.target.value)}
                    className="mr-2 accent-[#1a56be] w-4 h-4"
                  />
                  Drop Off
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="returnType"
                    value="collection"
                    checked={returnType === "collection"}
                    onChange={(e) => setReturnType(e.target.value)}
                    className="mr-2 accent-[#1a56be] w-4 h-4"
                  />
                  Collection
                </label>
              </div>
            </div>

            {returnType === "collection" ? (
              <div className="space-y-6">
                <div className="flex gap-4 items-center text-sm">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="returnLoc"
                      value="same"
                      checked={returnLocation === "same"}
                      onChange={(e) => setReturnLocation(e.target.value)}
                      className="mr-2 accent-[#1a56be] w-4 h-4"
                    />
                    Same as Delivery
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="returnLoc"
                      value="specify"
                      checked={returnLocation === "specify"}
                      onChange={(e) => setReturnLocation(e.target.value)}
                      className="mr-2 accent-[#1a56be] w-4 h-4"
                    />
                    Specify Location
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    field={{
                      label: "Collection Date",
                      type: "date",
                      val: "2026-03-15",
                      name: "collection_date",
                      required: true,
                      icon: <Calendar size={18} />,
                    }}
                  />
                  <InputField
                    field={{
                      label: "Collection Time",
                      type: "time",
                      name: "collection_time",
                      val: "08:00 AM",
                      required: true,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className=" rounded-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <InputField
                    field={{
                      label: "Drop Off City",
                      type: "select",
                      required: false,
                    }}
                  />
                  <InputField
                    field={{
                      label: "Drop Off Location",
                      type: "select",
                      required: false,
                    }}
                  />
                  <InputField
                    field={{
                      label: "Drop Off Date",
                      type: "date",
                      val: "2026-03-15",
                      required: false,
                      icon: <Calendar size={16} />,
                    }}
                  />
                  <InputField
                    field={{
                      label: "Drop Off Time",
                      type: "time",
                      val: "08:00 AM",
                      required: false,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[14px] text-gray-600 font-medium leading-relaxed">
          *Additional charges for delivery and collection may apply.
        </p>

        <button
          type="submit"
          className="bg-[#1e56a0] text-white px-10 py-3 font-bold tracking-wider hover:bg-[#16427d] transition-all rounded-sm shadow-md active:scale-95 whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </div>
  );
}
