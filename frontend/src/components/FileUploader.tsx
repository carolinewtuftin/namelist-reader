import React, { useState } from "react";
import hourglass from "../assets/hourglass.gif";
import { ExtractResponse } from "../model/ExtractResponse";

const FileUploader: React.FC<{
  setPersonList: React.Dispatch<
    React.SetStateAction<ExtractResponse["extractedPersons"]>
  >;
}> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      console.log(file);
      try {
        return await fetch("http://localhost:8080/extract", {
          method: "POST",
          body: file,
        }).then(async (res) => {
          const response = (await res.json()) as ExtractResponse;
          props.setPersonList(response.extractedPersons);
          console.log({ response });
          setIsUploading(false);
        });
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>

      {file && (
        <button onClick={handleUpload} className="submit">
          {isUploading ? (
            <img width="36" height="36" src={hourglass} alt="hourglass" />
          ) : (
            "Upload"
          )}
        </button>
      )}
    </>
  );
};

export default FileUploader;
