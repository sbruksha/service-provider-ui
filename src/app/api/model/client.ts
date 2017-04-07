
export interface Client {
    givenName: string;

    surname: string;

    gender: string;

    streetAddress?: string;

    city?: string;

    country?: number;

    province?: number;

    zipCode?: string;

    email?: string;

    phone?: string;

    dateOfBirth: Date;

    svn: number;

    id?: number;

}
