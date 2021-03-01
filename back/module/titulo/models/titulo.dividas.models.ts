
import mongoose from 'mongoose';

export const APIModeloDividas = "titulos-dividas";

export interface ITituloDividas extends mongoose.Document {
    number: number;
    tituloId: string;
    dataVencimento: Date;
    valor: number;
};

export const SMTituloDividas = new mongoose.Schema({
    tituloId: { type: 'String'},
    number: { type: 'Number'},
    dataVencimento: { type: 'Date' },
    valor: { type: 'Number' },
}, { versionKey: false });

export const mongoTituloDividas = mongoose.model(APIModeloDividas, SMTituloDividas);