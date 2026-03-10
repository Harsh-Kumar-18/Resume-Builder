import React, { useContext, useState } from "react";
import { globalData } from "../../context/GlobalContext";
import { suggestSkills } from "../../utils/aiHelper";
import { Sparkles, Loader } from "lucide-react";
import { toast } from "react-hot-toast";

const SkillsForm = ({ onNext }) => {
  const { resumeData, setResumeData } = useContext(globalData);
  const [isSaved, setIsSaved] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const handleSave = () => {
    if (resumeData.skills.length === 0) { alert("Add at least one skill"); return; }
    const hasEmptySkill = resumeData.skills.some((skill) => skill.name.trim() === "");
    if (hasEmptySkill) { alert("All skills must have a name"); return; }
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    setIsSaved(true);
    toast.success("Skills Saved");
  };

  const handleChange = (id, field, value) => {
    const updatedSkill = resumeData.skills.map((skill) =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    setResumeData({ ...resumeData, skills: updatedSkill });
  };

  const addSkill = (name = "") => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { id: Date.now(), name, level: "Beginner" }],
    });
  };

  const removeSkill = (id) => {
    setResumeData({ ...resumeData, skills: resumeData.skills.filter((skill) => skill.id !== id) });
  };

  const handleAISuggest = async () => {
    setAiLoading(true);
    setSuggestedSkills([]);
    try {
      const suggestions = await suggestSkills(resumeData);
      // Filter out skills already added
      const existing = resumeData.skills.map(s => s.name.toLowerCase());
      const filtered = suggestions.filter(s => !existing.includes(s.toLowerCase()));
      setSuggestedSkills(filtered);
    } catch (err) {
      toast.error("AI failed to suggest skills. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const addSuggestedSkill = (skillName) => {
    addSkill(skillName);
    setSuggestedSkills(prev => prev.filter(s => s !== skillName));
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 mt-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={handleAISuggest}
          disabled={aiLoading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {aiLoading ? (
            <><Loader size={14} className="animate-spin" /> Suggesting...</>
          ) : (
            <><Sparkles size={14} /> ✨ AI Suggest</>
          )}
        </button>
      </div>

      {/* AI Suggested Skills */}
      {suggestedSkills.length > 0 && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-2xl">
          <p className="text-sm text-purple-700 font-medium mb-3">✨ AI Suggested Skills — click to add:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill, i) => (
              <button
                key={i}
                onClick={() => addSuggestedSkill(skill)}
                className="px-3 py-1 bg-white border border-purple-300 text-purple-700 text-sm rounded-full hover:bg-purple-100 transition cursor-pointer"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {resumeData.skills.map((skill) => (
          <div key={skill.id} className="grid md:grid-cols-2 gap-4 items-center p-5 mb-8 rounded-2xl border border-gray-200">
            <input type="text" placeholder="Skill Name (e.g. React, Communication)"
              value={skill.name}
              onChange={(e) => handleChange(skill.id, "name", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />

            <select value={skill.level}
              onChange={(e) => handleChange(skill.id, "level", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>

            <div className="col-span-3 text-right">
              <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-600 text-sm cursor-pointer">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={() => addSkill()}
          className="px-8 py-2 rounded-2xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
          + Add Skill
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

export default SkillsForm;
