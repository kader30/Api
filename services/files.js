const { storage} = require('../middelwares/files-storage');
const File = require('../models/file');
const fs = require('fs');

//Méthode chargé de creer un fichier
exports.createOneFile = (req, res, next) => {
    const file = new File({
        name: req.file.filename,
        imageUrl: `${req.protocol}://localhost:3000/uploads/${req.file.filename}`,
       // userId: req.body.userId
    });
    file.save()
    .then(() => {res.status(201).json({message: 'objet enregistré !'})})
    .catch(error => { res.status(400).json( {error})})
};

//Methode chargé de recuperer un fichier 
exports.getOneFile =(req, res, next) => {
    File.findOne({ _id: req.params.id})
    .then(file => res.status(200).json(file))
    .catch(error => res.status(404).json({ error }));
};

//Methode chargée de modifier un fichier
exports.modifyOneFile = (req, res, next) => {
    const file = new File({
        name: req.file.filename,
        descritpion : req.body.description,
        imageUrl: `${req.protocol}://localhost:3000/uploads/${req.file.filename}`,
        userId : req.body.userId
    });
    
    File.findOne({ _id: req.params.id})
        .then((thing) => {
            if(file.userId == thing.userId){
                File.updateOne({ _id: req.params.id}, { ...file, _id: req.params.id})
                .then(() => res.status(200).json({message: 'objet modifié !'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Methode chargée de supprimer un fichier
exports.deleteOnFile = (req, res, next) => {
    File.findOne({ _id: req.body.id})
    .then(file => {
        const filename = file.imageUrl.split('/uploads')[1];
        fs.unlink(`uploads/${filename}`, () => {
            File.deleteOne({_id:req.body.id})
            .then(() => {res.status(200).json({message: 'objet supprimé !'})})
            .catch(error => res.status(401).json({ error }));
        });
    })
    .catch( error => {
        res.status(500).json({ error });
    });
};