

    // JavaScript function to generate PDF
    function generatePDF() {
        // Get user input values
        const input1 = document.getElementById('input1').value;
        const input2 = document.getElementById('input2').value;
        const input3 = document.getElementById('input3').value;
        const input4 = document.getElementById('input4').value;
        const input5 = document.getElementById('input5').value;
        const input6 = document.getElementById('input6').value;
        const input7 = document.getElementById('input7').value;

        // Create a new jsPDF instance
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text(`input1: ${input1}`, 10, 10);
        doc.text(`input2: ${input2}`, 10, 20);
        doc.text(`input3: ${input3}`, 10, 30);
        doc.text(`input4: ${input4}`, 10, 40);
        doc.text(`input5: ${input5}`, 10, 50);
        doc.text(`input6: ${input6}`, 10, 60);
        doc.text(`input7: ${input7}`, 10, 70);


        // Save the PDF
        doc.save('user-input.pdf');
    }
  // Create the email template text
        const emailTemplate = `
            Hi,

            Here are the details you requested:

            Input 1: ${input1}
            Input 2: ${input2}
            Input 3: ${input3}
            Input 4: ${input4}
            Input 5: ${input5}
            Input 6: ${input6}
            Input 7: ${input7}

            Best regards,
        `;

        // Copy the email template to the clipboard
        navigator.clipboard.writeText(emailTemplate).then(() => {
            alert('Email template copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

