export type errorLang = {
    title500: string,
    description500: string,
    title404: string,
    title401: string,
    title400: string,
    description404: string,
    description401: string,
    description400: string
    reason1400: string,
    reason2400: string,
    reason1401: string,
    reason2401: string,
    reason1404: string,
    reason2404: string,
    unknownStatus: string,
    back: string,
}

export type MainpageLang = {
    welcome: string,
    logout: string,
}

export type lang = {
    mainpage: mainpageLang;
    notFound: errorLang;
}
