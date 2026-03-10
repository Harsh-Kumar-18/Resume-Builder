import React, { createContext, useEffect, useState } from "react";

const emptyResume = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
  },
  education: [
    {
      id: Date.now(),
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  ],
  experience: [
    {
      id: Date.now()+1,
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  skills: [{ id: Date.now()+2, name: "", level: "Beginner" }],
  projects: [
    {
      id: Date.now()+3,
      title: "",
      tech: "",
      liveLink: "",
      githubLink: "",
      description: "",
    },
  ],
  certificates: [
    {
      id: Date.now()+4,
      title: "",
      organization: "",
      credentialId: "",
      url: "",
      image: null,
    },
  ],
  summary: "",
  template: "modern",
};

export const globalData = createContext();
const GlobalContext = ({ children }) => {
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [resumeData, setResumeData] = useState(emptyResume);

  const [editingId, setEditingId] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedResumes");
    if (saved) {
      setSavedResumes(JSON.parse(saved));
    }
  }, []);

  const saveResume = (resumeName = "My Resume") => {
    const existing = JSON.parse(localStorage.getItem("savedResumes") || "[]");
    let updated;
    if (editingId) {
      updated = existing.map((r) =>
        r.id === editingId
          ? { ...resumeData, id: editingId, resumeName }
          : r
      );
    } else {
      const newResume = { ...resumeData, id: Date.now(), resumeName };
      updated = [...existing, newResume];
    }
    localStorage.setItem("savedResumes", JSON.stringify(updated));
    setSavedResumes(updated);
    setEditingId(null);
    setResumeData(emptyResume);
  };

  const deleteResume = (id) => {
    const updated = savedResumes.filter((r) => r.id !== id);
    localStorage.setItem("savedResumes", JSON.stringify(updated));
    setSavedResumes(updated);
  };

  const editResume = (id) => {
    const resume = savedResumes.find((r) => r.id === id);
    if (resume) {
      setResumeData(resume);
      setEditingId(id);
      setStep(0);
    }
  };

  const [pendingDownload, setPendingDownload] = useState(false);

  return (
    <globalData.Provider
      value={{
        step,
        setStep,
        resumeData,
        setResumeData,
        isFinished,
        setIsFinished,
        saveResume,
        deleteResume,
        editResume,
        savedResumes,
        emptyResume,
        pendingDownload,
        setPendingDownload,
      }}
    >
      {children}
    </globalData.Provider>
  );
};

export default GlobalContext;
