const express = require('express');
const router = express.Router();


const service = require('../services/users');

const private = require('../middelwares/private');
// La route pour lire les infos d'un utilisateur
router.get('/:id', private.checkJWT, service.getById);
// La route pour ajouter un utilisateur
router.put('/add', service.add);

// La route pour modifier un utilisateur
router.patch('/update', private.checkJWT, service.update);
// La route pour supprimer un utilisateur
router.delete('/delete', private.checkJWT, service.delete);
// ajout de la route /authenticate
router.post('/authenticate', service.authenticate);
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

module.exports = router;
