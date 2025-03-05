let uploadedPhoto = '';

document.getElementById('photo').addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhoto = e.target.result;
            document.getElementById('photoPreview').src = uploadedPhoto;
            document.getElementById('photoPreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

function generateResume() {
    let name = document.getElementById('name').value;
    let position = document.getElementById('position').value;
    let experience = document.getElementById('experience').value;
    let education = document.getElementById('education').value;

    let resumeHTML = `
        ${uploadedPhoto ? `<img id="resumePhoto" class="resume-photo" src="${uploadedPhoto}">` : ''}
        <h3>${name}</h3>
        <p><strong>Желаемая должность:</strong> ${position}</p>
        <p><strong>Опыт работы:</strong> ${experience}</p>
        <p><strong>Образование:</strong> ${education}</p>
    `;

    document.getElementById('resumeOutput').innerHTML = resumeHTML;
    document.getElementById('downloadBtn').style.display = 'block';
    document.getElementById('emailBtn').style.display = 'block';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF('p', 'mm', 'a4');

    html2canvas(document.getElementById('resumeOutput')).then(canvas => {
        let imgData = canvas.toDataURL('image/png');
        let imgWidth = 190;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('resume.pdf');
    });
}

function sendEmail() {
    let email = document.getElementById('email').value;
    let resumeContent = document.getElementById('resumeOutput').innerText;
    let mailtoLink = `mailto:${email}?subject=Ваше резюме&body=${encodeURIComponent(resumeContent)}`;
    window.location.href = mailtoLink;
}
