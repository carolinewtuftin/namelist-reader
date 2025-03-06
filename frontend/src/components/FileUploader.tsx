import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      console.log(file);
      try {
        return await fetch("http://localhost:8080/extract", {
          method: "POST",
          body: file,
        }).then(async (res) => {
          const response = await res.json();
          console.log({ response });
        });
      } catch (error) {
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
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload
        </button>
      )}
    </>
  );
};

export default FileUploader;
