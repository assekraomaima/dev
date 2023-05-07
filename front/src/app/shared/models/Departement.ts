import {User} from "./User";
export interface Departement {
User:User;
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}