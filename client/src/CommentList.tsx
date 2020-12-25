import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface comment {
    id: string;
    content: string;
}

interface Props {
    postId: string;
}

export const CommentList: React.FC<Props> = ({postId}) => {
    const [comments, setComments] = useState<comment[]>([]);

    const fetchComments = async () => {
        const res: AxiosResponse = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }

    useEffect(() => {
        fetchComments();
    }, [])

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};
