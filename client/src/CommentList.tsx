import React from "react";
import { Comment } from "./types";


interface Props {
    comments: Comment[];
}

export const CommentList: React.FC<Props> = ({comments}) => {
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};
