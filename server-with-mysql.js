import { createApp } from "./app.js";
import { EspecialidadModel } from "./models/especialidadModel.js";
import { InternacionModel } from "./models/internacionModel.js";
import { PacienteModel } from "./models/pacienteModel.js";
import { SalaModel } from "./models/salaModel.js";
// import {TurnoModel}


createApp({
    especialidadModel: EspecialidadModel,
    internacionModel: InternacionModel,
    pacienteModel: PacienteModel,
    salaModel: SalaModel,
    //turnoModel: TurnoModel,
}) 