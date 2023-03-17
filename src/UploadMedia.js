import React, { useState } from "react";
import axios from "axios";

function UploadMedia(props) {
  const ACCESS_TOKEN =props.ACCESS_TOKEN;
  const  USER_ID = props.USER_ID;
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileType(e.target.files[0].type);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    // Set up the headers for the API request
    const headers = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "X-Restli-Protocol-Version": "2.0.0"
    };

    const url = 'http://localhost:5000/api/proxy/post';

    try {
     
      const response = await axios.post(
        url,
        {
          url: "https://api.linkedin.com/v2/assets?action=registerUpload",
          data: formData,
          headers: headers
        }
      );

      // Get the asset ID from the response data
      const asset = response.data.value;
      const assetId = asset.asset;

      const postUrl = 'https://api.linkedin.com/v2/ugcPosts';

      // Create the post body
      const postBody = {
        author: `urn:li:person:${USER_ID}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            media: [
              {
                status: "READY",
                media: assetId,
                title: {
                  text: caption
                }
              }
            ],
            shareCommentary: {
              text: caption
            },
            shareMediaCategory: "NONE"
          }
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS"
        }
      };

      // Make the API request to post the media to LinkedIn
      await axios.post(
        postUrl,
        postBody,
        { headers }
      );

      // Set the message based on the type of file uploaded
      if (fileType && fileType.startsWith("image")) {
        setMessage("Photo uploaded successfully!");
      } else if (fileType && fileType.startsWith("video")) {
        setMessage("Video uploaded successfully!");
      } else {
        setMessage("File uploaded successfully!");
      }

      // Clear the form inputs
      setFile(null);
      setFileType(null);
      setCaption("");
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="media">Choose media:</label>
          <input type="file" id="media" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>
        <button type="submit">Upload Media</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadMedia;