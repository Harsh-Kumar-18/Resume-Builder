import React, { useContext, useState } from "react";
import { globalData } from "../../context/GlobalContext";
import { toast } from "react-hot-toast";

const PersonalForm = ({ onNext }) => {
  const { resumeData, setResumeData } = useContext(globalData);
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {

    if (!resumeData.personal.firstName || !resumeData.personal.lastName || !resumeData.personal.email || !resumeData.personal.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if(!resumeData.personal.github || !resumeData.personal.linkedin){
        toast.error("Please provide at least LinkedIn or GitHub profile");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(resumeData.personal.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(resumeData.personal.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    setIsSaved(true);
      toast.success("Personal Info Saved");
  };

  const handleChange = (e) => {
    setResumeData({
      ...resumeData, personal: {
        ...resumeData.personal,
        [e.target.name]: e.target.value,
      },
    })
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Info</h2>

      {/* Name Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <input
          type="text"          
          placeholder="First Name"
          name="firstName"
          value={resumeData.personal.firstName}
          onChange={handleChange}
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
        />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={resumeData.personal.lastName}
          onChange={handleChange}
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
        />
      </div>

      {/* Contact Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={resumeData.personal.email}
          onChange={handleChange}
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={resumeData.personal.phone}
          onChange={handleChange}
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
        />
      </div>

      {/* Social Links */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <input
          type="url"
          name="linkedin"
          value={resumeData.personal.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn Profile URL"
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
        />
        <input
          type="url"
          name="github"
          value={resumeData.personal.github}
          onChange={handleChange}
          placeholder="GitHub Profile URL"
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
      shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 
      focus:ring-blue-100 outline-none transition-all duration-300 
      placeholder:text-gray-400"
        />
      </div>

      {/* Location */}
      <div>
        <input
          type="text"
          name="location"
          value={resumeData.personal.location}
          onChange={handleChange}
          placeholder="City, State / Country"
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 placeholder:text-gray-400"
        />
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button
          className="px-6 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
          onClick={handleSave}
        >
          Save
        </button>

        {isSaved && (
          <button
            className="px-6 py-2 cursor-pointer rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalForm;
