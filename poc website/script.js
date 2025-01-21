// Function to handle text wrapping for PDF
function addWrappedText(doc, text, x, y, maxWidth) {
    const textLines = doc.splitTextToSize(text, maxWidth);
    doc.text(textLines, x, y);
    return (textLines.length * doc.getLineHeight()) + y;
}

// Function to generate PDF
function generatePDF() {
    try {
        // Get user input values and sanitize them
        const inputs = {
            'Name of Vulnerability': document.getElementById('input1').value,
            'Summary of Vulnerability': document.getElementById('input2').value,
            'Steps to Reduce': document.getElementById('input3').value,
            'Technical Details': document.getElementById('input4').value,
            'Impact Assessment': document.getElementById('input5').value,
            'Evidence File': document.getElementById('input6').files[0]?.name || 'No file selected',
            'Environment Details': document.getElementById('input7').value
        };

        // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Set font size and initial position
        doc.setFontSize(16);
        doc.text('Vulnerability Report', 105, 20, { align: 'center' });
        
        // Set font size for content
        doc.setFontSize(12);
        
        // Add content to PDF with proper spacing and text wrapping
        let yPosition = 40;
        const margin = 20;
        const pageWidth = doc.internal.pageSize.width;
        const maxWidth = pageWidth - (margin * 2);

        // Add each input field to the PDF
        for (const [label, value] of Object.entries(inputs)) {
            // Add label
            doc.setFont(undefined, 'bold');
            doc.text(`${label}:`, margin, yPosition);
            
            // Add value with wrapping
            doc.setFont(undefined, 'normal');
            yPosition = addWrappedText(doc, value, margin, yPosition + 7, maxWidth);
            
            // Add spacing between sections
            yPosition += 10;

            // Check if we need a new page
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
        }

        // Add generation date
        const date = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.text(`Generated on: ${date}`, margin, doc.internal.pageSize.height - 10);

        // Save the PDF
        const fileName = `Vulnerability_Report_${inputs['Name of Vulnerability'].replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${date.replace(/\//g, '-')}.pdf`;
        doc.save(fileName);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF. Please try again.');
    }
}
    
    // Function to sanitize input and handle empty values
    function sanitizeInput(input) {
        return input?.trim() || 'N/A';
    }

    // Function to copy inputs as email template
    function copyAsEmailTemplate() {
        try {
            // Get and sanitize all input values
            const inputs = {};
            const fields = [
                'input1', 'input2', 'input3', 'input4', 
                'input5', 'input6', 'input7'
            ];
            
            fields.forEach(field => {
                const element = document.getElementById(field);
                if (!element) {
                    throw new Error(`Element with ID ${field} not found`);
                }
                // Special handling for file input
                if (field === 'input6' && element.files.length > 0) {
                    inputs[field] = element.files[0].name;
                } else if (field === 'input6') {
                    inputs[field] = 'No file selected';
                } else {
                    inputs[field] = sanitizeInput(element.value);
                }
            });

            // Create the email template text with proper formatting
            const emailTemplate = `Hi,

Here are the details you requested:

Name of Vulnerability: ${inputs.input1}
Summary of Vulnerability: ${inputs.input2}
Steps to Reduce: ${inputs.input3}
Technical Details: ${inputs.input4}
Impact Assessment: ${inputs.input5}
Evidence File: ${inputs.input6}
Environment Details: ${inputs.input7}

Best regards,`;

            // Modern approach to copy text
            if (!navigator.clipboard) {
                // Fallback for browsers that don't support clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = emailTemplate;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    showNotification('success', 'Email template copied to clipboard!');
                } catch (err) {
                    showNotification('error', 'Failed to copy template');
                    console.error('Fallback copying failed:', err);
                }
                
                document.body.removeChild(textArea);
            } else {
                // Use modern Clipboard API
                navigator.clipboard.writeText(emailTemplate)
                    .then(() => showNotification('success', 'Email template copied to clipboard!'))
                    .catch(err => {
                        showNotification('error', 'Failed to copy template');
                        console.error('Clipboard API failed:', err);
                    });
            }
        } catch (error) {
            showNotification('error', 'An error occurred while copying');
            console.error('Error in copyAsEmailTemplate:', error);
        }
    }

    // Function to show notification
    function showNotification(type, message) {
        // Check if notification container exists, if not create it
        let notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            document.body.appendChild(notificationContainer);
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.style.padding = '15px';
        notification.style.marginBottom = '10px';
        notification.style.borderRadius = '4px';
        notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        notification.style.color = 'white';
        notification.textContent = message;

        // Add notification to container
        notificationContainer.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
            if (notificationContainer.children.length === 0) {
                notificationContainer.remove();
            }
        }, 3000);
    }
    
