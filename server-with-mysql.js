import { createApp } from "./app.js";
import { InformeModel } from "./modelsMysql/informeModel.js";
import { Pte_IngresoModel } from "./modelsMysql/pte_IngresoModel.js";
import { MedicoModel } from "./modelsMysql/medicoModel.js";
import { IngresoModel } from "./modelsMysql/ingresoModel.js";
import { AgendaModel } from "./modelsMysql/agendaModel.js";
import { DiaModel } from "./modelsMysql/diaModel.js";


createApp({
    medicoModel: MedicoModel,
    informeModel: InformeModel,
    pte_IngresoModel: Pte_IngresoModel,
    ingresoModel: IngresoModel,
    agendaModel: AgendaModel,
    diaModel: DiaModel
}) 