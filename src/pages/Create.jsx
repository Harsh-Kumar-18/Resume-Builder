import React, { useContext } from "react";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import { globalData } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FileText, Cpu, Layout } from "lucide-react";

const templateStyles = {
  modern: { bg: "from-blue-500 to-indigo-600", label: "Modern", icon: "🎨" },
  classic: { bg: "from-gray-700 to-gray-900", label: "Classic", icon: "📋" },
  minimal: { bg: "from-teal-400 to-cyan-600", label: "Minimal", icon: "✏️" },
};

const ResumeThumbnail = ({ resume }) => {
  const style = templateStyles[resume.template] || templateStyles.modern;
  const name = `${resume.personal?.firstName || ""} ${resume.personal?.lastName || ""}`.trim();
  const role = resume.experience?.find(e => e.role?.trim())?.role || "";
  const skillCount = resume.skills?.filter(s => s.name?.trim()).length || 0;
  const expCount = resume.experience?.filter(e => e.role?.trim()).length || 0;

  return (
    <div className={`w-full h-44 rounded-xl bg-gradient-to-br ${style.bg} p-4 flex flex-col justify-between relative overflow-hidden`}>
      {/* Background lines pattern */}
      <div className="absolute inset-0 opacity-10 pt-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-1.5 bg-white rounded-full mb-2 mx-3"
            style={{ width: `${50 + (i % 4) * 15}%` }} />
        ))}
      </div>

      <div className="relative z-10">
        <div className="text-white font-bold text-lg leading-tight truncate">
          {name || "Your Name"}
        </div>
        {role && <div className="text-white/80 text-xs mt-1 truncate">{role}</div>}
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {expCount > 0 && (
          <div className="bg-white/20 rounded-lg px-2 py-1 text-white text-xs flex items-center gap-1">
            <FileText size={10} /> {expCount} exp
          </div>
        )}
        {skillCount > 0 && (
          <div className="bg-white/20 rounded-lg px-2 py-1 text-white text-xs flex items-center gap-1">
            <Cpu size={10} /> {skillCount} skills
          </div>
        )}
        <div className="bg-white/20 rounded-lg px-2 py-1 text-white text-xs flex items-center gap-1 ml-auto">
          <Layout size={10} /> {style.icon} {style.label}
        </div>
      </div>
    </div>
  );
};

const Create = () => {
  const {
    savedResumes, deleteResume, editResume,
    setResumeData, setStep, emptyResume, setPendingDownload,
  } = useContext(globalData);
  const navigate = useNavigate();

  const handleCreateNew = () => {
    setResumeData(emptyResume);
    setStep(0);
    navigate("/builder");
  };

  const handleEdit = (id) => {
    editResume(id);
    navigate("/builder");
  };

  const handleDownload = (resume) => {
    editResume(resume.id);
    setPendingDownload(true);
    navigate("/builder");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteResume(id);
      toast.success("Resume deleted");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      <div className="flex-1 flex flex-col px-4 sm:px-6 md:px-10 py-8 w-full max-w-7xl mx-auto">

        <button
          onClick={handleCreateNew}
          className="w-full sm:w-auto self-start px-6 md:px-8 py-3 mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base md:text-lg font-semibold rounded-2xl cursor-pointer shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
        >
          + Create New Resume
        </button>

        <h2 className="text-xl font-semibold text-gray-600 mb-6">
          Your Saved Resumes
          {savedResumes.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400">({savedResumes.length})</span>
          )}
        </h2>

        {savedResumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-5">📄</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No resumes yet</h3>
            <p className="text-gray-400 text-sm mb-6">Create your first AI-powered resume in minutes.</p>
            <button onClick={handleCreateNew}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedResumes.map((resume) => (
              <div key={resume.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">

                <div className="p-4 pb-0">
                  <ResumeThumbnail resume={resume} />
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-800 truncate mb-1">
                    {resume.resumeName || "My Resume"}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {`${resume.personal?.firstName || ""} ${resume.personal?.lastName || ""}`.trim() || "—"}
                    {" · "}
                    <span className="capitalize">{resume.template || "modern"}</span>
                  </p>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(resume.id)}
                      className="flex-1 py-2 cursor-pointer text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                      Edit
                    </button>
                    <button onClick={() => handleDownload(resume)}
                      className="flex-1 py-2 cursor-pointer text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition">
                      PDF
                    </button>
                    <button onClick={() => handleDelete(resume.id, resume.resumeName)}
                      className="flex-1 py-2 cursor-pointer text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-600 hover:text-white transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Create;
