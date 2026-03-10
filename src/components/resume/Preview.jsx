import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import { useContext, useRef, useEffect, useState } from "react";
import { globalData } from "../../context/GlobalContext";

const Preview = () => {
  const { resumeData } = useContext(globalData);
  const resumeRef = useRef();
  const containerRef = useRef();
  const [scale, setScale] = useState(0.6);

  // Dynamically calculate scale based on container width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = containerWidth / 794;
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const renderTemplate = () => {
    switch (resumeData.template) {
      case "classic": return <ClassicTemplate />;
      case "minimal": return <MinimalTemplate />;
      default: return <ModernTemplate />;
    }
  };

  const scaledHeight = 1123 * scale;

  return (
    // Outer container — measures available width
    <div ref={containerRef} style={{ width: "100%", height: `${scaledHeight}px`, overflow: "hidden" }}>
      {/* Inner resume — fixed A4 size, scaled down to fit */}
      <div
        id="resume-preview"
        ref={resumeRef}
        style={{
          backgroundColor: "#ffffff",
          width: "794px",
          height: "1123px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Preview;