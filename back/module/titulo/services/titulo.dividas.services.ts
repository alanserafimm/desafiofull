import { IDataTable, IDetail } from "../../../tools/generic/generic-interfaces";
import { GenericServices } from "../../../tools/generic/generic-services";
import { APIModeloDividas, mongoTituloDividas } from "../models/titulo.dividas.models";

export class TituloDividasServices extends GenericServices {

    api: string = APIModeloDividas;

    constructor() {
        super();
        super.api = this.api;
    }

    public async beforeInsert(obj: any) {

        obj['dataVencimento'] = new Date(obj['dataVencimento']);

        var response: any = await mongoTituloDividas.find({ tituloId: obj.tituloId }).sort({ number: -1 }).limit(1);

        if (response.length > 0) obj['number'] = (response[0].number + 1);
        else { obj['number'] = 1 }

        return obj;
    };



    public formDataTable(): IDetail[] {
        var response: IDetail[] = [];

        response.push(<IDetail>{ name: "dataVencimento", text: "Data vencimento" });
        response.push(<IDetail>{ name: "atraso", text: "Dias em atraso" });
        response.push(<IDetail>{ name: "valor", text: "Valor" });

        return response;
    };

    public formDataTableOptions(options: IDataTable): IDataTable {

        options.onEdit = true;
        options.onDelete = true;

        return options;
    };



    public async comandMongo() {
        var query = await this.searchAll({});

        return query;
    };

    public async convertData(obj: any) {

        var dias = this.calculeDay(obj.dataVencimento, new Date());


        obj['valor'] = "R$ " + Number(obj['valor']).toFixed(2);
        obj['atraso'] = dias + " dias em atraso";

        let date_ob = new Date(obj['dataVencimento']);

        let date = ("0" + date_ob.getDate()).slice(-2);

        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        let year = obj['dataVencimento'].getFullYear();

        obj['dataVencimento'] = year + "-" + month + "-" + date;

        return obj;
    };


}