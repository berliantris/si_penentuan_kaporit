let dbHasilKaporit = require('../models/hasilKaporitModel.js')
let dbAdmin = require('../models/adminModel.js')

module.exports = {
getLogIn: (req, res) => {
    res.render('../views/admin/logIn.ejs', {

    })
},
loginAdmin: (req, res) => {
    let username = req.body.username.trim()
    let password = req.body.password.trim()

    if(username != '' && password != '') {
    dbAdmin.find({username: username, password: password}, (err, dbAdminOutput) => {
        if(err) { console.log(err) }
        else {
        if(dbAdminOutput.length > 0) {
            req.session.idAdmin = dbAdminOutput[0]._id
            res.redirect('/admin-dasbor')
        }
        else {
            res.redirect('/admin-login')
        }
        }
    })
    }
    else {
    res.redirect(`/admin-login`)
    }
},
getProfil: (req, res) => {
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
    
    function limitDecimal(number, decimalPlaces) {
        return parseFloat(number.toFixed(decimalPlaces));
    }
    perbandinganKlorinHari = limitDecimal(perbandinganKlorinHari, 2)
    perbandinganKaporitHari = limitDecimal(perbandinganKaporitHari, 2)
    rerataKlorinBulanIni = limitDecimal(rerataKlorinBulanIni, 2)
    kaporitBulanIni = limitDecimal(kaporitBulanIni, 2)
    perbandinganKlorinBulan = limitDecimal(perbandinganKlorinBulan, 2)
    perbandinganKaporitBulan = limitDecimal(perbandinganKaporitBulan, 2)

    res.render('../views/admin/profil.ejs', {
    aktif: 'admin-profil',
    klorinHariIni: klorinHariIni,
    kaporitHariIni: kaporitHariIni,
    perbandinganKlorinHari: perbandinganKlorinHari,
    perbandinganKaporitHari: perbandinganKaporitHari,
    rerataKlorinBulanIni: rerataKlorinBulanIni,
    kaporitBulanIni: kaporitBulanIni,
    perbandinganKlorinBulan: perbandinganKlorinBulan,
    perbandinganKaporitBulan: perbandinganKaporitBulan,
    id: dbAdminOutput[0]._id,
    namaLengkap: dbAdminOutput[0].namaLengkap,
    username: dbAdminOutput[0].username,
    email: dbAdminOutput[0].email,
    password: dbAdminOutput[0].password,
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
updateProfil: (req, res) => {
    if(req.session.idAdmin != null) {
    dbAdmin.find({_id: req.session.idAdmin}, (err, dbAdminOutput) => {
        if(err){console.log(err)}
        else {
            if(dbAdminOutput.length > 0) {
                let id = req.body.id
                let namaLengkap = req.body.namaLengkap.trim()
                let username = req.body.username.trim()
                let email = req.body.email.trim()
                let password = req.body.password.trim()

    if(namaLengkap!='' && username!='' && email!='' &&password!='') {
    dbAdmin.updateOne({_id: id}, {
        namaLengkap: namaLengkap,
        username: username,
        email: email,
        password: password
    }, (err, result) => {
        if(err) { console.log(err) }
        else {
        res.redirect('/admin-profil')
        }
    })
    }
    else {
        res.redirect('/admin-profil')
    }
    
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
getTambahAdmin: (req, res) => {
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
    
        dbAdmin.find().sort({_id: -1}).exec((err, dbAdminOutput) => {
        if(err) {console.log(err)}
        else {
            function limitDecimal(number, decimalPlaces) {
                return parseFloat(number.toFixed(decimalPlaces));
            }
            perbandinganKlorinHari = limitDecimal(perbandinganKlorinHari, 2)
            perbandinganKaporitHari = limitDecimal(perbandinganKaporitHari, 2)
            rerataKlorinBulanIni = limitDecimal(rerataKlorinBulanIni, 2)
            kaporitBulanIni = limitDecimal(kaporitBulanIni, 2)
            perbandinganKlorinBulan = limitDecimal(perbandinganKlorinBulan, 2)
            perbandinganKaporitBulan = limitDecimal(perbandinganKaporitBulan, 2)
            
            res.render('../views/admin/tambahAdmin.ejs', {
            aktif: 'admin-tambah',
            klorinHariIni: klorinHariIni,
            kaporitHariIni: kaporitHariIni,
            perbandinganKlorinHari: perbandinganKlorinHari,
            perbandinganKaporitHari: perbandinganKaporitHari,
            rerataKlorinBulanIni: rerataKlorinBulanIni,
            kaporitBulanIni: kaporitBulanIni,
            perbandinganKlorinBulan: perbandinganKlorinBulan,
            perbandinganKaporitBulan: perbandinganKaporitBulan,
            
            data: dbAdminOutput
            })
        }
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
tambahAdmin: (req, res) => {
    if(req.session.idAdmin != null) {
    dbAdmin.find({_id: req.session.idAdmin}, (err, dbAdminOutput) => {
        if(err){console.log(err)}
        else {
            if(dbAdminOutput.length > 0) {
                let namaLengkap = req.body.namaLengkap.trim()
                let username = req.body.username.trim()
                let email = req.body.email.trim()
                let password = req.body.password.trim()

                if(namaLengkap!='' && username!='' && email!='' &&password!='') {
    dbAdmin.create({
        namaLengkap: namaLengkap,
        username: username,
        email: email,
        password: password
    }, (err, output) => {
        if(err) { console.log(err) }
        else {
        res.redirect('/admin-tambah')
        }
    })
                }
                else {
                res.redirect('/admin-tambah')
                }
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
hapusAdmin: (req, res) => {
    if(req.session.idAdmin != null) {
    dbAdmin.find({_id: req.session.idAdmin}, (err, dbAdminOutput) => {
        if(err){console.log(err)}
        else {
            if(dbAdminOutput.length > 0) {
                let id = req.body.id
    dbAdmin.deleteOne({_id: id}, (err) => {
    if(err) {console.log(err)}
    else {
        res.redirect('/admin-tambah')
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
},
logout: (req, res) => {
    req.session.destroy()
    res.redirect('/admin-login')
}
}