import React, { useContext, useState } from "react";
import { globalData } from "../../context/GlobalContext";
import { generateProjectDescription } from "../../utils/aiHelper";
import { Sparkles, Loader } from "lucide-react";
import { toast } from "react-hot-toast";

const ProjectsForm = ({ onNext }) => {
  const { resumeData, setResumeData } = useContext(globalData);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const isValidURL = (url) => {
    try { new URL(url); return true; } catch { return false; }
  };

const handleSave = () => {
  if (resumeData.projects.length === 0) { toast.error("Please add at least one project"); return; }
  for (let project of resumeData.projects) {
    if (!project.title?.trim()) { toast.error("Project title is required"); return; }
    if (!project.tech?.trim()) { toast.error("Tech stack is required"); return; }
    if (!project.description?.trim()) { toast.error("Project description is required"); return; }
    if (project.liveLink && !isValidURL(project.liveLink)) { toast.error("Live project URL is invalid"); return; }
    if (project.githubLink && !isValidURL(project.githubLink)) { toast.error("GitHub URL is invalid"); return; }
  }
  localStorage.setItem("resumeData", JSON.stringify(resumeData));
  setIsSaved(true);
  toast.success("Projects Saved ✅");
};

  const handleChange = (id, field, value) => {
    const updatedProjects = resumeData.projects.map((project) =>
      project.id === id ? { ...project, [field]: value } : project
    );
    setResumeData({ ...resumeData, projects: updatedProjects });
  };

  const handleAIGenerate = async (project) => {
    if (!project.title?.trim() || !project.tech?.trim()) {
      toast.error("Please enter project title and tech stack for AI generation");
      return;
    }
    setLoadingId(project.id);
    try {
      const description = await generateProjectDescription(project.title, project.tech);
      handleChange(project.id, "description", description);
    } catch (err) {
      toast.error("AI failed to generate description. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, {
        id: Date.now(), title: "", tech: "", liveLink: "", githubLink: "", description: "",
      }],
    });
  };

  const removeProject = (id) => {
    setResumeData({ ...resumeData, projects: resumeData.projects.filter((project) => project.id !== id) });
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 mt-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
      </div>

      <div className="space-y-8">
        {resumeData.projects.map((project) => (
          <div key={project.id} className="bg-gray-50 border mb-8 border-gray-200 p-6 rounded-2xl space-y-5">

            <input type="text" placeholder="Project Title" value={project.title}
              onChange={(e) => handleChange(project.id, "title", e.target.value)}
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />

            <input type="text" placeholder="Tech Stack (e.g. React, Node, MongoDB)" value={project.tech}
              onChange={(e) => handleChange(project.id, "tech", e.target.value)}
              className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />

            <div className="grid md:grid-cols-2 gap-6">
              <input type="url" placeholder="Live Project URL" value={project.liveLink}
                onChange={(e) => handleChange(project.id, "liveLink", e.target.value)}
                className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
              <input type="url" placeholder="GitHub Repository URL" value={project.githubLink}
                onChange={(e) => handleChange(project.id, "githubLink", e.target.value)}
                className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400" />
            </div>

            {/* Description + AI Button */}
            <div>
              <textarea rows={4}
                placeholder="Describe what the project does, your role, and key achievements..."
                value={project.description}
                onChange={(e) => handleChange(project.id, "description", e.target.value)}
                className="w-full px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400 resize-none" />

              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleAIGenerate(project)}
                  disabled={loadingId === project.id}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loadingId === project.id ? (
                    <><Loader size={14} className="animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles size={14} /> ✨ AI Write Description</>
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button onClick={() => removeProject(project.id)} className="text-red-500 hover:text-red-600 text-sm cursor-pointer">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={addProject}
          className="px-8 py-2 rounded-2xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
          + Add Project
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

export default ProjectsForm;
