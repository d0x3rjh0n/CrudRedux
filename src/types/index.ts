export interface ArrayData {
    id: number;
    [ key: string ]: string | number | boolean | object | undefined 
}

export interface Client extends ArrayData {
    id: number
    name: string
    email: string
    country: object
}

export interface Id{
    id:  number
}