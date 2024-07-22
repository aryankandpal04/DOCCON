// image file
function convertImage() {
    const imageFileInput = document.getElementById('imageFileInput');
    const imageExtensionSelect = document.getElementById('imageExtensionSelect');
    const imageOutput = document.getElementById('imageOutput');
    const imagePreview = document.getElementById('imagePreview');
    const downloadImageLink = document.getElementById('downloadImage');
    
    const file = imageFileInput.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }
    
    const selectedExtension = imageExtensionSelect.value;
    
    // Check if the selected extension is the same as the current extension
    const currentExtension = file.name.split('.').pop();
    if (currentExtension === selectedExtension.slice(1)) {
        alert('Please select a different extension.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageDataURL = event.target.result;
        imagePreview.src = imageDataURL;
        
        // Create a new file name with the selected extension
        const newFileName = file.name.replace(/\.[^.]+$/, selectedExtension);
        
        // Create a new file object with the updated name and type
        const convertedFile = new File([file], newFileName, { type: `image/${selectedExtension.slice(1)}` });
        
        // Create a download link for the converted image
        downloadImageLink.href = URL.createObjectURL(convertedFile);
        downloadImageLink.setAttribute('download', newFileName);
        downloadImageLink.style.display = 'block';
    };
    reader.readAsDataURL(file);
}
// Function to convert audio file
function convertAudio() {
    const audioFileInput = document.getElementById('audioFileInput');
    const audioExtensionSelect = document.getElementById('audioExtensionSelect');
    const audioOutput = document.getElementById('audioOutput');
    const audioPreview = document.getElementById('audioPreview');
    const downloadAudioLink = document.getElementById('downloadAudio');
    
    const file = audioFileInput.files[0];
    if (!file) {
        alert('Please select an audio file.');
        return;
    }
    
    const selectedExtension = audioExtensionSelect.value;
    
    // Check if the selected extension is the same as the current extension
    const currentExtension = file.name.split('.').pop();
    if (currentExtension === selectedExtension.slice(1)) {
        alert('Please select a different extension.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const audioDataURL = event.target.result;
        audioPreview.src = audioDataURL;
        
        // Create a new file name with the selected extension
        const newFileName = file.name.replace(/\.[^.]+$/, selectedExtension);
        
        // Create a new file object with the updated name and type
        const convertedFile = new File([file], newFileName, { type: `audio/${selectedExtension.slice(1)}` });
        
        // Create a download link for the converted audio
        downloadAudioLink.href = URL.createObjectURL(convertedFile);
        downloadAudioLink.setAttribute('download', newFileName);
        downloadAudioLink.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Function to convert video file
function convertVideo() {
    const videoFileInput = document.getElementById('videoFileInput');
    const videoExtensionSelect = document.getElementById('videoExtensionSelect');
    const videoOutput = document.getElementById('videoOutput');
    const videoPreview = document.getElementById('videoPreview');
    const downloadVideoLink = document.getElementById('downloadVideo');
    
    const file = videoFileInput.files[0];
    if (!file) {
        alert('Please select a video file.');
        return;
    }
    
    const selectedExtension = videoExtensionSelect.value;
    
    // Check if the selected extension is the same as the current extension
    const currentExtension = file.name.split('.').pop();
    if (currentExtension === selectedExtension.slice(1)) {
        alert('Please select a different extension.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const videoDataURL = event.target.result;
        videoPreview.src = videoDataURL;
        
        // Create a new file name with the selected extension
        const newFileName = file.name.replace(/\.[^.]+$/, selectedExtension);
        
        // Create a new file object with the updated name and type
        const convertedFile = new File([file], newFileName, { type: `video/${selectedExtension.slice(1)}` });
        
        // Create a download link for the converted video
        downloadVideoLink.href = URL.createObjectURL(convertedFile);
        downloadVideoLink.setAttribute('download', newFileName);
        downloadVideoLink.style.display = 'block';
    };
    reader.readAsDataURL(file);
}