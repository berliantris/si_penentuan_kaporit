let dbAdmin = require('../../models/adminModel.js')
let dbHasilKaporit = require('../../models/hasilKaporitModel.js')
let dbKlorin = require('../../models/klorinModel.js')
module.exports = {
getKlorin: (req, res) => {
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

    let klorinJanuari = 0
    let klorinFebruari = 0
    let klorinMaret = 0
    let klorinApril = 0
    let klorinMei = 0
    let klorinJuni = 0
    let klorinJuli = 0
    let klorinAgustus = 0
    let klorinSeptember = 0
    let klorinOktober = 0
    let klorinNovember = 0
    let klorinDesember = 0

dbHasilKaporit.find({tahunInt: tahunInt}, (err, resultTahunIni) => {
    if(err) {console.log(err)}
    else {
    let iJanuari = 0
    let iFebruari = 0
    let iMaret = 0
    let iApril = 0
    let iMei = 0
    let iJuni = 0
    let iJuli = 0
    let iAgustus = 0
    let iSeptember = 0
    let iOktober = 0
    let iNovember = 0
    let iDesember = 0
    if(resultTahunIni.length > 0) {
        resultTahunIni.forEach((data) => {
        if(data.bulanString == 'januari') {
            klorinJanuari += data.kadarKlorin
            iJanuari++
        }
        if(data.bulanString == 'februari') {
            klorinFebruari += data.kadarKlorin
            iFebruari++
        }
        if(data.bulanString == 'maret') {
            klorinMaret += data.kadarKlorin
            iMaret++
        }
        if(data.bulanString == 'april') {
            klorinApril += data.kadarKlorin
            iApril++
        }
        if(data.bulanString == 'mei') {
            klorinMei += data.kadarKlorin
            iMei++
        }
        if(data.bulanString == 'juni') {
            klorinJuni += data.kadarKlorin
            iJuni++
        }
        if(data.bulanString == 'juli') {
            klorinJuli += data.kadarKlorin
            iJuli++
        }
        if(data.bulanString == 'agustus') {
            klorinAgustus += data.kadarKlorin
            iAgustus++
        }
        if(data.bulanString == 'september') {
            klorinSeptember += data.kadarKlorin
            iSeptember++
        }
        if(data.bulanString == 'oktober') {
            klorinOktober += data.kadarKlorin
            iOktober++
        }
        if(data.bulanString == 'november') {
            klorinNovember += data.kadarKlorin
            iNovember++
        }
        if(data.bulanString == 'desember') {
            klorinDesember += data.kadarKlorin
            iDesember++
        }
        })
        klorinJanuari /=iJanuari
        klorinFebruari /= iFebruari
        klorinMaret /= iMaret
        klorinApril /= iApril
        klorinMei /= iMei
        klorinJuni /= iJuni
        klorinJuli /= iJuli
        klorinAgustus /= iAgustus
        klorinSeptember /= iSeptember
        klorinOktober /= iOktober
        klorinNovember /= iNovember
        klorinDesember /= iDesember
    }
    }
    
    
    dbKlorin.find().sort({_id: -1}).exec((err, dbKlorinOutput) => {
        if(err) {console.log(err)}
        else {
            if(dbKlorinOutput[0] != null) {
                function limitDecimal(number, decimalPlaces) {
                    return parseFloat(number.toFixed(decimalPlaces));
                }
                perbandinganKlorinHari = limitDecimal(perbandinganKlorinHari, 2)
                perbandinganKaporitHari = limitDecimal(perbandinganKaporitHari, 2)
                rerataKlorinBulanIni = limitDecimal(rerataKlorinBulanIni, 2)
                kaporitBulanIni = limitDecimal(kaporitBulanIni, 2)
                perbandinganKlorinBulan = limitDecimal(perbandinganKlorinBulan, 2)
                perbandinganKaporitBulan = limitDecimal(perbandinganKaporitBulan, 2)

                res.render('../views/admin/klorin.ejs', {
                aktif: 'admin-klorin',
                klorinHariIni: klorinHariIni,
                kaporitHariIni: kaporitHariIni,
                perbandinganKlorinHari: perbandinganKlorinHari,
                perbandinganKaporitHari: perbandinganKaporitHari,
                rerataKlorinBulanIni: rerataKlorinBulanIni,
                kaporitBulanIni: kaporitBulanIni,
                perbandinganKlorinBulan: perbandinganKlorinBulan,
                perbandinganKaporitBulan: perbandinganKaporitBulan,
                data: dbKlorinOutput[0],
                klorinJanuari: klorinJanuari,
                klorinFebruari: klorinFebruari,
                klorinMaret: klorinMaret,
                klorinApril: klorinApril,
                klorinMei: klorinMei,
                klorinJuni: klorinJuni,
                klorinJuli: klorinJuli,
                klorinAgustus: klorinAgustus,
                klorinSeptember: klorinSeptember,
                klorinOktober: klorinOktober,
                klorinNovember: klorinNovember,
                klorinDesember: klorinDesember,
                })
    }
    else {
        dbKlorin.create({
        himpunanRendah: {
            min: null,
            max: null
        },
        himpunanNormal: {
            min: null,
            max: null
        }
        }, (err, output) => {
        if(err) { console.log(err) }
        else {
            res.redirect('/admin-klorin')
        }
        })
    }
    }
})
})
})
// 
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

updateKlorin: (req, res) => {
    if(req.session.idAdmin != null) {
    dbAdmin.find({_id: req.session.idAdmin}, (err, dbAdminOutput) => {
        if(err){console.log(err)}
        else {
            if(dbAdminOutput.length > 0) {
                let id = req.body.id
                let minHimpunanRendah = req.body.minHimpunanRendah.trim()
                let maxHimpunanRendah = req.body.maxHimpunanRendah.trim()
                let minHimpunanNormal = req.body.minHimpunanNormal.trim()
                let maxHimpunanNormal = req.body.maxHimpunanNormal.trim()
    dbKlorin.find().sort({_id: -1}).exec((err, dbKlorinOutput) => { 
        if(err) {console.log(err)}
        else {
        dbKlorin.updateOne({_id: id}, {
            himpunanRendah: {
            min: minHimpunanRendah,
            max: maxHimpunanRendah
            },
            himpunanNormal: {
            min: minHimpunanNormal,
            max: maxHimpunanNormal
            }
        }, (err, result) => {
            if(err) { console.log(err) }
            else {
            res.redirect('/admin-klorin')
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