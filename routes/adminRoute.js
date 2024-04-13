const express = require('express')
const router = express.Router()

// import
const controller = require('../controllers/adminController.js')
const dasbor = require('../controllers/admin/dasbor.js')
const klorin = require('../controllers/admin/klorin.js')
const kaporit = require('../controllers/admin/kaporit.js')
const riwayat = require('../controllers/admin/riwayat.js')

// dasbor
router.get('/admin-dasbor', dasbor.getDasbor)

// klorin
router.get('/admin-klorin', klorin.getKlorin)
router.post('/admin-update-klorin', klorin.updateKlorin)

// kaporit
router.get('/admin-kaporit', kaporit.getKaporit)
router.post('/admin-update-kaporit', kaporit.updateKaporit)

// riwayat
router.get('/admin-riwayat-kaporit', riwayat.getRiwayat)
router.post('/admin-detail-riwayat-kaporit', riwayat.detailRiwayat)
router.post('/admin-hapus-riwayat-kaporit', riwayat.deleteRiwayat)
router.post('/admin-cari', riwayat.searchRiwayat)

// admin
router.get('/admin-login', controller.getLogIn)
router.post('/admin-login', controller.loginAdmin)
router.get('/admin-keluar', controller.logout)
router.get('/admin-profil', controller.getProfil)
router.post('/admin-profil', controller.updateProfil)
router.get('/admin-tambah', controller.getTambahAdmin)
router.post('/admin-tambah', controller.tambahAdmin)
router.post('/admin-hapus', controller.hapusAdmin)


module.exports = router