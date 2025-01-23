export interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        id: string;
        summary: string;
        start: { dateTime: string };
        end: { dateTime: string };
        location?: string;
        hangoutLink?: string;
        description?: string;
    } | null;
}

export interface Event {
    id: string;
    summary: string;
    start: { dateTime: string };
    end: { dateTime: string };
    location?: string;
    hangoutLink?: string;
    description?: string;
}

export interface EventNotifierProps {
  events: Event[];
}

export interface UserInfo {
    name: string;
    email: string;
    image: string;
  }

export interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
  }