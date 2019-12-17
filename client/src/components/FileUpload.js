import React, {Fragment, useState} from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [text, setText] = useState('');

    const onFileChange = e => setFile(e.target.files[0]);

    const onTextChange = e => {
        setText(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('nested1[nested2][text]', text);
		
        try {
            const res = await axios.post('https://localhost:44395/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res);
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} /><br />
                <input type="text" onChange={onTextChange} /><br />
                <input type="submit" value="submit!"></input> <br/>
            </form>
        </Fragment>
    );
};

export default FileUpload;