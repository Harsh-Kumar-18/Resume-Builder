import React, { useContext, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ProgressBar from "../components/layout/ProgressBar";
import PersonalForm from "../components/forms/PersonalForm";
import EducationForm from "../components/forms/EducationForm";
import SkillsForm from "../components/forms/SkillsForm";
import SummaryForm from "../components/forms/SummaryForm";
import ExperieceForm from "../components/forms/ExperienceForm";
import ProjectForm from "../components/forms/ProjectsForm";
import CertificateForm from "../components/forms/CertificateForm";
import { globalData } from "../context/GlobalContext";
import Preview from "../components/resume/Preview";
import ResumeNameModal from "../components/layout/ResumeNameModel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Builder = () => {
  const { step, setStep, setIsFinished, saveResume, resumeData } = useContext(globalData);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleFinishClick = () => {
    const { personal, education, skills, summary, experience, projects, certificates } = resumeData;
  
    // Personal
    if (!personal.firstName?.trim() || !personal.lastName?.trim()) {
      toast.error("Please fill in Personal Info first"); setStep(0); return;
    }
    if (!personal.email?.trim() || !personal.phone?.trim()) {
      toast.error("Please fill in Personal Info first"); setStep(0); return;
    }
  
    // Education
    const validEdu = education.filter(e => e.institution?.trim() && e.degree?.trim());
    if (validEdu.length === 0) {
      toast.error("Please fill in Education first"); setStep(1); return;
    }
  
    // Skills
    const validSkills = skills.filter(s => s.name?.trim());
    if (validSkills.length === 0) {
      toast.error("Please add at least one Skill"); setStep(2); return;
    }
  
    // Summary
    if (!summary?.trim()) {
      toast.error("Please fill in Summary first"); setStep(3); return;
    }
  
    // Experience
    const validExp = experience.filter(e => e.company?.trim() && e.role?.trim());
    if (validExp.length === 0) {
      toast.error("Please fill in Experience first"); setStep(4); return;
    }
  
    // Projects
    const validProjects = projects.filter(p => p.title?.trim());
    if (validProjects.length === 0) {
      toast.error("Please fill in at least one Project"); setStep(5); return;
    }
  
    // Certificates
    const validCerts = certificates.filter(c => c.title?.trim());
    if (validCerts.length === 0) {
      toast.error("Please fill in at least one Certificate"); setStep(6); return;
    }
  
    // All good — show modal
    setShowModal(true);
  };

  const handleModalConfirm = (resumeName) => {
    saveResume(resumeName);
    setIsFinished(true);
    setShowModal(false);
    toast.success(`"${resumeName}" saved 🎉`);
    setStep(0);
    navigate("/create");
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <ProgressBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — hidden on mobile */}
        <div className="hidden md:block w-56 lg:w-64 shrink-0">
          <Sidebar step={step} setStep={setStep} />
        </div>

        <div className="flex-1 flex flex-col md:flex-row p-3 md:p-6 gap-4 md:gap-6 overflow-hidden">
          {/* Form Panel */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-4 md:p-6 overflow-y-auto">
            <h2 className="text-lg md:text-xl font-semibold text-center mb-4">Resume Form</h2>
            {step === 0 && <PersonalForm onNext={() => setStep(p => p + 1)} />}
            {step === 1 && <EducationForm onNext={() => setStep(p => p + 1)} />}
            {step === 2 && <SkillsForm onNext={() => setStep(p => p + 1)} />}
            {step === 3 && <SummaryForm onNext={() => setStep(p => p + 1)} />}
            {step === 4 && <ExperieceForm onNext={() => setStep(p => p + 1)} />}
            {step === 5 && <ProjectForm onNext={() => setStep(p => p + 1)} />}
            {step === 6 && <CertificateForm onFinish={handleFinishClick} />}
          </div>

          {/* Preview Panel — hidden on small screens */}
          <div className="hidden lg:flex flex-1 bg-white rounded-2xl shadow-sm p-4 md:p-6 overflow-y-auto flex-col">
            <h2 className="text-lg md:text-xl font-semibold text-center mb-4">Resume Preview</h2>
            <Preview />
          </div>
        </div>
      </div>

      {showModal && (
        <ResumeNameModal
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </div>
  );
};

export default Builder;
