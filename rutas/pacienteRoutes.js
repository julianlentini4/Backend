const express = require('express')
const { getPacientes, getPacienteById, postPaciente, updatePaciente, deletePaciente } = require('../controladores/pacienteController')
//express router
const router = express.Router()

//routes
router.get('/getall',getPacientes)
router.get('/getid/:id',getPacienteById)
router.post('/post', postPaciente)
router.put('/update/:id',updatePaciente)
router.delete('/delete/:id',deletePaciente)


module.exports = router