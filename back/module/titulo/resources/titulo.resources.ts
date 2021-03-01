import { GenericServices } from "../../../tools/generic/generic-services";
import { APIModelo, ITitulo } from "../models/titulo.models";


export class TituloResources extends GenericServices {

    api: string = APIModelo;

    constructor() {
        super();
        super.api = this.api;
    };

    public async register() {
        var listInsert: ITitulo[] = [];

        listInsert.push(<ITitulo>{ titulo: 101010, devedor: "Fulano", cpf: "99999999999", valororiginal: 0, valoratualizado: 0, multa: 2, juros: 1 });

        for (let index = 0; index < listInsert.length; index++) {
            const element = listInsert[index];
            await this.InsertIfNotExist(element, { titulo: element.titulo })
        };
    };

}

export const tituloResources = new TituloResources();