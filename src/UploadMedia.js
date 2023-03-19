import React, { useState } from "react";
import axios from "axios";

function UploadMedia(props) {
  const ACCESS_TOKEN =props.ACCESS_TOKEN;
  const  USER_ID = props.USER_ID;
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");
  const [Asset, setAsset] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'x-li-format': 'json'
  };
  const headers2 = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/octet-stream',
    'x-li-format': 'json'
  };
  const data1 ={
    "registerUploadRequest": {
        "recipes": [
            "urn:li:digitalmediaRecipe:feedshare-image"
        ],
        "owner": `urn:li:person:${USER_ID}`,
        "serviceRelationships": [
            {
                "relationshipType": "OWNER",
                "identifier": "urn:li:userGeneratedContent"
            }
        ]
    }
}

const data2 ={
  "author": `urn:li:person:${USER_ID}`,
  "lifecycleState": "PUBLISHED",
  "specificContent": {
      "com.linkedin.ugc.ShareContent": {
          "shareCommentary": {
              "text": `${caption}`
          },
          "shareMediaCategory": "IMAGE",
          "media": [
              {
                  "status": "READY",
                  "description": {
                      "text": "Center stage!"
                  },
                  "media": `${Asset}`,
                  "title": {
                      "text": "LinkedIn Talent Connect 2021"
                  }
              }
          ]
      }
  },
  "visibility": {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileType(e.target.files[0].type);
   
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

 

  const handleSubmit= () => {
   setMessage(`trying to upload ${fileType}, ${caption}`);
   axios.post('http://localhost:5000/api/proxy/post', {
    url: 'https://api.linkedin.com/v2/assets?action=registerUpload',
    data: data1,
    headers: headers
    })
    .then(response => {
        setAsset(response.data.value.asset);
        setUploadUrl(response.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl);
        console.log(Asset);
        console.log(USER_ID);
        console.log(uploadUrl);
        const formData = new FormData();
        formData.append('upload-file', file);
        // axios.post('http://localhost:5000/api/proxy/post', {
        //   url: uploadUrl,
        //   data: formData,
        //   headers: headers
        //   }).then(response=>{
        //     console.log(response);
           
        //   if(response.statusText==='OK'){
        //     axios.post('http://localhost:5000/api/proxy/post', {
        //       url: 'https://api.linkedin.com/v2/ugcPosts',
        //       data: data2,
        //       headers: headers
        //       })
        //       .then(response => {
        //           console.log(response);
        //           setMessage(response.statusText);
        //       })
        //       .catch(error => {
        //       console.log(error);
        //       });
        //   }
        //   }).catch(error =>{
        //     console.log(error);
        // })
      
    })
    .catch(error => {
    console.log(error);
    });
  };
  

  return (
    <div>
      <form>
        <div className="field c" >
          <label  htmlFor="media">Choose Media </label>
          <input type="file" id="media" onChange={handleFileChange} />
        </div>
        <div className="field">
          <label htmlFor="caption">Caption : </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>
        
      </form>
      <button onClick={()=>{handleSubmit()}} >Upload Media</button>
      {message && <p>{message}</p>}
     
    </div>
  );
}

export default UploadMedia;