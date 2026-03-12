import React from "react";
import { Field } from "../lib/types/booking";
import TimePicker from "./TimePicker";

interface Props {
  field: Field;
}

export const InputField: React.FC<Props> = ({ field }) => {
  const fieldName = field.name
    ? field.name
    : field.label.replace(/\s+/g, "_").toLowerCase();

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold capitalize text-gray-900">
        {field.label}
      </label>

      <div className="relative">
        {field.type === "select" ? (
          <div className="relative">
            <select
              name={fieldName}
              className="w-full p-2.5 h-[38px] border border-gray-300 rounded-md text-sm bg-white appearance-none pr-10 focus:outline-none transition-colors"
            >
              <option value="">Select</option>
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        ) : field.type === "time" ? (
          <TimePicker defaultValue={field.val} name={fieldName} />
        ) : (
          <div className="relative">
            <input
              name={fieldName}
              type={field.type}
              defaultValue={field.val}
              placeholder={field?.placeholder}
              className="w-full p-2 h-[38px] border border-gray-300 rounded text-sm pr-10 focus:outline-none  bg-white"
            />

            {field.icon && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                {field.icon}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
