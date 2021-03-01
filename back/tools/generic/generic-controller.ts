import * as Router from "koa-router";

import { GenericServices } from "./generic-services";
import { ObjectId } from 'mongodb';
import { isNullOrUndefined } from 'util';



export class GenericController<TModelo> {
    public api: string = "";

    service: GenericServices;

    constructor() {
        this.service = new GenericServices()
    };

    public applyRoutes(koaRouter: Router) {    

        koaRouter.post(`/${this.api}/datatable/filter`, async (ctx: any) => {
            var body = ctx.request.body;

            ctx.body = await this.service.filterDatatableDate(body[0]);
        });

        koaRouter.post(`/${this.api}/salvar`, async (ctx: any) => {
            var body = ctx.request.body;

            if (!isNullOrUndefined(body._id)) body._id = new ObjectId(body._id);

            ctx.body = await this.service.onSalvar(body, { _id: body._id });
        });

        koaRouter.get(`/${this.api}/forminicialize`, async (ctx: any) => {
            ctx.body = await this.service.formInicialize();
        });

        koaRouter.get(`/${this.api}/buscarum/:id`, async (ctx: any) => {
            var id = ctx.params.id;

            if (isNullOrUndefined(id)) return ctx.body = "Nenhum parâmetro informado!";

            ctx.body = await this.service.searchOne(new ObjectId(id));
        });

        koaRouter.get(`/${this.api}/delete/:id`, async (ctx: any) => {
            var id = ctx.params.id;

            if (isNullOrUndefined(id)) return ctx.body = "Nenhum parâmetro informado!";

            ctx.body = await this.service.delete(new ObjectId(id));
        });

        koaRouter.get(`/${this.api}/datatable`, async (ctx: any) => {
            ctx.body = await this.service.initDatatableDate();
        });      

    };

};

export const genericController = new GenericController();