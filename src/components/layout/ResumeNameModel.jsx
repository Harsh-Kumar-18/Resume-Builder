import React, { useState } from "react";

const ResumeNameModal = ({ onConfirm, onCancel }) => {
  const [name, setName] = useState("");

  const handleConfirm = () => {
    const finalName = name.trim() || "My Resume";
    onConfirm(finalName);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Save Resume</h2>
        <p className="text-gray-500 text-sm mb-6">
          Give your resume a name so you can find it easily later.
        </p>

        <input
          type="text"
          placeholder="e.g. Frontend Dev Resume, Google Application..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          autoFocus
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl
          shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4
          focus:ring-blue-100 outline-none transition-all duration-300
          placeholder:text-gray-400 mb-6"
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition cursor-pointer"
          >
            💾 Save Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeNameModal;
