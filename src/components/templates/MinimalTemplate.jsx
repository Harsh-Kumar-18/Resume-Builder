import React, { useContext } from "react";
import { globalData } from "../../context/GlobalContext";
import { Mail, Phone, MapPin, Linkedin, Github, GraduationCap, Briefcase, FolderGit2, Award, Wrench, NotebookText } from "lucide-react";

const MinimalTemplate = () => {
  const { resumeData } = useContext(globalData);
  const { personal, summary, education, experience, skills, projects, certificates } = resumeData;

  // Filter out empty entries
  const filledEducation = education.filter(e => e.institution?.trim() || e.degree?.trim());
  const filledExperience = experience.filter(e => e.company?.trim() || e.role?.trim());
  const filledSkills = skills.filter(s => s.name?.trim());
  const filledProjects = projects.filter(p => p.title?.trim());
  const filledCertificates = certificates.filter(c => c.title?.trim());

  return (
    <div className="max-w-3xl mx-auto h-full bg-white p-8 md:p-10 text-gray-800">

      {/* HEADER */}
      {(personal.firstName || personal.lastName) && (
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide">
            {personal.firstName} {personal.lastName}
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600 break-all">
            {personal.email && <span className="flex items-center gap-1"><Mail size={14} /> {personal.email}</span>}
            {personal.phone && <span className="flex items-center gap-1"><Phone size={14} /> {personal.phone}</span>}
            {personal.location && <span className="flex items-center gap-1"><MapPin size={14} /> {personal.location}</span>}
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                <Linkedin size={14} /> LinkedIn
              </a>
            )}
            {personal.github && (
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                <Github size={14} /> GitHub
              </a>
            )}
          </div>
        </header>
      )}

      {/* SUMMARY */}
      {summary?.trim() && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold border-b pb-1 mb-2">
            <NotebookText size={18} /> Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {filledExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold border-b pb-1 mb-3">
            <Briefcase size={18} /> Experience
          </h2>
          {filledExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="font-semibold">{exp.role}</h3>
              <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
              <p className="text-xs text-gray-500 mb-1">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {filledProjects.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold border-b pb-1 mb-3">
            <FolderGit2 size={18} /> Projects
          </h2>
          {filledProjects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-xs text-gray-500">{project.tech}</p>
              <p className="text-sm text-gray-700">{project.description}</p>
              <div className="text-xs text-blue-600 space-x-3 mt-1">
                {project.liveLink && <a href={project.liveLink} target="_blank">Live</a>}
                {project.githubLink && <a href={project.githubLink} target="_blank">GitHub</a>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {filledEducation.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold border-b pb-1 mb-3">
            <GraduationCap size={18} /> Education
          </h2>
          {filledEducation.map((edu) => (
            <div key={edu.id} className="mb-3">
              <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.startYear} - {edu.endYear}</p>
              {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {filledSkills.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold border-b pb-1 mb-3">
            <Wrench size={18} /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {filledSkills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-gray-100 rounded text-xs">{skill.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATES */}
      {filledCertificates.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold border-b pb-1 mb-3">
            <Award size={18} /> Certifications
          </h2>
          {filledCertificates.map((cert) => (
            <div key={cert.id} className="mb-2 text-sm">
              <p className="font-medium">{cert.title}</p>
              <p className="text-gray-600">{cert.organization}</p>
              {cert.url && <a href={cert.url} target="_blank" className="text-blue-600 text-xs">View Certificate</a>}
            </div>
          ))}
        </section>
      )}

    </div>
  );
};

export default MinimalTemplate;