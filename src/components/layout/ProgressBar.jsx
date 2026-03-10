import React, { useContext } from "react";
import { globalData } from "../../context/GlobalContext";

const steps = [
  { label: "Personal", icon: "👤" },
  { label: "Education", icon: "🎓" },
  { label: "Skills", icon: "🔧" },
  { label: "Summary", icon: "📝" },
  { label: "Experience", icon: "💼" },
  { label: "Projects", icon: "🗂️" },
  { label: "Certificates", icon: "🏆" },
];

const ProgressBar = () => {
  const { step, setStep } = useContext(globalData);

  return (
    <div className="w-full px-6 py-4 bg-white border-b border-gray-100">
      {/* Step indicators */}
      <div className="flex items-center justify-between relative">

        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />

        {/* Progress line */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-blue-500 z-0 transition-all duration-500"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((s, index) => (
          <div
            key={index}
            className="flex flex-col items-center z-10 cursor-pointer"
            onClick={() => setStep(index)}
          >
            {/* Circle */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300
              ${index < step
                ? "bg-blue-500 border-blue-500 text-white"           // completed
                : index === step
                ? "bg-white border-blue-500 text-blue-600 shadow-md" // active
                : "bg-white border-gray-300 text-gray-400"            // upcoming
              }`}
            >
              {index < step ? "✓" : s.icon}
            </div>

            {/* Label */}
            <span className={`mt-1 text-xs font-medium hidden sm:block transition-all duration-300
              ${index === step ? "text-blue-600" : index < step ? "text-blue-400" : "text-gray-400"}`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;