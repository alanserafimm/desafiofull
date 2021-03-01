

import { Injectable } from '@angular/core';
import { GenericServices } from 'src/tools/services/generic.services';
import { APIModeloDividas, ITitulosDividas } from './titulo-dividas.interfaces';


@Injectable({ providedIn: 'root' })
export class TituloDividasResolver {
    constructor(public services: GenericServices<ITitulosDividas>) { }

    resolve(): Promise<any> | any {
        return new Promise(async (resolve, reject) => {

            var formInicialize = await this.services.formInicialize(APIModeloDividas);

            resolve(formInicialize);
        });
    }
}