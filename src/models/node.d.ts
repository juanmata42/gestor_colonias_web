import { child } from './child';
import { languageDiag } from './diagnostic';

export type node = {
    [key: string]: string | object | number | undefined;
    id: string;
    prevID?: string;
    score: number;
    interval?: {
        max: number;
        min: number;
    };
    range?: number;
    type: string;
    category: string;
    table?: number[];
    image?: Express.Multer.File;
    tree_id: string;
    // eslint-disable-next-line no-use-before-define
    language: language[];
    children?: child[];
    ref?: string;
    created_at: string;
    updated_at?: string;
};

export type language = languageDiag & {
    description?: string;
    subtitle?: string;
    info?: string;
    help?: string;
    legend?: string;
    examples?: node[];
};

export type fullNode = {
    [key: string]: string | object | number | undefined;
    id: string;
    title?: string;
    prevID?: string;
    score: number;
    interval?: {
        max: number;
        min: number;
    };
    range?: number;
    type: string;
    category: string;
    table?: number[];
    image?: Express.Multer.File;
    tree_id: string;
    language: language[];
    children?: fullNode[] | child[];
    ref?: string;
};

export type ModifiedNode = {
    id: string;
    result: string;
};
