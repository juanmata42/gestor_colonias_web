export type languageChild = {
    lang: string;
    check_title: string;
};

export type child = {
    [key: string]: string | languageChild[] | number | undefined;
    child_id: string;
    language: languageChild[];
    order: number;
};
