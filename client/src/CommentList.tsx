import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface comment {
    id: string;
    content: string;
}

interface Props {
    comments: comment[];
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
