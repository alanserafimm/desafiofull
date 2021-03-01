import Router from "koa-router";
import { GenericController } from "../../../tools/generic/generic-controller";
import { APIModeloDividas } from "../models/titulo.dividas.models";
import { TituloDividasServices } from "../services/titulo.dividas.services";

export class TituloDividasController extends GenericController {
    public api: string = APIModeloDividas;


    service: TituloDividasServices;

    constructor() {
        super();
        this.service = new TituloDividasServices();
    };

    public applyRoutes(koaRouter: Router) {    
        super.applyRoutes(koaRouter);

        
    };

}

export const tituloDividasController = new TituloDividasController();