export type contact = {
    [key: string]: string | Date | number
    name: string,
    lastname: string,
    gender: string,
    birthdate: string,
    nid: string,
    telephone: string,
    email: string,
    address: string
};

export type Patient = {
    [key: string]: string | contact[] | boolean | Date | number
    id: string;
    name: string;
    lastname: string;
    factory_id: string;
    birthdate: string;
    gender: string;
    nid: string;
    hashnid: string;
    telephone: string;
    email: string;
    address: string;
    country: string;
    religion: string;
    qualification: string;
    access_house: boolean;
    access_water: boolean;
    access_police: boolean;
    medical_service: boolean;
    access_school: boolean;
    description: string;
    contacts: contact[];
};

export type ModifiedPatient = {
    id: string,
    result: string;
};
