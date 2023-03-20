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

app.get('/',(req,res)=>{

    res.sendFile(path.join(nomDuDossierOuLeUserArrive, 'nomDuFichierSurLequelLeUserEstCenséAtterirDèsQuilEstSurLeSite.html'));
})

app.listen(5600,() => {
    console.log('Server app listening on port 5600');
});