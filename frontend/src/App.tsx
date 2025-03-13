import { useState } from "react";
import "./App.css";
import logo from "./assets/welcome.gif";

import FileUploader from "./components/FileUploader";
import ContactCard from "./components/ContactCard";
import type { ExtractResponse } from "./model/ExtractResponse";

function App() {
  const [personBatches, setPersonBatches] = useState<
    ExtractResponse["extractedPersons"][]
  >([]);

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
    </>
  );
}

export default App;
