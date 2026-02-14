import React, { useState } from 'react';
import axios from 'axios';

const CsvUpload = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setStatus('Uploading...');
            const response = await axios.post('http://localhost:5000/api/products/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setStatus(`Success: ${response.data.message} (${response.data.count} products)`);
        } catch (error) {
            console.error(error);
            setStatus('Upload failed. See console for details.');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
            <h3>Bulk Product Upload (CSV)</h3>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default CsvUpload;
