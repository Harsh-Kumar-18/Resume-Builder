import React, { useContext } from "react";
import { globalData } from "../../context/GlobalContext";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Wrench,
  NotebookText,
} from "lucide-react";

const ClassicTemplate = () => {
  const { resumeData } = useContext(globalData);
  const { personal, summary, education, experience, skills, projects, certificates } = resumeData;

  // Filter out empty entries
  const filledEducation = education.filter(e => e.institution?.trim() || e.degree?.trim());
  const filledExperience = experience.filter(e => e.company?.trim() || e.role?.trim());
  const filledSkills = skills.filter(s => s.name?.trim());
  const filledProjects = projects.filter(p => p.title?.trim());
  const filledCertificates = certificates.filter(c => c.title?.trim());

  return (
    <div className="max-w-5xl h-full mx-auto bg-white shadow-xl grid md:grid-cols-3">
      {/* LEFT SIDEBAR */}
      <div className="bg-gray-900 text-white p-6 space-y-6">

        {/* NAME */}
        {(personal.firstName || personal.lastName) && (
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              {personal.firstName} {personal.lastName}
            </h1>
          </div>
        )}

        {/* CONTACT */}
        {(personal.email || personal.phone || personal.location || personal.linkedin || personal.github) && (
          <div className="space-y-2 text-sm break-all">
            {personal.email && <p className="flex items-center gap-2"><Mail size={14} /> {personal.email}</p>}
            {personal.phone && <p className="flex items-center gap-2"><Phone size={14} /> {personal.phone}</p>}
            {personal.location && <p className="flex items-center gap-2"><MapPin size={14} /> {personal.location}</p>}
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-300 hover:text-blue-400">
                <Linkedin size={14} /> {personal.linkedin}
              </a>
            )}
            {personal.github && (
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-300 hover:text-blue-400">
                <Github size={14} /> {personal.github}
              </a>
            )}
          </div>
        )}

        {/* SKILLS */}
        {filledSkills.length > 0 && (
          <div>
            <h2 className="font-semibold border-b border-gray-600 pb-1 mb-2 flex items-center gap-2">
              <Wrench size={16} /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {filledSkills.map((skill) => (
                <span key={skill.id} className="bg-gray-700 px-2 py-1 rounded text-xs">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {filledEducation.length > 0 && (
          <div>
            <h2 className="font-semibold border-b border-gray-600 pb-1 mb-2 flex items-center gap-2">
              <GraduationCap size={18} /> Education
            </h2>
            {filledEducation.map((edu) => (
              <div key={edu.id} className="text-sm mb-3">
                <p className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="text-gray-400 text-xs">{edu.startYear} - {edu.endYear}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT MAIN SECTION */}
      <div className="p-8 col-span-2 space-y-6">

        {/* SUMMARY */}
        {summary?.trim() && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-3 flex items-center gap-2">
              <NotebookText size={18} /> Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {filledExperience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-3 flex items-center gap-2">
              <Briefcase size={18} /> Experience
            </h2>
            {filledExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-semibold text-lg">{exp.role}</h3>
                <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-sm text-gray-500 mb-1">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* PROJECTS */}
        {filledProjects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-3 flex items-center gap-2">
              <FolderGit2 size={18} /> Projects
            </h2>
            {filledProjects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.tech}</p>
                <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                <div className="text-xs text-blue-600 space-x-2">
                  {project.liveLink && <a href={project.liveLink} target="_blank">Live</a>}
                  {project.githubLink && <a href={project.githubLink} target="_blank">GitHub</a>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* CERTIFICATES */}
        {filledCertificates.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b pb-1 mb-3 flex items-center gap-2">
              <Award size={18} /> Certificates
            </h2>
            {filledCertificates.map((cert) => (
              <div key={cert.id} className="mb-4">
                <h3 className="font-semibold text-gray-800">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.organization}</p>
                {cert.credentialId && <p className="text-xs text-gray-500">Credential ID: {cert.credentialId}</p>}
                {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View Certificate</a>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
