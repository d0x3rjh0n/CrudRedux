export interface ArrayData {
    id: string;
    [ key: string ]: string | number | boolean | object | undefined 
}

export interface Client extends ArrayData {
    id: string
    name: string
    age: number
    email: string
}


