import { tituloController } from "./module/titulo/controllers/titulo.controller";
import { tituloDividasController } from "./module/titulo/controllers/titulo.dividas.controller";
import { tituloDividasResources } from "./module/titulo/resources/titulo.dividas.resource";
import { tituloResources } from "./module/titulo/resources/titulo.resources";

export const routes = [
    tituloController,
    // tituloDividasController
]; 

export const routesResources = [
    tituloResources,
    tituloDividasResources
]; 
