import React, { useState } from "react";
import axios from "axios";

export const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        await axios.post('http://blog.local/posts/create', {title});
        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='form-control my-2'
                    />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
};