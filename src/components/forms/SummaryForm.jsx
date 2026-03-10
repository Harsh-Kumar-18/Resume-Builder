import React, { useContext, useState } from "react";
import { globalData } from "../../context/GlobalContext";
import { generateSummary } from "../../utils/aiHelper";
import { Sparkles, Loader } from "lucide-react";
import { toast } from "react-hot-toast";

const SummaryForm = ({ onNext }) => {
  const { resumeData, setResumeData } = useContext(globalData);
  const maxLength = 300;
  const [isSaved, setIsSaved] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSave = () => {
    if (resumeData.summary.trim() === "") {
      toast.error("Summary cannot be empty");
      return;
    }
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    setIsSaved(true);
    toast.success("Summary Saved");
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, summary: e.target.value });
  };

  const handleAIGenerate = async () => {
    setAiLoading(true);
    try {
      const result = await generateSummary(resumeData);
      setResumeData({ ...resumeData, summary: result });
    } catch (err) {
      alert("AI failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Summary</h2>

      <div className="relative">
        <textarea
          value={resumeData.summary}
          onChange={handleChange}
          maxLength={maxLength}
          rows={6}
          placeholder="Write a short professional summary about yourself..."
          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 
          rounded-2xl shadow-sm resize-none
          focus:bg-white focus:border-blue-500 
          focus:ring-4 focus:ring-blue-100 
          outline-none transition-all duration-300
          placeholder:text-gray-400"
        />

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>{resumeData.summary.length} / {maxLength} characters</span>

          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={aiLoading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {aiLoading ? (
              <><Loader size={14} className="animate-spin" /> Generating...</>
            ) : (
              <><Sparkles size={14} /> ✨ AI Generate</>
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          className="px-6 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
          onClick={handleSave}
        >
          Save
        </button>
        {isSaved && (
          <button
            className="px-6 py-2 cursor-pointer rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SummaryForm;