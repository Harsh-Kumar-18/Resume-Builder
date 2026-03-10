import React from "react";
import Header from "../components/home/header";
import Footer from "../components/home/Footer";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "✨",
    title: "AI Writing",
    desc: "Auto-generate summaries, enhance job descriptions, and get smart skill suggestions powered by AI.",
  },
  {
    icon: "📄",
    title: "3 Templates",
    desc: "Choose from Modern, Classic, and Minimal resume templates designed to impress recruiters.",
  },
  {
    icon: "⚡",
    title: "Instant PDF",
    desc: "Download your resume as a perfectly formatted A4 PDF in one click — no extra tools needed.",
  },
  {
    icon: "💾",
    title: "Save & Edit",
    desc: "Save multiple resumes, come back anytime to edit and re-download with all your data intact.",
  },
];

const Home = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      {/* HERO SECTION */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-4xl">
          <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-6 border border-blue-100">
            🚀 AI-Powered Resume Builder
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Build Your{" "}
            <span className="text-blue-600">Dream Resume</span>
            <br />in Minutes
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes with intelligent AI
            assistance. Stand out from the crowd and get hired faster.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link to="/create">
              <button className="bg-blue-600 px-8 py-3 cursor-pointer text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                Get Started Free
              </button>
            </Link>
            <button
              onClick={scrollToFeatures}
              className="px-8 py-3 border border-gray-300 rounded-full text-lg font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer duration-300"
            >
              Learn More ↓
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: "3", label: "Templates" },
              { value: "AI", label: "Powered" },
              { value: "1-Click", label: "PDF Export" },
              { value: "Free", label: "To Use" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              All the tools to build a standout resume — powered by AI, designed for results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg mb-14">Three simple steps to your perfect resume.</p>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Fill Your Details", desc: "Enter your personal info, experience, skills and more using our guided form." },
              { step: "02", title: "Let AI Help", desc: "Use AI to generate summaries, enhance descriptions, and suggest skills." },
              { step: "03", title: "Download PDF", desc: "Pick a template, preview your resume, and download a polished PDF instantly." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            AI Resume Builder was created to make professional resume writing accessible to everyone.
            Whether you're a fresher or an experienced professional, our AI-powered tools help you
            craft a resume that stands out — in minutes, not hours. Built with ❤️ in India.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-500 text-lg mb-8">
            Have feedback or questions? Reach out anytime.
          </p>
          <a
            href="mailto:harsh108bhai@gmail.com"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
          >
            📧 Send a Message
          </a>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of job seekers who built their resume with AI.
          </p>
          <Link to="/create">
            <button className="px-10 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition shadow-lg hover:-translate-y-1 duration-300">
              Start for Free →
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
