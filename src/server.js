const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const FormData = require("form-data")
const fs = require('fs')
const app = express()
const port = 5000
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/api/proxy', (req, res) => {
   const { url, headers } = req.query;
   axios({
     method: 'get',
     url: url,
     headers: headers,
   }).then(response=>{
     res.send(response.data);
   }).catch(error=>{
     console.log(error.message, "from proxy get!!");
     res.status(500).send('An error occurred',error);
   });
 });

 app.get('/api/proxy/image', (req, res) => {
    const { url, headers } = req.query;
    axios({
      method: 'get',
      url: url,
      headers: headers,
    }).then(response=>{
      res.send(response.data);
    }).catch(error=>{
      console.log(error.message, "from proxy get image");
      res.status(500).send('An error occurred',error.message);
    });
  });


  app.post('/api/proxy/post', (req,res)=>{
    const{url,data, headers} = req.body;
    axios({
      method: 'post',
      url: url,
      data: data,
      headers: headers,
    }).then(response=>{
      res.send(response.data);
      console.log(response.status, url,response.data,data);
    }).catch(error=>{
      console.log(error, "from proxy!!");
      // console.data;
      res.status(500).send('An error occurred');
    });
  });


  app.post('/api/proxy/media', upload.single('file'), (req,res)=>{
    console.log(req.file)
    console.log(req.file.originalname);
    console.log(req.body.auth);
    console.log(req.body.uploadUrl);
    const { auth, uploadUrl } = req.body;
    fs.readFile(req.file.path, function(err, data){
      
      fetch(uploadUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': req.file.mimetype, 
        'Authorization': `Bearer ${auth}`,
      },
    })
      .then((response) => {
        // console.log(data);
        res.status(response.status).send(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred');
      });
  });
    // fetch('https://api.linkedin.com/mediaUpload/C5622AQFBTk7N4mpjCA/feedshare-uploadedImage/0?ca=vector_feedshare&cn=uploads&m=AQJ6n18aYUa2igAAAYcC27rzT6CTCeZfM9OAKYd63OK7fODdzbMA8WIEa2Y&app=208039609&sync=0&v=beta&ut=2CVt25X2qB5GI1', {
    //   method: 'POST',
    //   data: req.file,
    //   headers: {
    //     'Content-Type': undefined, 
    //     'Authorization': `Bearer ${auth}`,
    //   },
    // })
    //   .then((response) => {
    //     console.log(response)
    //     res.status(response.status).send(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     res.status(500).send('An error occurred');
    //   });
    

  });
  
  app.post('/api/proxy/auth',(req,res)=>{
    const{url,data, headers} = req.body;
  
    axios({
      method: 'post',
      url: url,
      data: data,
      headers: headers,
    }).then(response=>{
      res.send(response.data);
      console.log('auth response sent');
    }).catch(error=>{
      console.log(error, "auth from proxy(server.js)!!");
      // console.data;
      res.status(500).send('An error occurred');
    });
  });



 app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })