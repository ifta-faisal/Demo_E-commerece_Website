const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoice = (order, callback) => {
    const doc = new PDFDocument({ margin: 50 });

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        callback(null, pdfData);
    });

    // --- Helper Functions ---
    const generateHr = (y) => {
        doc.strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }

    const formatCurrency = (amount) => {
        return "Tk. " + parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 });
    }

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // --- Header ---
    const topOffset = 57;

    // Logo
    const logoPath = path.join(__dirname, '../../src/assets/logo.png');
    if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 45, { width: 150 });
    } else {
        doc.fontSize(20)
            .font('Helvetica-Bold')
            .text('RoboXpressbd', 50, 57);
    }

    // Company Info (Right aligned)
    doc.fontSize(10)
        .font('Helvetica-Bold')
        .text('RoboXpressbd', 200, 50, { align: 'right' })
        .font('Helvetica')
        .text('Sayed Nagar, Vatara, Dhaka-1212, Bangladesh', 200, 65, { align: 'right' })
        .moveDown();

    // --- Invoice Title ---
    // Moved down further to avoid overlapping with larger logos
    doc.fontSize(25)
        .font('Helvetica-Bold')
        .text('INVOICE', 50, 190);

    // --- Billing & Invoice Details ---
    const detailsTop = 230;

    // Column 1: Customer Details
    doc.fontSize(10)
        .font('Helvetica')
        .text(`${order.billingDetails?.firstName || ''} ${order.billingDetails?.lastName || ''}`, 50, detailsTop)
        .text(order.billingDetails?.companyName || '', 50, detailsTop + 15)
        .text(order.billingDetails?.streetAddress || '', 50, detailsTop + 30)
        .text(order.billingDetails?.apartment ? order.billingDetails?.apartment : '', 50, detailsTop + 45) // Optional line
        .text(`${order.billingDetails?.city || ''}${order.billingDetails?.city && order.billingDetails?.zip ? ', ' : ''}${order.billingDetails?.zip || ''}`, 50, detailsTop + 60)
        .text(order.billingDetails?.country || 'Bangladesh', 50, detailsTop + 75)
        .text(order.billingDetails?.email || '', 50, detailsTop + 90)
        .text(order.billingDetails?.phone || '', 50, detailsTop + 105);

    // Column 2: Order Details (Right aligned labels and values to look like the image)
    const col2Left = 350;
    const col2Value = 450;

    // Use the serial orderId if available, fall back to short _id if not
    // Handle both number and string types for orderId
    const displayOrderId = order.orderId ? order.orderId.toString() : order._id.toString().slice(-6).toUpperCase();

    const invoiceRows = [
        { label: 'Invoice Number:', value: displayOrderId },
        { label: 'Invoice Date:', value: formatDate(new Date()) },
        { label: 'Order Number:', value: displayOrderId },
        { label: 'Order Date:', value: formatDate(order.createdAt) },
        { label: 'Payment Method:', value: order.paymentMethod || 'N/A' }
    ];

    let rowY = detailsTop;
    invoiceRows.forEach(row => {
        doc.font('Helvetica')
            .text(row.label, col2Left, rowY)
            .font('Helvetica') // Value
            .text(row.value, col2Value, rowY);
        rowY += 15;
    });

    // --- Items Table ---
    const tableTop = 330;

    // Table Header
    doc.rect(50, tableTop, 500, 25).fill('#000000'); // Black header bg
    doc.fillColor('#ffffff')
        .font('Helvetica-Bold')
        .text('Product', 60, tableTop + 7)
        .text('Quantity', 350, tableTop + 7)
        .text('Price', 450, tableTop + 7);

    doc.fillColor('#000000'); // Reset text color

    let y = tableTop + 35;

    order.items.forEach(item => {
        doc.font('Helvetica')
            .text(item.name, 60, y, { width: 280 })
            .text(item.quantity, 350, y)
            .text(formatCurrency(item.price), 450, y);

        y += 25; // Adjust based on text wrap if needed, simple for now
        generateHr(y);
        y += 10;
    });

    // --- Totals ---
    const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = order.shippingCost || 0;
    const total = subtotal + shipping;
    // Estimated tax logic from checkout page (just a display note)
    const taxNote = "(includes Tk. 132.56 Tax)";

    // Helper for totals row
    const totalsLeft = 350;
    const totalsValue = 450;

    y += 10;

    doc.font('Helvetica-Bold').text('Subtotal', totalsLeft, y);
    doc.font('Helvetica').text(formatCurrency(subtotal), totalsValue, y);
    generateHr(y + 15);
    y += 25;

    doc.font('Helvetica-Bold').text('Shipping', totalsLeft, y);
    doc.font('Helvetica').text(`${formatCurrency(shipping)} via ${order.shippingMethod || 'Standard'}`, totalsValue, y, { width: 100 });
    generateHr(y + 35); // More space for potential 2-line shipping text
    y += 45;

    doc.fontSize(12)
        .font('Helvetica-Bold').text('Total', totalsLeft, y)
        .text(formatCurrency(total), totalsValue, y);

    doc.fontSize(8)
        .font('Helvetica')
        .text(taxNote, totalsValue, y + 15);

    doc.end();
};

module.exports = generateInvoice;
