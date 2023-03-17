import LoginPage from './LoginPage';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter , Routes, Route, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthCalback from './callback';
import './App.css';

localStorage.setItem('isLoggedIn', false);

function App() {
  
  const [apiKey, setApiKey] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn')==="true"); 


  useEffect(()=>{
    const apiki = JSON.parse(localStorage.getItem('authKey'));
    if(apiki){
      setApiKey(apiki);
       console.log(JSON.stringify(apiki));
      // console.log(Date());
    } 
    // console.log(isLoggedIn, 'in useEffect');
  },[isLoggedIn])



  useEffect(() => {
 
    const handleMessage = (event) => {     
      if (event.origin === window.location.origin) {
        if(event.data.isLoggedin===true & isLoggedIn===false){  
          localStorage.setItem('isLoggedIn', true);
          setIsLoggedIn(true);  
        }
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);

    };
  }, [])
  
  return (
    <div className="App">
     {/* <LinkedInPage/>      */}
    
     
     {/* <Navbar/> */}
     <h1> The LinkedIn Mentor</h1>
     <div className="content">
     <BrowserRouter>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<LoginPage />} />}
        
        {isLoggedIn && <Route exact path = "/" element={<Home/>}/>}
        <Route exact path = "/home" element={<Home/>}/>
        <Route exact path = "/callback" element={<AuthCalback  />}/>
        <Route exact path = "/upload" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </div> 
    </div>
   
  );
}

export default App;

