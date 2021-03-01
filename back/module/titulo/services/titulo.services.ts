import { ICaptions, IDataTable, IDetail } from "../../../tools/generic/generic-interfaces";
import { GenericServices } from "../../../tools/generic/generic-services";
import { mongoTituloDividas } from "../models/titulo.dividas.models";
import { APIModelo } from "../models/titulo.models";
import { ObjectId } from 'mongodb';

export class TituloServices extends GenericServices {

    api: string = APIModelo;

    constructor() {
        super();
        super.api = this.api;
    }

    public formTitle() { return "Gestão de Títulos" };

    public async beforeInsert(obj: any) {

        obj['_id'] = new ObjectId(obj['_id']);



        obj['juros'] = Number(obj['juros']);
        obj['multa'] = Number(obj['multa']);
        obj['titulo'] = Number(obj['titulo']);
      

        return obj;
    };

    public formDataTable(): IDetail[] {
        var response: IDetail[] = [];

        response.push(<IDetail>{ name: "titulo", text: "Número do título" });
        response.push(<IDetail>{ name: "devedor", text: "Nome do devedor" });
        response.push(<IDetail>{ name: "valororiginal", text: "Valor original" });
        response.push(<IDetail>{ name: "qtparcelas", text: "Qtde de parcelas" });
        response.push(<IDetail>{ name: "valoratualizado", text: "Valor atualizado na data de hoje" });

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
        var id = String(obj._id).toString();

        var dadosDividas = await (await mongoTituloDividas.find({ tituloId: id }));


        await this.multiplyValues(obj, dadosDividas);

        obj["qtparcelas"] = dadosDividas.length;
        obj['valoratualizado'] = "R$ " + Number(obj['valoratualizado']).toFixed(2);
        obj['valororiginal'] = "R$ " + Number(obj['valororiginal']).toFixed(2);

        return obj;
    };

    private multiplyValues(obj: any, dadosDividas: any[]) {
        // var juros: number = 0;

        for (let index = 0; index < dadosDividas.length; index++) {
            var element = dadosDividas[index];

            var juros = (obj['juros'] / 30);

            var dias = this.calculeDay(element.dataVencimento, new Date());

            var divida = juros * dias;

            obj['valoratualizado'] += divida;
            obj['valororiginal'] += element.valor;
        };

        obj['valoratualizado'] += (obj['valororiginal'] + (obj['valororiginal'] * obj['multa'] / 100));
    };






}