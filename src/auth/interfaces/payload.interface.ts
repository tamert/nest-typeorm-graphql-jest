import { Role } from '../enums';

export interface Payload {
    readonly id: number,
    readonly firstName: string, 
    readonly lastName: string,
    readonly email: string,
    readonly registryId: string,
    readonly titleCode: string,
    readonly title: string,
    readonly avatar: string,
    readonly isActive: boolean,
    readonly roles: Role[];
}