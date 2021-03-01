
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const APIModelo = "titulos";

export interface ITitulo extends mongoose.Document {
    titulo: number;
    devedor: string;
    cpf: string;
    valororiginal: number;
    valoratualizado: number;
    juros: number;
    multa: number;
};

export const SMTitulo = new mongoose.Schema({
    titulo: { type: 'Number' , unique: true},
    devedor: { type: 'String'},
    cpf: { type: 'String'},
    valororiginal: { type: 'Number'},
    valoratualizado: { type: 'Number'},
    juros: { type: 'Number'},
    multa: { type: 'Number'},
}, { versionKey: false });

export const mongoTitulo = mongoose.model(APIModelo, SMTitulo);