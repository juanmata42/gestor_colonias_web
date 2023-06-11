export type Action = {
    title: string,
    onClick: (item: any) => any,
    to: (item: any) => string,
}

export type TableActions = {
    read?: Action;
    edit?: Action;
    permissions?: Action;
    delete?: Action;
}
