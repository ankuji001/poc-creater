// Function to generate PDF
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Vulnerability Report", 10, 10);

    // Add input values
    const inputs = [
        { label: "Name of vulnerability", value: document.getElementById('input1').value },
        { label: "Summary of vulnerability", value: document.getElementById('input2').value },
        { label: "Steps to reduce", value: