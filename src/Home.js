import axios from 'axios';
import { useEffect, useState } from 'react';
import UploadPost from './UploadPost';
const Home = () => {
    const [user, setUser] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const apiki = JSON.parse(localStorage.getItem('authKey'));
    const apiUrl = 'https://api.linkedin.com/v2/me';

    const headers = {
      'Authorization': `Bearer ${apiki.access_token}`,
      'Content-Type': 'application/json',
    };
    useEffect(()=>{
        axios.get('http://localhost:5000/api/proxy', {
          params: {
            url: apiUrl,
            headers: headers
        }
        }
          )
                .then(response => {
                console.log(response.data)
                setUser(response.data);
                axios.get('http://localhost:5000/api/proxy', {
                  params: {
                    url: 'https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~digitalmediaAsset:playableStreams))',
                    headers: headers
                }
                }
                  )
                        .then(response => {
                        setProfilePicUrl(response.data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier);
                           
                        })
                        .catch(error => {
                        console.log(error);
                        });
                })
                .catch(error => {
                console.log(error);
          });
        
        if(user){
         
        }

    },[])



    return ( <div className="Home">
       
       {/* {!user && <h1>Home</h1>} */}
       {user && <h4>Hello {user.localizedFirstName} Welcome to LinkedIn Mentor, your personalized linkedin Guide</h4>}
      {profilePicUrl && <img src={profilePicUrl}></img>}
      {user&&apiki&&<UploadPost member_id = {user.id} post_text ={"This is a sample post number 3"}  />}
        
    </div> );
}
 
export default Home;