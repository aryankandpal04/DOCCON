document.getElementById('uploadForm').addEventListener('submit', function(event) {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.value) {
        event.preventDefault();
        alert('Please select a file to upload.');
    }
});
 