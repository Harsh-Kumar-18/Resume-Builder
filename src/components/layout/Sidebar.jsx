import React from "react";

const steps = [
  { label: "Personal Info", index: 0 },
  { label: "Education", index: 1 },
  { label: "Skills", index: 2 },
  { label: "Summary", index: 3 },
  { label: "Experience", index: 4 },
  { label: "Projects", index: 5 },
  { label: "Certificates", index: 6 },
];

const Sidebar = ({ step, setStep }) => {
  return (
    <div className="h-full bg-white text-gray-700 p-6">
      <h2 className="text-xl font-bold text-blue-500 mb-8">
        Resume Builder
      </h2>

      <ul className="space-y-2">
        {steps.map((item) => (
          <li
            key={item.index}
            onClick={() => setStep(item.index)}
            className={`px-4 py-3 rounded-lg cursor-pointer transition
              ${step === item.index
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "hover:bg-gray-100 hover:text-blue-500"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;