import React, { useState } from "react";
import axios from "axios";

interface Props {
    postId: string;
}

export const CommentCreate: React.FC<Props> = ({postId}) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        await axios.post(`http://blog.local/posts/${postId}/comments`, {
            content
        });
        setContent('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className='form-control my-2'
                    />
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    );
};
