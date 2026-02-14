import React, { useState } from 'react';
import CsvUpload from './CsvUpload';
import OtpAuth from './OtpAuth';
import InvoiceDemo from './InvoiceDemo';

const AdminPanel = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left', padding: '20px' }}>
            <h2>Admin Panel</h2>
            <OtpAuth />
            <CsvUpload />
            <InvoiceDemo />
        </div>
    );
};

export default AdminPanel;
