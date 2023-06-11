import { child } from './child';
import { node } from './node';
import { Patient } from './patient';
import { relativeScore } from './relativeScore';

export type languageDiag = {
    [key: string]: string | node[] | undefined;
    lang: string;
    title: string;
    check_title: string;
};

export type nodeDiag = {
    [key: string]: string | object | number | undefined | boolean
    id: string,
    score?: number,
    interval?: {
        max: number;
        min: number;
    };
    bool?: boolean;
    type: string,
    category: string,
    img?: BinaryData;
    tree_id: string,
    language: languageDiag[],
    children?: child[],
}

export type Diagnostic = {
    [key: string]: string | object | number | undefined | boolean
    id: string,
    app_id: string,
    app_version: string;
    patient_id: string;
    doctor_id: string;
    doctor_name: string;
    doctor_lastname: string;
    factory_id: string;
    date: string;
    type: string;
    relScore?: relativeScore;
    score?: number;
    covid: boolean;
    status: boolean;
    result_doc?: Buffer;
    result?: nodeDiag[];
    steps?: nodeDiag[];
    images?: Express.Multer.File[];
    comments: string;
    patient?: Patient;
    finished_at?: string;
}

export type ModifiedDiagnostic = {
    id: string,
    result: string
}
