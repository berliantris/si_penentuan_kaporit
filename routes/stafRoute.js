const express = require('express');
const router = express.Router();

const controller = require('../controllers/stafController');

router.get('/hitung-kaporit', controller.getHitungKaporit)
router.post('/hasil-kaporit', controller.hasilHitungKaporit)
router.post('/simpan-kaporit', controller.simpanHasilHitungKaporit)

module.exports = router