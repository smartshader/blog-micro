export enum Status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface Comment {
    id: string;
    content: string;
    status: Status;
}

export interface Post {
    id: string;
    title: string;
    comments: Comment[];
}
