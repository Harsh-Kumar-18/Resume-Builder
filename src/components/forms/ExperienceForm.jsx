import React, { useContext, useState } from "react";
import { globalData } from "../../context/GlobalContext";
import { enhanceDescription } from "../../utils/aiHelper";
import { Sparkles, Loader } from "lucide-react";
import { toast } from "react-hot-toast";

const ExperienceForm = ({ onNext }) => {
  const { resumeData, setResumeData } = useContext(globalData);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingId, setLoadingId] = useState(null); // track which exp is loading

  const handleSave = () => {
    if (resumeData.experience.length === 0) {
      toast.error("Please add at least one experience entry");
      return;
    }
    for (let exp of resumeData.experience) {
      if (!exp.company?.trim()) { toast.error("Company name is required"); return; }
      if (!exp.role?.trim()) { toast.error("Job title is required"); return; }
      if (!exp.startDate) { toast.error("Start date is required"); return; }
      if (!exp.current && !exp.endDate) { toast.error("End date is required if not currently working"); return; }
      if (!exp.current && exp.startDate > exp.endDate) { toast.error("Start date cannot be after End date"); return; }
    }
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    setIsSaved(true);
    toast.success("Experience Saved ✅");
  };

  const handleChange = (id, field, value) => {
    const updatedExperience = resumeData.experience.map((exp) => {
      if (exp.id === id) {
        if (field === "current" && value === true) return { ...exp, current: true, endDate: "Present" };
        if (field === "current" && value === false) return { ...exp, current: false, endDate: "" };
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const handleAIEnhance = async (exp) => {
    if (!exp.role?.trim() || !exp.company?.trim()) {
      toast.error("Please enter Job Title and Company Name for AI enhancement");
      return;
    }
    setLoadingId(exp.id);
    try {
      const enhanced = await enhanceDescription(exp.role, exp.company, exp.description || exp.role);
      handleChange(exp.id, "description", enhanced);
    } catch (err) {
      toast.error("AI failed to enhance description. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, {
        id: Date.now(), company: "", role: "", location: "",
        startDate: "", endDate: "", current: false, description: "",
      }],
    });
  };

  const removeExperience = (id) => {
    setResumeData({ ...resumeData, experience: resumeData.experience.filter((exp) => exp.id !== id) });
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 mt-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
      </div>

      <div className="space-y-8">
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="border border-gray-200 p-6 mb-8 rounded-2xl space-y-5">

            <input type="text" placeholder="Company Name" value={exp.company}
              onChange={(e) => handleChange(exp.id, "company", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />

            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Job Title" value={exp.role}
                onChange={(e) => handleChange(exp.id, "role", e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
              <input type="text" placeholder="Location" value={exp.location}
                onChange={(e) => handleChange(exp.id, "location", e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="absolute -top-2 left-4 bg-white px-1 text-xs text-gray-500">Start Month</label>
                <input type="month" value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300" />
              </div>
              <div className="relative">
                <label className="absolute -top-2 left-4 bg-white px-1 text-xs text-gray-500">End Month</label>
                <input type="month" disabled={exp.current} value={exp.current ? "" : exp.endDate}
                  onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={exp.current}
                onChange={(e) => handleChange(exp.id, "current", e.target.checked)} className="w-4 h-4" />
              <label className="text-sm text-gray-600">Currently Working Here</label>
            </div>

            {/* Description + AI Button */}
            <div className="relative">
              <textarea rows={4}
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description}
                onChange={(e) => handleChange(exp.id, "description", e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400 resize-none" />

              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleAIEnhance(exp)}
                  disabled={loadingId === exp.id}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loadingId === exp.id ? (
                    <><Loader size={14} className="animate-spin" /> Enhancing...</>
                  ) : (
                    <><Sparkles size={14} /> ✨ AI Enhance</>
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-600 text-sm cursor-pointer">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={addExperience}
          className="px-8 py-2 rounded-2xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
          + Add Experience
        </button>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200" onClick={handleSave}>Save</button>
        {isSaved && (
          <button className="px-6 py-2 cursor-pointer rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200" onClick={onNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
