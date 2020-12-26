import React from "react";
import { Comment, Status } from "./types";

interface Props {
    comments: Comment[];
}

export const CommentList: React.FC<Props> = ({comments}) => {
    const renderedComments = comments.map(comment => {
        let content;

        if (comment.status === Status.APPROVED)
            content = comment.content;

        if (comment.status === Status.PENDING)
            content = 'This comment is awaiting moderation';

        if (comment.status === Status.REJECTED)
            content = 'This comment has been rejected';

        return <li key={comment.id}>{content}</li>;
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};
