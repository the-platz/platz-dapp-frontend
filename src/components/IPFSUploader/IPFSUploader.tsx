import { useState } from "react";
import { FileUpload } from "./FileUpload";

const IPFSUploader = () => {
    const [fileUrl, setFileUrl] = useState("");

    return (
        <div>
          <FileUpload setUrl={setFileUrl} />
          FileUrl :{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </div>
      );
}

export default IPFSUploader;