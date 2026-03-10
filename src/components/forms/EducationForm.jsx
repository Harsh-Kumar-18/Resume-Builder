import React, { useContext, useState } from "react";
import { globalData } from "../../context/GlobalContext";
import toast from "react-hot-toast";

const EducationForm = ({ onNext }) => {
  const { resumeData, setResumeData } = useContext(globalData);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    for (let edu of resumeData.education) {
      if (!edu.institution?.trim()) { toast.error("Institution name is required"); return; }
      if (!edu.degree?.trim()) { toast.error("Degree is required"); return; }
      if (!edu.field?.trim()) { toast.error("Field of study is required"); return; }
      if (!edu.startYear?.trim()) { toast.error("Start year is required"); return; }
      if (!edu.endYear?.trim()) { toast.error("End year is required"); return; }
      if (Number(edu.startYear) > Number(edu.endYear)) { toast.error("Start year cannot be greater than End year"); return; }
    }
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    setIsSaved(true);
    toast.success("Education Saved ✅");
  };

  const handleChange = (id, field, value) => {
    const updatedEducation = resumeData.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, {
        id: Date.now(), institution: "", degree: "",
        field: "", startYear: "", endYear: "", description: "",
      }],
    });
  };

  const removeEducation = (id) => {
    setResumeData({ ...resumeData, education: resumeData.education.filter((edu) => edu.id !== id) });
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl p-8 mt-10 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
      </div>

      {resumeData.education.map((edu, index) => (
        <div key={edu.id} className="relative border border-gray-200 rounded-2xl p-6 mb-8 transition-all duration-300">
          <p className="text-gray-500 mb-4">Education #{index + 1}</p>

          <input type="text" placeholder="Institution Name" value={edu.institution}
            onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
            className="w-full px-5 py-3 mb-5 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />

          <div className="grid md:grid-cols-2 gap-6 mb-5">
            <input type="text" placeholder="Degree" value={edu.degree}
              onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
            <input type="text" placeholder="Field of Study" value={edu.field}
              onChange={(e) => handleChange(edu.id, "field", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-5">
            <input type="text" placeholder="Start Year" value={edu.startYear}
              onChange={(e) => handleChange(edu.id, "startYear", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
            <input type="text" placeholder="End Year" value={edu.endYear}
              onChange={(e) => handleChange(edu.id, "endYear", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
          </div>

          <textarea rows={3} placeholder="Description (Optional)" value={edu.description}
            onChange={(e) => handleChange(edu.id, "description", e.target.value)}
            className="w-full px-5 py-3 mb-2 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400 resize-none" />

          {resumeData.education.length > 1 && (
            <div className="text-right mt-4">
              <button onClick={() => removeEducation(edu.id)} className="text-red-500 font-medium text-sm hover:text-red-600 transition">
                Remove
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center">
        <button onClick={addEducation}
          className="px-8 py-2 rounded-2xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
          + Add Education
        </button>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200" onClick={handleSave}>
          Save
        </button>
        {isSaved && (
          <button className="px-6 py-2 cursor-pointer rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default EducationForm;