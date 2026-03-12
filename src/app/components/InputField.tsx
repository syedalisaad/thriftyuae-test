import React from "react";
import { Field } from "../lib/types/booking";
import TimePicker from "./TimePicker";

interface Props {
  field: Field;
}

export const InputField: React.FC<Props> = ({ field }) => {
  const fieldName = field.label.replace(/\s+/g, "_").toLowerCase();

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-700">
        {field.label}
      </label>

      <div className="relative">
        {field.type === "select" ? (
          <select
            name={fieldName}
            defaultValue={field.val}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select</option>
          </select>

        ) : field.type === "time" ? (
          <TimePicker
            defaultValue={field.val}
            name={fieldName}
          />

        ) : (
          <>
            <input
              name={fieldName}
              type={field.type}
              defaultValue={field.val}
              className="w-full p-2 border border-gray-300 rounded text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {field.icon && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                {field.icon}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

