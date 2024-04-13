let dbAdmin = require('../../models/adminModel.js')
let dbHasilKaporit = require('../../models/hasilKaporitModel.js')
let dbKaporit = require('../../models/kaporitModel.js')
module.exports = {
getKaporit: (req, res) =>{
    if(req.session.idAdmin != null) {
    dbAdmin.find({_id: req.session.idAdmin}, (err, dbAdminOutput) => {
        if(err){console.log(err)}
        else {
            if(dbAdminOutput.length > 0) {
                const namaHari = ["minggu","senin","selasa","rabu","kamis","jumat","sabtu"]
                const namaBulan = ["januari","februari","maret","april","mei","juni","juli","agustus","september","oktober","november","desember"]
                let d = new Date()
                let tanggalInt = d.getDate()
                let hariInt = d.getDay()
                let hariString = namaHari[d.getDay()]
                let bulanInt = d.getMonth()+1
                let bulanString = namaBulan[d.getMonth()]
                let tahunInt = d.getFullYear()
                let mingguInt = Math.ceil(tanggalInt/ 7)
                if(mingguInt == 5) {
                    mingguInt = 4
                }
                // hari
                let klorinHariIni = 0
                let klorinHariKemarin = 0
                let perbandinganKlorinHari = 0
                let kaporitHariIni = 0
                let kaporitHariKemarin = 0
                let perbandinganKaporitHari = 0
                // bulan
                let rerataKlorinBulanIni = 0
                let rerataKlorinBulanKemarin = 0
                let perbandinganKlorinBulan = 0
                let kaporitBulanIni = 0
                let kaporitBulanKemarin = 0
                let perbandinganKaporitBulan = 0
    dbHasilKaporit.find({tanggalInt: tanggalInt, bulanInt: bulanInt, tahunInt: tahunInt}, (err, resultHariIni) => {
        if(err) {console.log(err)}
        else {
            if(resultHariIni[0] != null) {
            klorinHariIni = resultHariIni[0].kadarKlorin
            kaporitHariIni = resultHariIni[0].zTotal
            }
        }
    
        // LOGIKA HARI
        let tanggalIntMod = 0
        let bulanIntMod = 0
        let tahunIntMod = 0
    
        // SAAT TAHUN BARU 
        if(tanggalInt == 1 && bulanInt == 1) {
            tanggalIntMod = 31
            bulanIntMod = 12
            tahunIntMod = tahunInt-1
        }
        // SAAT BULAN BARU
        else if(tanggalInt == 1 && bulanInt != 1) {
            if(bulanInt == 1) {
            tanggalIntMod = 31
            }
            else if(bulanInt == 2) {
            let tahun = tahunInt/4
            if(Number.isInteger(tahun)) {
                tanggalIntMod = 29
            }
            else {
                tanggalIntMod = 28
            }
            }
            else if(bulanInt == 3) {
            tanggalIntMod = 31
            }
            else if(bulanInt == 4) {
            tanggalIntMod = 30
            }
            else if(bulanInt == 5) {
            tanggalIntMod = 31
            }
            else if(bulanInt == 6) {
            tanggalIntMod = 30
            }
            else if(bulanInt == 7) {
            tanggalIntMod = 31
            }
            else if(bulanInt == 8) {
            tanggalIntMod = 31
            }
            else if(bulanInt == 9) {
            tanggalIntMod = 30
            }
            else if(bulanInt == 10) {
            tanggalIntMod = 31
            }
            else if(bulanInt == 11) {
            tanggalIntMod = 30
            }
            else if(bulanInt == 12) {
            tanggalIntMod = 31
            }
            bulanIntMod = bulanInt-1
            tahunIntMod = tahunInt 
        }
        else {
            tanggalIntMod = tanggalInt-1
            bulanIntMod = bulanInt
            tahunIntMod = tahunInt
        }
    
        dbHasilKaporit.find({tanggalInt: tanggalIntMod, bulanInt: bulanIntMod, tahunInt: tahunIntMod}, (err, resultHariKemarin) => {
        if(err) {console.log(err)}
        else {
            if(resultHariKemarin[0] != null) {
            klorinHariKemarin = resultHariKemarin[0].kadarKlorin
            kaporitHariKemarin = resultHariKemarin[0].zTotal
            }
        }
        perbandinganKlorinHari = klorinHariIni - klorinHariKemarin
        perbandinganKaporitHari = kaporitHariIni - kaporitHariKemarin
    
        // LOGIKA BULAN
        let bulanIntMod2 = 0
        let tahunIntMod2 = 0
        if(bulanInt == 1) {
            bulanIntMod2 = 12
            tahunIntMod2 = tahunInt-1
        }
        else {
            bulanIntMod2 = bulanInt-1
            tahunIntMod2 = tahunInt
        }
    
        // bulan ini
        dbHasilKaporit.find({bulanInt: bulanInt, tahunInt: tahunInt}, (err, resultBulanIni) => {
        if(err) {console.log(err)}
        else {
            if(resultBulanIni.length > 0) {
            resultBulanIni.forEach((data) => {
                rerataKlorinBulanIni += data.kadarKlorin
                kaporitBulanIni += data.zTotal
            })
            rerataKlorinBulanIni /= resultBulanIni.length
            }
        }
        dbHasilKaporit.find({bulanInt: bulanIntMod2, tahunInt: tahunIntMod2}, (err, resultBulanKemarin) => {
        if(err) {console.log(err)}
        else {
            if(resultBulanKemarin.length > 0) {
            resultBulanKemarin.forEach((data) => {
                rerataKlorinBulanKemarin += data.kadarKlorin
                kaporitBulanKemarin += data.zTotal
            })
            rerataKlorinBulanKemarin /= resultBulanKemarin.length
            }
        }
        perbandinganKlorinBulan = rerataKlorinBulanIni - rerataKlorinBulanKemarin
        perbandinganKaporitBulan = kaporitBulanIni - kaporitBulanKemarin
        
        let kaporitJanuari = 0
        let kaporitFebruari = 0
        let kaporitMaret = 0
        let kaporitApril = 0
        let kaporitMei = 0
        let kaporitJuni = 0
        let kaporitJuli = 0
        let kaporitAgustus = 0
        let kaporitSeptember = 0
        let kaporitOktober = 0
        let kaporitNovember = 0
        let kaporitDesember = 0
        dbHasilKaporit.find({tahunInt: tahunInt}, (err, resultTahunIni) => {
        if(err) {console.log(err)}
        else {
            if(resultTahunIni.length > 0) {
            resultTahunIni.forEach((data) => {
                if(data.bulanString == 'januari') {
                kaporitJanuari += data.zTotal
                }
                if(data.bulanString == 'februari') {
                kaporitFebruari += data.zTotal
                }
                if(data.bulanString == 'maret') {
                kaporitMaret += data.zTotal
                }
                if(data.bulanString == 'april') {
                kaporitApril += data.zTotal
                }
                if(data.bulanString == 'mei') {
                kaporitMei += data.zTotal
                }
                if(data.bulanString == 'juni') {
                kaporitJuni += data.zTotal
                }
                if(data.bulanString == 'juli') {
                kaporitJuli += data.zTotal
                }
                if(data.bulanString == 'agustus') {
                kaporitAgustus += data.zTotal
                }
                if(data.bulanString == 'september') {
                kaporitSeptember += data.zTotal
                }
                if(data.bulanString == 'oktober') {
                kaporitOktober += data.zTotal
                }
                if(data.bulanString == 'november') {
                kaporitNovember += data.zTotal
                }
                if(data.bulanString == 'desember') {
                kaporitDesember += data.zTotal
                }
            })
            }
        }
        dbKaporit.find().sort({_id: -1}).exec((err, dbKaporitOutput) => {
        if(err) {console.log(err)}
        else {
            if(dbKaporitOutput[0] != null) {
                function limitDecimal(number, decimalPlaces) {
                    return parseFloat(number.toFixed(decimalPlaces));
                }
                perbandinganKlorinHari = limitDecimal(perbandinganKlorinHari, 2)
                perbandinganKaporitHari = limitDecimal(perbandinganKaporitHari, 2)
                rerataKlorinBulanIni = limitDecimal(rerataKlorinBulanIni, 2)
                kaporitBulanIni = limitDecimal(kaporitBulanIni, 2)
                perbandinganKlorinBulan = limitDecimal(perbandinganKlorinBulan, 2)
                perbandinganKaporitBulan = limitDecimal(perbandinganKaporitBulan, 2)

                res.render('../views/admin/kaporit.ejs', {
                    aktif: 'admin-kaporit',
                    klorinHariIni: klorinHariIni,
                    kaporitHariIni: kaporitHariIni,
                    perbandinganKlorinHari: perbandinganKlorinHari,
                    perbandinganKaporitHari: perbandinganKaporitHari,
                    rerataKlorinBulanIni: rerataKlorinBulanIni,
                    kaporitBulanIni: kaporitBulanIni,
                    perbandinganKlorinBulan: perbandinganKlorinBulan,
                    perbandinganKaporitBulan: perbandinganKaporitBulan,
        
                    kaporitJanuari: kaporitJanuari,
                    kaporitFebruari: kaporitFebruari,
                    kaporitMaret: kaporitMaret,
                    kaporitApril: kaporitApril,
                    kaporitMei: kaporitMei,
                    kaporitJuni: kaporitJuni,
                    kaporitJuli: kaporitJuli,
                    kaporitAgustus: kaporitAgustus,
                    kaporitSeptember: kaporitSeptember,
                    kaporitOktober: kaporitOktober,
                    kaporitNovember: kaporitNovember,
                    kaporitDesember: kaporitDesember,
                    data: dbKaporitOutput[0],
                })
            }
            else {
            dbKaporit.create({
                himpunanSedikit: {
                min: null,
                max: null
                },
                himpunanBanyak: {
                min: null,
                max: null
                },
            }, (err, output) => {
                if(err) { console.log(err) }
                else {
                res.redirect('/admin-kaporit')
                }
            })
            }
        }
        })
        })
        })
        })
        })
        })
            }
            else {
                res.redirect('/admin-login')
            }
        }
        })
        }
        else {
            res.redirect('/admin-login')
        }
},

updateKaporit: (req, res) => {
    if(req.session.idAdmin != null) {
    dbAdmin.find({_id: req.session.idAdmin}, (err, dbAdminOutput) => {
        if(err){console.log(err)}
        else {
            if(dbAdminOutput.length > 0) {
                let id = req.body.id
                let minHimpunanSedikit = req.body.minHimpunanSedikit.trim()
                let maxHimpunanSedikit = req.body.maxHimpunanSedikit.trim()
                let minHimpunanBanyak = req.body.minHimpunanBanyak.trim()
                let maxHimpunanBanyak = req.body.maxHimpunanBanyak.trim()
    dbKaporit.find().sort({_id: -1}).exec((err, dbKaporitOutput) => { 
        if(err) {console.log(err)}
        else {
        dbKaporit.updateOne({_id: id}, {
            himpunanSedikit: {
            min: minHimpunanSedikit,
            max: maxHimpunanSedikit
            },
            himpunanBanyak: {
            min: minHimpunanBanyak,
            max: maxHimpunanBanyak
            },
        }, (error, result) => {
            if(error) { console.log(error) }
            else {
            res.redirect('/admin-kaporit')
            }
        })
        }
    })
            }
            else {
                res.redirect('/admin-login')
            }
        }
        })
        }
        else {
            res.redirect('/admin-login')
        }
}
}