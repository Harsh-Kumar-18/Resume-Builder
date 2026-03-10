import React, { useContext, useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ResumeLogo from "../../assets/ResumeLogo.png";
import { Link, useLocation } from "react-router-dom";
import { globalData } from "../../context/GlobalContext";
import html2pdf from "html2pdf.js";

const Navbar = () => {
  const { resumeData, setResumeData, pendingDownload, setPendingDownload } = useContext(globalData);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    element.style.transition = "none";
    element.style.transform = "none";
    element.style.marginBottom = "0";
    element.style.width = "794px";
    element.style.height = "1123px";
    element.style.overflow = "hidden";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const opt = {
          margin: 0,
          filename: `${resumeData.resumeName || "resume"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, width: 794, height: 1123, windowWidth: 794, windowHeight: 1123 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: "avoid-all" },
        };

        html2pdf()
          .set(opt)
          .from(element)
          .toPdf()
          .get("pdf")
          .then((pdf) => {
            const total = pdf.internal.getNumberOfPages();
            if (total > 1) {
              for (let i = total; i > 1; i--) pdf.deletePage(i);
            }
            pdf.save(`${resumeData.resumeName || "resume"}.pdf`);
          })
          .then(() => {
            element.style.transform = "";
            element.style.marginBottom = "";
            element.style.width = "";
            element.style.height = "";
          });
      });
    });
  };

  useEffect(() => {
    if (pendingDownload) {
      setPendingDownload(false);
      setTimeout(() => downloadPDF(), 600);
    }
  }, [pendingDownload]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Create", to: "/create" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={ResumeLogo} alt="logo" className="h-9 sm:h-10 cursor-pointer hover:scale-105 transition" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-600 text-sm">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <span className={`hover:text-blue-600 transition pb-0.5 ${location.pathname === link.to ? "text-blue-600 border-b-2 border-blue-600" : ""}`}>
                {link.label}
              </span>
            </Link>
          ))}

          {/* Template selector */}
          <div className="relative">
            <select
              value={resumeData.template}
              onChange={(e) => setResumeData({ ...resumeData, template: e.target.value })}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm transition cursor-pointer"
            >
              <option value="modern">🎨 Modern</option>
              <option value="classic">📋 Classic</option>
              <option value="minimal">✏️ Minimal</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-full hover:bg-blue-600 hover:text-white transition">
            Sign In
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
              <div className={`py-2 px-3 rounded-lg font-medium transition ${location.pathname === link.to ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
                {link.label}
              </div>
            </Link>
          ))}

          <div className="pt-1">
            <label className="text-xs text-gray-400 font-medium px-3">Template</label>
            <select
              value={resumeData.template}
              onChange={(e) => setResumeData({ ...resumeData, template: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="modern">🎨 Modern</option>
              <option value="classic">📋 Classic</option>
              <option value="minimal">✏️ Minimal</option>
            </select>
          </div>

          <button className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-600 hover:text-white transition">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
