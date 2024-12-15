export interface Client {
    id: string
    name: string
    email: string
    age: number
    phone: string
}

export interface Id{
    id:  string
}

export interface ModalType {
    value: boolean
}

export interface ValueCell {
    value: string
    cell: string
}


export interface ValidationResult {
    valid: boolean;
    error?: string;
}