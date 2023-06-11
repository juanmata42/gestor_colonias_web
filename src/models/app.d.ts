export type langApp = {
    name: string;
    header_title: string;
    short_header: string;
    tool_name: string;
    language: string;
};

export type treeApp = {
    tree_id: string;
    order: number;
};

export type ModifiedApp = {
    id: string,
    result: string;
};

export type App = {
    [key: string]: string | langApp[] | boolean | undefined | treeApp[] | Express.Multer.File
    id: string,
    image?: Express.Multer.File;
    active: boolean;
    color: string;
    report: boolean;
    route_patients_page: string;
    route_page: string;
    component: string;
    lang: langApp[];
    tree_list: treeApp[];
};
