import { useState } from "react";
import "./App.css";
import logo from "./assets/welcome.gif";

import FileUploader from "./components/FileUploader";
import ContactCard from "./components/ContactCard";
import type { ExtractResponse } from "./model/ExtractResponse";

function App() {
  const [personList, setPersonList] = useState<
    ExtractResponse["extractedPersons"]
  >([]);

  return (
    <>
      <div className="app-container">
        <head>
          <title>NE 9000™</title>
        </head>
        <div className="app-header">
          <img src={logo} alt="Logo" />
          <h2>NavnelisteExtractor 9000™</h2>
          <div className="file-uploader-container">
            <FileUploader setPersonList={setPersonList} />
          </div>
        </div>
      </div>
      <div className="contact-cards-container">
        {personList.map((person, index) => (
          <ContactCard
            key={index}
            ssn={person.ssn}
            firstName={person.firstName}
            lastName={person.lastName}
            index={index}
          />
        ))}
      </div>
    </>
  );
}

export default App;
