// Select the necessary elements
var upload = document.querySelector('.upload');
var download = document.querySelector('.download');
var hiddenButton = document.querySelector('#hidden-button');
var sliderInput = document.querySelector('#slider-input');
var inputValue = document.querySelector('.input-value');
var inputMetadata = document.getElementsByClassName('metadata')[0];
var outputMetadata = document.getElementsByClassName('metadata')[1];

// Function to update the slider position
sliderInput.oninput = function () {
    setSliderPosition(sliderInput.value);
};

// Function to handle upload button click
upload.onclick = function () {
    hiddenButton.click();
};

// Function to handle file selection
hiddenButton.onchange = () => {
    var file = hiddenButton.files[0];
    var url = URL.createObjectURL(file);
    var img = document.createElement('img');
    img.src = url;
    img.onload = function () {
        var w = img.width;
        var h = img.height;
        inputMetadata.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML = file.name;
        inputMetadata.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML = w + '/' + h;
        inputMetadata.getElementsByTagName('li')[2].getElementsByTagName('span')[0].innerHTML = ((file.size / 1024) / 1024).toFixed(2) + ' Mb';
        upload.setAttribute('filename', file.name);
        calculateValues(inputValue.value, w, h);
        inputValue.oninput = function () {
            calculateValues(inputValue.value, w, h);
        };
        document.querySelector('.bottom img').src = url;
    };
};

// Function to calculate values based on compression ratio
function calculateValues(v, w, h) {
    var outputQuality = ((100 - v) / 100);
    var outputWidth = w * outputQuality;
    var outputHeight = h * outputQuality;
    Compress(outputQuality, outputWidth, outputHeight);
}

// Function to compress the image
function Compress(q, w, h) {
    new Compressor(hiddenButton.files[0], {
        quality: q,
        width: w,
        height: h,
        success(result) {
            var url = URL.createObjectURL(result);
            document.getElementsByClassName('output')[0].style.display = 'block';
            document.getElementsByClassName('progress')[0].style.display = 'block';
            document.getElementsByClassName('preview-container')[0].style.display = 'block';
            document.querySelector('.top img').src = url;
            var img = document.createElement('img');
            img.src = url;
            img.onload = function () {
                var w = img.width;
                var h = img.height;
                outputMetadata.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML = ((((q * 100) - 99)) + ((q * 100) / 100) * 10).toFixed(0) + '%';
                outputMetadata.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML = w + '/' + h;
                outputMetadata.getElementsByTagName('li')[2].getElementsByTagName('span')[0].innerHTML = (result.size / 1024).toFixed(0) + ' Kb';
            };
            download.onclick = function () {
                var filename = upload.getAttribute('filename').split('.');
                var a = document.createElement('a');
                a.href = url;
                a.download = filename[0] + '-min.' + filename[1];
                a.click();
            };
        },
        error(err) {
            console.log(err.message);
        }
    });
}

// Function to set slider position
function setSliderPosition(value) {
    const topImageContainer = document.querySelector('.top');
    const sliderHandle = document.querySelector('.slider-handle');
    const width = topImageContainer.clientWidth;
    const handlePosition = (value / 100) * width;
    topImageContainer.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    sliderHandle.style.left = `${handlePosition}px`;
}

// Initialize slider position
document.addEventListener('DOMContentLoaded', function () {
    const previewContainer = document.querySelector('.preview-container');
    const sliderHandle = document.createElement('div');
    sliderHandle.classList.add('slider-handle');
    previewContainer.appendChild(sliderHandle);
    setSliderPosition(sliderInput.value);
});
