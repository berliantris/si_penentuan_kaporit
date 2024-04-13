let dbKlorin = require('../models/klorinModel.js')
let dbKaporit = require('../models/kaporitModel.js')
let dbHasilKaporit = require('../models/hasilKaporitModel.js')

module.exports = {
getHitungKaporit: (req, res) => {
  res.render('../views/staf/staf.ejs', {
    
  });
},

hasilHitungKaporit: (req, res) => {
    let klorin = req.body.klorin
    dbKlorin.find().sort({_id: -1}).exec((err, dbKlorinOutput) => {
    if(err){console.log(err)}
    else {
        let alpha
        // mencari nilai alpha untuk himpunan klorin rendah
        function himpunanRendah() {
        if(klorin >= dbKlorinOutput[0].himpunanRendah.max) {
            alpha = 0
            return alpha
        }
        else if(klorin <= dbKlorinOutput[0].himpunanRendah.min) {
            alpha = 1
            return alpha
        }
        else {
            alpha = (dbKlorinOutput[0].himpunanRendah.max - klorin)/(dbKlorinOutput[0].himpunanRendah.max - dbKlorinOutput[0].himpunanRendah.min)
            return alpha
        }
        }

        // mencari nilai alpha untuk himpunan klorin normal
        function himpunanNormal() {
        if(klorin <= dbKlorinOutput[0].himpunanNormal.min) {
            alpha = 0
            return alpha
        }
        else if(klorin >= dbKlorinOutput[0].himpunanNormal.max) {
            alpha = 1
            return alpha
        }
        else {
            alpha = (klorin - dbKlorinOutput[0].himpunanNormal.min)/(dbKlorinOutput[0].himpunanNormal.max - dbKlorinOutput[0].himpunanNormal.min)
            return alpha
        }
        }

        // deklarasi
        let alphaRendah = himpunanRendah()
        let alphaNormal = himpunanNormal()
        
        dbKaporit.find().sort({_id: -1}).exec((err, dbKaporitOutput) => {
        if(err){console.log(err)}
        else {
        // R1
        // IF klorin Rendah THEN kaporit Banyak (mencari nilai z kaporit himpunan banyak)
        function z1() {
        let z
        if(alphaRendah == 0) {
            z = dbKaporitOutput[0].himpunanBanyak.min
            return z
        }
        else if(alphaRendah == 1) {
            z = dbKaporitOutput[0].himpunanBanyak.max
            return z
        }
        else {
            z = ((dbKaporitOutput[0].himpunanBanyak.max - dbKaporitOutput[0].himpunanBanyak.min) * alphaRendah) + dbKaporitOutput[0].himpunanBanyak.min
            return z
        }
        }

        // R2
        // IF klorin Normal THEN kaporit Sedikit (mencari nilai z kaporit himpunan sedikit)
        function z2() {
        let z
        if(alphaNormal == 0) {
            z = dbKaporitOutput[0].himpunanSedikit.max
            return z
        }
        else if(alphaNormal == 1) {
            z = dbKaporitOutput[0].himpunanSedikit.min
            return z
        }
        else {
            z = ((dbKaporitOutput[0].himpunanSedikit.max - dbKaporitOutput[0].himpunanSedikit.min) * alphaNormal) - dbKaporitOutput[0].himpunanSedikit.max
            return Math.abs(z)
        }
        }
        
        // deklarasi
        let z1Hasil= z1()
        let z2Hasil= z2()
        // let z3Hasil= z3()
        
        // Defuzzifikasi
        function defuzzifikasi() {
            let zTotal = ((alphaRendah*z1Hasil)+(alphaNormal*z2Hasil))/(alphaRendah+alphaNormal)
                return zTotal
            }
        let defuzzifikasiHasil = defuzzifikasi()

        // membbatasi 2 angka dibelakang koma
        function limitDecimal(number, decimalPlaces) {
            return parseFloat(number.toFixed(decimalPlaces));
        }
        // let a1String = alphaRendah.toString()
        // let alpha1 = Number(a1String.slice(0,5))
        let alpha1 = limitDecimal(alphaRendah, 2)
        let alpha2 = limitDecimal(alphaNormal, 2)
        let z1Result = limitDecimal(z1Hasil, 2)
        let z2Result = limitDecimal(z2Hasil, 2)
        let dResult = limitDecimal(defuzzifikasiHasil, 2)

        res.render('../views/staf/hasilHitungKaporit.ejs', {
        klorin: klorin,
        alpha: {
            a1: alpha1,
            a2: alpha2
        },
        z: {
            z1: z1Result,
            z2: z2Result
        },
        zTotal: dResult
        })
    }
    })
    }
    })
},

simpanHasilHitungKaporit: (req, res) => {
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

    let namaStaf = req.body.namaStaf.trim()
    let kadarKlorin = req.body.kadarKlorin
    let a1 = parseFloat(req.body.a1)
    let a2 = parseFloat(req.body.a2)
    let z1 = req.body.z1
    let z2 = req.body.z2
    let zTotal = req.body.zTotal

    dbHasilKaporit.create({
        namaStaf: namaStaf,
        kadarKlorin: kadarKlorin,
        aturanFuzzy1: {
            k1: a1,
            aPredikat: a1,
            zHasil: z1
        },
        aturanFuzzy2: {
            k1: a2,
            aPredikat: a2,
            zHasil: z2
        },
        alphaTotal: a1+a2,
        zTotal: zTotal,
        tanggalInt: tanggalInt,
        hariInt: hariInt,
        hariString: hariString,
        mingguInt: mingguInt,
        bulanInt: bulanInt,
        bulanString: bulanString,
        tahunInt: tahunInt

    }, (err, result) => {
        if(err) { console.log(err) }
        else {
            res.redirect('/hitung-kaporit')
        }
    })
    }
}