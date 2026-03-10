import React, { useContext } from "react";
import { globalData } from "../../context/GlobalContext";
import { Mail, Phone, MapPin, Linkedin, Github, GraduationCap, Briefcase, FolderGit2, Award, Wrench, NotebookText } from "lucide-react";

const ModernTemplate = () => {
  const { resumeData } = useContext(globalData);
  const { personal, summary, education, experience, skills, projects, certificates } = resumeData;

  // Filter out empty entries
  const filledEducation = education.filter(e => e.institution?.trim() || e.degree?.trim());
  const filledExperience = experience.filter(e => e.company?.trim() || e.role?.trim());
  const filledSkills = skills.filter(s => s.name?.trim());
  const filledProjects = projects.filter(p => p.title?.trim());
  const filledCertificates = certificates.filter(c => c.title?.trim());

  const hasPersonal = personal.firstName || personal.lastName;
  const hasContact = personal.email || personal.phone || personal.location;
  const hasLinks = personal.linkedin || personal.github;

  return (
    <div className="max-w-5xl h-full mx-auto bg-white shadow-xl p-8 text-gray-800">

      {/* HEADER */}
      {(hasPersonal || hasContact || hasLinks) && (
        <header className="border-b pb-6 mb-6">
          {hasPersonal && (
            <h1 className="text-4xl font-bold tracking-wide">
              {personal.firstName} {personal.lastName}
            </h1>
          )}

          {hasContact && (
            <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-4">
              {personal.email && <span className="flex items-center gap-2"><Mail size={16} /> {personal.email}</span>}
              {personal.phone && <span className="flex items-center gap-2"><Phone size={16} /> {personal.phone}</span>}
              {personal.location && <span className="flex items-center gap-2"><MapPin size={16} /> {personal.location}</span>}
            </div>
          )}

          {hasLinks && (
            <div className="flex gap-4 text-sm mt-2 text-blue-600 flex-wrap">
              {personal.linkedin && (
                <a href={personal.linkedin} target="_blank">
                  <span className="flex items-center gap-2"><Linkedin size={16} /> LinkedIn</span>
                </a>
              )}
              {personal.github && (
                <a href={personal.github} target="_blank">
                  <span className="flex items-center gap-2"><Github size={16} /> GitHub</span>
                </a>
              )}
            </div>
          )}
        </header>
      )}

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="md:col-span-1 space-y-6">

          {/* SKILLS */}
          {filledSkills.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold border-b mb-3">
                <Wrench size={18} /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {filledSkills.map((skill) => (
                  <span key={skill.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATES */}
          {filledCertificates.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold border-b mb-3">
                <Award size={18} /> Certificates
              </h2>
              {filledCertificates.map((cert) => (
                <div key={cert.id} className="mb-2 text-sm">
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-gray-600">{cert.organization}</p>
                  {cert.url && <a href={cert.url} className="text-blue-600 text-xs" target="_blank">View Certificate</a>}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-2 space-y-6">

          {/* SUMMARY */}
          {summary?.trim() && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold border-b mb-3">
                <NotebookText size={18} /> Summary
              </h2>
              <p className="text-sm leading-relaxed">{summary}</p>
            </section>
          )}

          {/* EXPERIENCE */}
          {filledExperience.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold border-b mb-3">
                <Briefcase size={18} /> Experience
              </h2>
              {filledExperience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between flex-wrap">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* EDUCATION */}
          {filledEducation.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold border-b mb-3">
                <GraduationCap size={18} /> Education
              </h2>
              {filledEducation.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                  {edu.description && <p className="text-sm">{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS */}
          {filledProjects.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-semibold border-b mb-3">
                <FolderGit2 size={18} /> Projects
              </h2>
              {filledProjects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-600">Tech: {project.tech}</p>
                  <p className="text-sm">{project.description}</p>
                  <div className="flex gap-4 text-blue-600 text-sm mt-1">
                    {project.liveLink && <a href={project.liveLink} target="_blank">Live</a>}
                    {project.githubLink && <a href={project.githubLink} target="_blank">GitHub</a>}
                  </div>
                </div>
              ))}
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;