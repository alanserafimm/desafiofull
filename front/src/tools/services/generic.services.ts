import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { configSystem } from '../config/config';
import { GenericControllers } from '../controllers/generic.controllers';
import { WidgetsServices } from '../widgets/widgets.services';

@Injectable()
export class GenericServices<TModelo> {

    api: string = "";

    constructor(public apiServices: GenericControllers, public widgetsServices: WidgetsServices) { };

    public get(api: string) {
        return new Promise(async (resolve, reject) => {
            var retorno = await this.apiServices.get(api);
            resolve(retorno);
        });
    };

    public post(api: string, obj: any[]) {
        return new Promise(async (resolve, reject) => {
            var retorno = await this.apiServices.post(api, obj);
            resolve(retorno);
        });
    };

    public getUrl(apiRoute: string) {
        return `http://${configSystem.url}:${configSystem.port}/${apiRoute}`;
    };

    public formInicialize(api: string) { return this.get(this.getUrl(api) + "/forminicialize"); };

    public filterDataTable(query: any[]) {
        return this.post(this.api + "/datatable/filter", query);
    };


    public async onEditar(id: string, formulario: FormGroup): Promise<boolean> {
        var response: any = await this.get(this.api + "/buscarum/" + id);

        if (!response.success) {
            this.widgetsServices.criaDialog("Error", response.message);
            return;
        };

        formulario.reset();

        formulario.patchValue(response.data);

        return true;
    };

    public async onDeletar(id: string, formulario: FormGroup): Promise<boolean> {
        var response: any = await this.get(this.api + "/delete/" + id);

        if (!response.success) {
            this.widgetsServices.criaDialog("Error", response.message);
            return;
        };

        this.widgetsServices.criaDialog("Sucesso", response.data);

        return true;
    };

    public async onSalvar(formulario: FormGroup): Promise<boolean> {
        var response: any = await this.post(this.api + "/salvar", formulario.value);

        console.log(response);

        if (!response.success) {
            this.widgetsServices.criaDialog("Error", "Ocorreu um erro ao tentar excluir, contate o administrador!");
            return false;;
        };

        formulario.reset();

        formulario.patchValue(response.data);

        return response;
    };

};