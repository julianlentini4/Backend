import { createApp } from "./app.js";
//Import Models
import { EspecialidadModel } from "./modelsMysql/especialidadModel.js";
import { InternacionModel } from "./modelsMysql/internacionModel.js";
import { PacienteModel } from "./modelsMysql/pacienteModel.js";
import { SalaModel } from "./modelsMysql/salaModel.js";
//import {TurnoModel} from "./models/turnoModel.js"
import { InformeModel } from "./modelsMysql/informeModel.js";
import { Pte_IngresoModel } from "./modelsMysql/pte_IngresoModel.js";
import { MedicoModel } from "./modelsMysql/medicoModel.js";
import { IngresoModel } from "./modelsMysql/ingresoModel.js";
import { AgendaModel } from "./modelsMysql/agendaModel.js";
//import { DiaModel } from "./modelsMysql/diaModel.js";
//import { Dia_AgendaModel } from "./modelsMysql/dia_AgendaModel.js";
import { Medico_EspecialidadModel } from "./modelsMysql/medico_EspecialidadModel.js";
import { UsersModel } from "./modelsMysql/usersModel.js";

createApp({
    especialidadModel: EspecialidadModel,
    internacionModel: InternacionModel,
    pacienteModel: PacienteModel,
    salaModel: SalaModel,
    //turnoModel: TurnoModel,
    medicoModel: MedicoModel,
    informeModel: InformeModel,
    pte_IngresoModel: Pte_IngresoModel,
    ingresoModel: IngresoModel,
    agendaModel: AgendaModel,
    //diaModel: DiaModel,
    //dia_AgendaModel: Dia_AgendaModel, 
    medico_EspecialidadModel: Medico_EspecialidadModel,
    usersModel: UsersModel
}) 