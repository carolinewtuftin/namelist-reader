import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/welcome.gif";
import clippy from "./assets/clippy.gif";

import FileUploader from "./components/FileUploader";
import ContactCard from "./components/ContactCard";
import type { ExtractResponse } from "./model/ExtractResponse";

function App() {
  const [personBatches, setPersonBatches] = useState<
    ExtractResponse["extractedPersons"][]
  >([]);
  const [marqueePosition, setMarqueePosition] = useState(0);

  // Marquee effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMarqueePosition((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="app-header">
        <img src={logo} alt="Logo" />
        <h2>NavnelisteExtractor 9000™</h2>
        <div className="file-uploader-container">
          <FileUploader setPersonBatches={setPersonBatches} />
        </div>
      </div>
      <div className="contact-cards-container">
        {personBatches.map((batch, batchIndex) =>
          batch.map((person, index) => (
            <ContactCard
              key={`${batchIndex}-${index}`}
              ssn={person.ssn}
              firstName={person.firstName}
              lastName={person.lastName}
              index={index}
              isNewest={
                batchIndex === personBatches.length - 1 &&
                index === batch.length - 1
              }
            />
          )),
        )}
      </div>

      <img
        src={clippy}
        alt="Clippy"
        className="clippy"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        }}
      />
      <div className="marquee-container">
        <div
          style={{ transform: `translateX(${marqueePosition}px)` }}
          className="marquee-text"
        >
          ★★★ LAGET AV CAROLINE, MACIEJ OG BENDIK ★★★ LAGET AV CAROLINE, MACIEJ
          OG BENDIK ★★★
        </div>
      </div>

      <div className="stars-background">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 3 + 2 + "px",
              height: Math.random() * 3 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 1}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
