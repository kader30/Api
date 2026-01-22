const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png' : 'png'
};

const storage = multer.diskStorage({
    destination: (res, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        console.log(name)
        const extension = MIME_TYPES[file.miemtype];
    // ci-dessous le callback ajoute un tiemstamp concatené avec 
    // le nom de l'image comme nom d'image pour la sauvegarde
    // cela permet de la rendre unique.
    callback(null, Date.now() + name);
    }
});

module.exports = multer({storage: storage});