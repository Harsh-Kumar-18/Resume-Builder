import React, { useContext, useState } from "react";
import { globalData } from "../../context/GlobalContext";
import { toast } from "react-hot-toast";

const CertificatesForm = ({ onFinish }) => {
  const { resumeData, setResumeData } = useContext(globalData);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {

    if (resumeData.certificates.length === 0) {
      toast.error("Please add at least one certificate");
      return;
    }
  
    for (let cert of resumeData.certificates) {
  
      if (!cert.title?.trim()) {
        toast.error("Certificate name is required");
        return;
      }
  
      if (!cert.organization?.trim()) {
        toast.error("Issuing organization is required");
        return;
      }
  
      if (cert.url && !cert.url.startsWith("http")) {
        toast.error("Certificate URL must start with http or https");
        return;
      }
    }
  
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    setIsSaved(true);
    toast.success("Certificates Saved ✅");
  };

  const handleChange = (id, field, value) => {
    const updatedCertificates = resumeData.certificates.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
  
    setResumeData({
      ...resumeData,
      certificates: updatedCertificates,
    });
  };

  const handleImageUpload = (id, file) => {
    if (!file) return;
  
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG files are allowed");
      return;
    }
  
    const updatedCertificates = resumeData.certificates.map((cert) =>
      cert.id === id ? { ...cert, image: file } : cert
    );
  
    setResumeData({
      ...resumeData,
      certificates: updatedCertificates,
    });
  };

  const addCertificate = () => {
    setResumeData({
      ...resumeData,
      certificates: [
        ...resumeData.certificates,
        {
          id: Date.now(),
          title: "",
          organization: "",
          issueDate: "",
          expiryDate: "",
          credentialId: "",
          url: "",
          image: null,
        },
      ],
    });
  };

  const removeCertificate = (id) => {
    setResumeData({
      ...resumeData,
      certificates: resumeData.certificates.filter((cert) => cert.id !== id),
    });
  };
  const removeImage = (id) => {
    const updatedCertificate = resumeData.certificates.map((cert) =>
      cert.id === id ? { ...cert, image: null } : cert
    );
    setResumeData({
      ...resumeData,
      certificates: updatedCertificate,
    });
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl p-8 mt-8 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Certificates</h2>
      </div>

      <div className="space-y-8">
        {resumeData.certificates.map((cert) => (
          <div
            key={cert.id}
            className="border mb-8 border-gray-200 p-6 rounded-2xl space-y-5"
          >
            {/* Certificate Name */}
            <input
              type="text"
              placeholder="Certificate Name"
              value={cert.title}
              onChange={(e) => handleChange(cert.id, "title", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
            />

            {/* Organization */}
            <input
              type="text"
              placeholder="Issuing Organization"
              value={cert.organization}
              onChange={(e) =>
                handleChange(cert.id, "organization", e.target.value)
              }
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
            />

            {/* Credential ID */}
            <input
              type="text"
              placeholder="Credential ID (Optional)"
              value={cert.credentialId}
              onChange={(e) =>
                handleChange(cert.id, "credentialId", e.target.value)
              }
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
            />

            {/* Certificate URL */}
            <input
              type="url"
              placeholder="Certificate URL"
              value={cert.url}
              onChange={(e) => handleChange(cert.id, "url", e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
            />

            {/* Certificate Image */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Upload Certificate (JPG / PNG)
              </label>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImageUpload(cert.id, e.target.files[0])}
                className="block w-full text-sm text-gray-500 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-xl file:border-0 
              file:text-sm file:font-semibold 
              file:bg-blue-50 file:text-blue-600 
              hover:file:bg-blue-100"
              />
            </div>

            {/* Preview */}
            {cert.image instanceof File && (
            <div className="mt-2">

              <img
                src={URL.createObjectURL(cert.image)}
                alt="certificate"
                className="w-40 border rounded"
              />

              <button
                onClick={() => removeImage(cert.id)}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
              >
                Remove Image
              </button>

            </div>
          )}

            {/* Remove Button */}
            <div className="text-right">
              <button
                onClick={() => removeCertificate(cert.id)}
                className="text-red-500 hover:text-red-600 text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={addCertificate}
          className="px-8 py-2 rounded-2xl bg-blue-600 text-white 
          font-semibold shadow-md hover:bg-blue-700 
          hover:shadow-lg transition-all duration-300"
        >
          + Add Certificate
        </button>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button
          className="px-6 py-2 cursor-pointer rounded-xl border border-gray-300 
    text-gray-700 font-medium 
    hover:bg-gray-100 transition-all duration-200"
          onClick={handleSave}
        >
          Save
        </button>
        {isSaved && (
          <button
            className="px-6 py-2 cursor-pointer rounded-xl bg-blue-600 
    text-white font-semibold 
    hover:bg-blue-700 shadow-md 
    hover:shadow-lg transition-all duration-200"
            onClick={onFinish}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificatesForm;
