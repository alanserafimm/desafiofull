import Router from "koa-router";
import { GenericController } from "../../../tools/generic/generic-controller";
import { APIModelo } from "../models/titulo.models";
import { TituloServices } from "../services/titulo.services";

export class TituloController extends GenericController<TituloServices> {
    public api: string = APIModelo;

    service: TituloServices;

    constructor() {
        super();
        this.service = new TituloServices();
    };

    public applyRoutes(koaRouter: Router) {


        // super.applyRoutes(koaRouter);

        // this.applyRoutesSystem(koaRouter);


    };

}

export const tituloController = new TituloController();