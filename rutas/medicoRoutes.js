const express = require('express')
const { getMedicos, getMedicoByMatricula, createMedico, updateMedico, deleteMedico} = require('./medicoController')
//express router
const router = express.Router()

//routes

//GET ALL MEDICOS
router.get('/getall',getMedicos)
//GET MEDICO BY ID
router.get('/getMedico/:matricula',getMedicoByMatricula)
//CREATE NEW MEDICO
router.post('/create',createMedico)
//UPDATE MEDICO
router.put('/update',updateMedico)
//DELETE MEDICO
router.delete('/delete',deleteMedico)

module.exports = router