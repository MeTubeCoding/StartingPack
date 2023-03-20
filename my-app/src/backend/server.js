
// Cela va probablement un peu changer car il faut que je l'adapte pour typescript mais pour pouvez
// commencer à taffer la dessus y'aura juste quelque correction mineur à l'avenir le temps je règle le
// problème

const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require("body-parser");
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
const { query } = require('express');

const uri = "mongodb+srv://Username:Password@metube.1cfbpke.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const fs = require('fs');

var publi = path.join(__dirname, 'nom du dossier Public');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use('/', express.static(publi)); 

app.use(cors(corsOptions));



// Optionnel a vous de voir pour vous adapter à votre problématique : 

// app.get('/',(req,res)=>{

//     res.sendFile(path.join('nomDuDossierOuLeUserArrive', 'nomDuFichierSurLequelLeUserEstCenséAtterirDèsQuilEstSurLeSite.html'));
// })

app.post('/node/sub',(req,res)=>{
    
    client.connect(err => {

        async function run() {
            try {
              const database = client.db('BigOne');
              const movies = database.collection('enAttente');
            //   console.log("mongo connect")
              const query = req.body;
            //   console.log(query); 
              await movies.insertOne(query);
            //   console.log(movie);
            } finally {
              // Ensures that the client will close when you finish/error
              await client.close(); 
            }
          }
          run().catch(console.dir);
    });

    res.end();
    
});

app.get('/demo',(req,res)=>{
  console.log("test");
  res.end("reponse du serveur");
})

//


app.listen(5600,() => {
    console.log('Server app listening on port 5600');
});