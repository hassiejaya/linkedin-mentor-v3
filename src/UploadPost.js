import axios from 'axios';
import UploadMedia from './UploadMedia';
import { useEffect, useState } from 'react';


const UploadPost = (props) => {
    const member_id = props.member_id;
   
    const [post_text, setPost_text] = useState('');
    const [article_text, setArticle_text] = useState('');
    const [article_description, setArticle_description] = useState('');
    const [article_title, setArticle_title] = useState('');
    const [article_url, setArticle_url] = useState('');


    const post_Handler = ()=>{
      if(post_text!=''){
        UploadTextPost(member_id,post_text);
        setPost_text('');
      }
    }
    const article_Handler = (article_url,article_title,article_description,article_text)=>{
      if(article_url!=''){
        UploadArticile(member_id,article_text,article_description,article_url,article_title);
        setArticle_url('');
        setArticle_text('');
        setArticle_title('');
        setArticle_description('');
      }
    }

    const apiki = JSON.parse(localStorage.getItem('authKey'));
    const UploadTextPost = (member_id,post_text)=>{
        const data = {
            "author": `urn:li:person:${member_id}`,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
              "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                  "text": `${post_text}`
                },
                "shareMediaCategory": "NONE"
              }
            },
            "visibility": {
              "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS"
            }
          };
          const headers = {
            'Authorization': `Bearer ${apiki.access_token}`,
            'Content-Type': 'application/json',
            'x-li-format': 'json'
          };
    
          axios.post('http://localhost:5000/api/proxy/post', {
            url: 'https://api.linkedin.com/v2/ugcPosts',
            data: data,
            headers: headers
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
            console.log(error);
            });
    }

    const UploadArticile = (member_id,post_text,article_description,url,article_title)=>{
      const data = {
        "author":  `urn:li:person:${member_id}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": `${post_text}`
                },
                "shareMediaCategory": "ARTICLE",
                "media": [
                    {
                        "status": "READY",
                        "description": {
                            "text": `${article_description}`
                        },
                        "originalUrl": `${url}`,
                        "title": {
                            "text": `${article_title}`
                        }
                    }
                ]
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    };
        const headers = {
          'Authorization': `Bearer ${apiki.access_token}`,
          'Content-Type': 'application/json',
          'x-li-format': 'json'
        };
  
        axios.post('http://localhost:5000/api/proxy/post', {
          url: 'https://api.linkedin.com/v2/ugcPosts',
          data: data,
          headers: headers
          })
          .then(response => {
              console.log(response);
          })
          .catch(error => {
          console.log(error);
          });
  }
 



    return ( <div className="UploadPost">
      <div className="textpost">
      <form>
        <label> Write a Text Post :</label>
        <textarea value={post_text} onChange={(e)=>setPost_text(e.target.value)} ></textarea>
      </form>
      {apiki&&<button onClick={()=>{post_Handler();}}> Upload Text Post</button>}
      </div>
      
      <div className="article">
      <form>
          <div className="field">
          <label> Article Url : </label>
          <input type="text" value={article_url} onChange={(e)=>setArticle_url(e.target.value)}/>
          </div>
          <div className="field">
          <label> Article Title : </label>
          <input type="text" value={article_title} onChange={(e)=>setArticle_title(e.target.value)}/>
          </div>
          <div className="field"><label> Post text : </label>
          <textarea value={article_text} onChange={(e)=>setArticle_text(e.target.value)} > write something about this post</textarea>
          </div>
          <div className="field">
          <label> Article Description : </label>
          <textarea value={article_description} onChange={(e)=>setArticle_description(e.target.value)} > write something about this post</textarea>
          </div>
        
        </form>
        {apiki&&<button onClick={()=>{article_Handler(article_url,article_title,article_description,article_text)}}> Upload Article</button>}
      </div>
      <div className="mediapost">
      <UploadMedia ACCESS_TOKEN = {apiki.access_token} USER_ID={member_id }   />
      </div>
        
        
    </div> );
}
 
export default UploadPost;