export interface ArrayData {
    id: number;
    [ key: string ]: string | number | boolean | object | undefined 
}

export interface Client extends ArrayData {
    id: number
    name: string
    email: string
    age: number
    phone: string
}

export interface Id{
    id:  number
}

export interface ModalType {
    value: boolean
}