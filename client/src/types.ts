export interface Comment {
    id: string;
    content: string;
}

export interface Post {
    id: string;
    title: string;
    comments: Comment[];
}
