
export interface Appointment {
    title?: string;

    description?: string;

    start?: Date;

    end?: Date;

    /**
     * This field allows the auto-appointment service to block appointments.
     */
    autoAppointmentBlockedSecret?: string;

    id?: number;

    created: Date;

    modified: Date;

    createdBy: number;

    modifiedBy: number;

    clientId?: number;

    providerId?: number;

    services?: any;

}
