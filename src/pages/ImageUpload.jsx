import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [image, setImage] = useState(""); // Define image state variable

  function convertToBase64(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.error("Error:", error);
    };
  }

  function uploadImage() {
    axios.post("http://localhost:3000/api/auth/upload-image", {
        base64: image
    }, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    
  }
  

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        Let us upload Image
        <input
          accepts="image/*"
          type="file"
          onChange={convertToBase64}
        />
        {image === "" || image == null ? "" : <img width={100} height={100} src={image} />}
        <button onClick={uploadImage}>Upload</button>
      </div>
    </div>
  );
}

export default ImageUpload;
