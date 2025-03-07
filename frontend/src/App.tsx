import "./App.css";
import logo from "./assets/welcome.gif";

import FileUploader from "./components/FileUploader";

function App() {
  console.log("eeee");
  return (
    <>
      <head>
        <title>NE 9000™</title>
      </head>
      <img src={logo} alt="Logo" />;<h2>NavnelisteExtractor 9000™</h2>
      <FileUploader />
    </>
  );
}

export default App;
