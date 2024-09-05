import { createApp } from "./app.js";
import { InformeModel } from "./modelsMysql/informeModel.js";
import { IngresoModel } from "./modelsMysql/ingresoModel.js";
import { MedicoModel } from "./modelsMysql/medicoModel.js";

createApp({
    medicoModel: MedicoModel,
    informeModel: InformeModel,
    ingresoModel: IngresoModel
})