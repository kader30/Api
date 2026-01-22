const expres = require('express');

const router = express.Router();

const service = require('../service/files');

const multer = require('../middelwares/files-storage');

const private = require('../middelwares/private');

router.get('/',  service.getAllFiles);

router.post('/', multer, service.createOneFile);

router.get('/:id', private.checkJWT, service.getOneFile);

router.put('/:id', private.checkJWT, service.modifyOneFile);

router.delete('/delete', private.checkJWT, service.deleteOneFile);

module.exports = router;