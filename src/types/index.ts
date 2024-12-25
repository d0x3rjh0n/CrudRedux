export interface Client {
    id: string
    name: string
    email: string
    age: number
    phone: string
}

export interface Project {
    id: string
    name: string
    description: string
    priority: string
    budget: number
    categorie: string
    capacity: number
    progress: number
    status: boolean,
    clients: Client[]
}

export interface Goal {
    id: string
    name: string
}

export interface Categorie {
    id: string
    name: string
}

export interface IdClient{
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

export interface PatchStatusProject {
    status: boolean
}

export interface PatchProgressProject {
    progress : number
}