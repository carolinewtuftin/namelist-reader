import { useState } from "react";
import "./App.css";
import logo from "./assets/welcome.gif";

import FileUploader from "./components/FileUploader";
import { ExtractResponse } from "./model/ExtractResponse";

function App() {
  const [personList, setPersonList] = useState<
    ExtractResponse["extractedPersons"]
  >([]);

  return (
    <>
      <head>
        <title>NE 9000™</title>
      </head>
      <img src={logo} alt="Logo" />;<h2>NavnelisteExtractor 9000™</h2>
      <FileUploader setPersonList={setPersonList} />
      {personList.map((person) => (
        <div>
          {person.ssn}: {person.firstName} {person.lastName}{" "}
        </div>
      ))}
    </>
  );
}

export default App;
