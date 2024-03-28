const express = require('express');
const { terrainController } = require('../controllers/terrain.controller');
const router = express.Router();

router.post('/terrain/add/:idRes', terrainController.addTerrain);
router.put('/terrain/update/:terrainId', terrainController.updateTerrain);
router.delete('/terrain/delete/:terrainId', terrainController.deleteTerrain);
router.get(`/terrain/search`, terrainController.searchTerrain);
router.get('/terrain/list/:respId', terrainController.listTerrain);
//router.post('/terrain/modifcalendar/:respId',terrainController.updateCalendar);
router.get('/terrain/get', terrainController.getTerrain);
router.get('/terrain/getInfo/:id', terrainController.getTerrainInfo);

module.exports.terrainRouter = router;
