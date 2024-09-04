import { createApp } from "./app.js";
import { InformeModel } from "./modelsMysql/informeModel.js";
import { MedicoModel } from "./modelsMysql/medicoModel.js";

createApp({
    medicoModel: MedicoModel,
    informeModel: InformeModel
})