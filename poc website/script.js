

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
