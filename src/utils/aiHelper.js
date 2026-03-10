const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const callAI = async (prompt) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

export const generateSummary = async (resumeData) => {
  const { personal, skills, experience, education } = resumeData;
  const name = `${personal.firstName} ${personal.lastName}`;
  const skillList = skills.filter(s => s.name).map(s => s.name).join(", ");
  const expList = experience.filter(e => e.role).map(e => `${e.role} at ${e.company}`).join(", ");
  const eduList = education.filter(e => e.degree).map(e => `${e.degree} in ${e.field} from ${e.institution}`).join(", ");

  return await callAI(`Write a short 2-3 sentence professional resume summary for ${name}.
Skills: ${skillList || "not specified"}
Experience: ${expList || "fresher"}
Education: ${eduList || "not specified"}
Return ONLY the summary text, no labels or extra text.`);
};

export const enhanceDescription = async (role, company, roughDescription) => {
  return await callAI(`Rewrite this job description for a ${role} at ${company} into a professional resume bullet point (2-3 sentences max):
"${roughDescription}"
Return ONLY the improved description, no labels or extra text.`);
};

export const suggestSkills = async (resumeData) => {
  const { experience, education } = resumeData;
  const roles = experience.filter(e => e.role).map(e => e.role).join(", ");
  const fields = education.filter(e => e.field).map(e => e.field).join(", ");

  const result = await callAI(`Suggest 6-8 relevant technical and soft skills for someone with these roles: ${roles || "software developer"} and education in: ${fields || "computer science"}.
Return ONLY a comma-separated list of skill names, nothing else.`);
  
  return result.split(",").map(s => s.trim()).filter(Boolean);
};

export const generateProjectDescription = async (title, tech) => {
  return await callAI(`Write a professional 2-sentence project description for a resume for a project called "${title}" built with ${tech}.
Return ONLY the description text, no labels or extra text.`);
};