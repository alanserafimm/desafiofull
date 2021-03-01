

import { Injectable } from '@angular/core';
import { GenericServices } from 'src/tools/services/generic.services';
import { APIModelo, ITitulos } from './titulo.interfaces';


@Injectable({ providedIn: 'root' })
export class TituloResolver {
    constructor(public services: GenericServices<ITitulos>) { }

    resolve(): Promise<any> | any {
        return new Promise(async (resolve, reject) => {

            var formInicialize = await this.services.formInicialize(APIModelo);

            resolve(formInicialize);
        });
    }
}