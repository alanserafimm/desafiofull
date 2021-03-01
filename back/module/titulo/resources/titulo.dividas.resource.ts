import { GenericServices } from "../../../tools/generic/generic-services";
import { APIModeloDividas, ITituloDividas } from "../models/titulo.dividas.models";
import { mongoTitulo } from "../models/titulo.models";
import { isNullOrUndefined } from 'util';
import { ObjectId } from 'mongodb';


export class TituloDividasResources extends GenericServices {

    api: string = APIModeloDividas;

    constructor() {
        super();
        super.api = this.api;
    };

    public async register() {
        var listInsert: ITituloDividas[] = [];

        var response = await mongoTitulo.findOne({ devedor: "Fulano" });

        if (!isNullOrUndefined(response)) {
            listInsert.push(<ITituloDividas>{ number: 1, tituloId: String(response.id), dataVencimento: new Date("2020-07-10"), valor: 100 });
            listInsert.push(<ITituloDividas>{ number: 2, tituloId: String(response.id), dataVencimento: new Date("2020-08-10"), valor: 100 });
            listInsert.push(<ITituloDividas>{ number: 3, tituloId: String(response.id), dataVencimento: new Date("2020-09-10"), valor: 100 });

            for (let index = 0; index < listInsert.length; index++) {
                const element = listInsert[index];
                await this.InsertIfNotExist(element, { tituloId: element.tituloId, number: element.number });
            };


        };
    };

}

export const tituloDividasResources = new TituloDividasResources();