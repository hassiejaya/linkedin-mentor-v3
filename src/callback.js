import { useEffect, useState } from "react";
import axios from 'axios';


const AuthCalback = () => { 
    const [thedata, setThedata] = useState('');
   
    const client_id = '86pe6qha0ri8b7';
    const client_secret= 'UO0NP3fapEglTMwv';
    const redirect_uri='http://localhost:3000/callback';
    const queryParameters = new URLSearchParams(window.location.search);
   
  
    useEffect(()=>{
        setThedata(queryParameters.get("code"));
        window.$statee = queryParameters.get("state"); 

        if(thedata !== ''){
            axios.post('https://localhost:4000/api/proxy', {
                url: 'https://www.linkedin.com/oauth/v2/accessToken',
                data: `code=${thedata}&grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                })
                .then(response => {
                console.log('authkey set');
                localStorage.setItem('authKey', JSON.stringify(response.data));
                console.log(localStorage.getItem('authKey'));
                window.opener.postMessage({ isLoggedin: true }, window.opener.origin);
                window.close();
                })
                .catch(error => {
                console.log(error);
                window.opener.postMessage({ isLoggedin: true }, window.opener.origin);
                });
                
        }
        
            
         
    },[queryParameters])
 
    
    
    return ( <div className="callback">
     
     
    </div> );

}
 
export default AuthCalback;