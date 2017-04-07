
import { NotificationTransport } from './notificationTransport';


export interface Notification {
    contentText?: string;

    contentHtml?: string;

    subject?: string;

    schedule: any;

    transports: Array<NotificationTransport>;

    data?: any;

    done?: boolean;

    id?: number;

    clientId?: number;

    appointmentId?: number;

}
