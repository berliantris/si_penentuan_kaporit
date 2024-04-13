let dbAdmin = require('../../models/adminModel.js')
let dbHasilKaporit = require('../../models/hasilKaporitModel.js')
module.exports = {
getDasbor: (req, res) => {
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
    let klorinMinggu = 0
    let klorinSenin = 0
    let klorinSelasa = 0
    let klorinRabu = 0
    let klorinKamis = 0
    let klorinJumat = 0
    let klorinSabtu = 0

    let kaporitMinggu = 0
    let kaporitSenin = 0
    let kaporitSelasa = 0
    let kaporitRabu = 0
    let kaporitKamis = 0
    let kaporitJumat = 0
    let kaporitSabtu = 0

    // bulan ini
    dbHasilKaporit.find({bulanInt: bulanInt, tahunInt: tahunInt}, (err, resultBulanIni) => {
    if(err) {console.log(err)}
    else {
    let iMinggu = 0
    let iSenin = 0
    let iSelasa = 0
    let iRabu = 0
    let iKamis = 0
    let iJumat = 0
    let iSabtu = 0
    let jMinggu = 0
    let jSenin = 0
    let jSelasa = 0
    let jRabu = 0
    let jKamis = 0
    let jJumat = 0
    let jSabtu = 0
    if(resultBulanIni.length > 0) {
        resultBulanIni.forEach((data) => {
        rerataKlorinBulanIni += data.kadarKlorin
        kaporitBulanIni += data.zTotal
        // filter klorin per hari
        if(data.hariString == 'minggu') {
            klorinMinggu += data.kadarKlorin
            iMinggu++
        }
        if(data.hariString == 'senin') {
            klorinSenin += data.kadarKlorin
            iSenin++
        }
        if(data.hariString == 'selasa') {
            klorinSelasa += data.kadarKlorin
            iSelasa++
        }
        if(data.hariString == 'rabu') {
            klorinRabu += data.kadarKlorin
            iRabu++
        }
        if(data.hariString == 'kamis') {
            klorinKamis += data.kadarKlorin
            iKamis++
        }
        if(data.hariString == 'jumat') {
            klorinJumat += data.kadarKlorin
            iJumat++
        }
        if(data.hariString == 'sabtu') {
            klorinSabtu += data.kadarKlorin
            iSabtu++
        }
        // filter kaporit per hari
        if(data.hariString == 'minggu') {
            kaporitMinggu += data.zTotal
            jMinggu++
        }
        if(data.hariString == 'senin') {
            kaporitSenin += data.zTotal
            jSenin++
        }
        if(data.hariString == 'selasa') {
            kaporitSelasa += data.zTotal
            jSelasa++
        }
        if(data.hariString == 'rabu') {
            kaporitRabu += data.zTotal
            jRabu++
        }
        if(data.hariString == 'kamis') {
            kaporitKamis += data.zTotal
            jKamis++
        }
        if(data.hariString == 'jumat') {
            kaporitJumat += data.zTotal
            jJumat++
        }
        if(data.hariString == 'sabtu') {
            kaporitSabtu += data.zTotal
            jSabtu++
        }
        })
        rerataKlorinBulanIni /= resultBulanIni.length
        // grafik dasbor
        klorinMinggu /= iMinggu
        klorinSenin /= iSenin
        klorinSelasa /= iSelasa
        klorinRabu /= iRabu
        klorinKamis /= iKamis
        klorinJumat /= iJumat
        klorinSabtu /= iSabtu

        // kaporit
        kaporitMinggu /= jMinggu
        kaporitSenin /= jSenin
        kaporitSelasa /= jSelasa
        kaporitRabu /= jRabu
        kaporitKamis /= jKamis
        kaporitJumat /= jJumat
        kaporitSabtu /= jSabtu
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

    
    function limitDecimal(number, decimalPlaces) {
        return parseFloat(number.toFixed(decimalPlaces));
    }
    perbandinganKlorinHari = limitDecimal(perbandinganKlorinHari, 2)
    perbandinganKaporitHari = limitDecimal(perbandinganKaporitHari, 2)
    rerataKlorinBulanIni = limitDecimal(rerataKlorinBulanIni, 2)
    kaporitBulanIni = limitDecimal(kaporitBulanIni, 2)
    perbandinganKlorinBulan = limitDecimal(perbandinganKlorinBulan, 2)
    perbandinganKaporitBulan = limitDecimal(perbandinganKaporitBulan, 2)

    res.render('../views/admin/dasbor.ejs', {
        aktif: 'admin-dasbor',
        klorinHariIni: klorinHariIni,
        kaporitHariIni: kaporitHariIni,
        perbandinganKlorinHari: perbandinganKlorinHari,
        perbandinganKaporitHari: perbandinganKaporitHari,
        rerataKlorinBulanIni: rerataKlorinBulanIni,
        kaporitBulanIni: kaporitBulanIni,
        perbandinganKlorinBulan: perbandinganKlorinBulan,
        perbandinganKaporitBulan: perbandinganKaporitBulan,

        klorinMinggu: klorinMinggu,
        klorinSenin: klorinSenin,
        klorinSelasa: klorinSelasa,
        klorinRabu: klorinRabu,
        klorinKamis: klorinKamis,
        klorinJumat: klorinJumat,
        klorinSabtu: klorinSabtu,

        kaporitMinggu: kaporitMinggu,
        kaporitSenin: kaporitSenin,
        kaporitSelasa: kaporitSelasa,
        kaporitRabu: kaporitRabu,
        kaporitKamis: kaporitKamis,
        kaporitJumat: kaporitJumat,
        kaporitSabtu: kaporitSabtu,
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
}
}