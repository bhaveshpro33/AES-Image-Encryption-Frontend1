console.log("JavaScript is running!");

const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');

console.log("Encrypt Button: ", encryptBtn);  // Check if button is detected
console.log("Decrypt Button: ", decryptBtn);

encryptBtn.addEventListener('click', function() {
    console.log("Encrypt Button Clicked!");
    handleImageProcessing('encrypt');
});

decryptBtn.addEventListener('click', function() {
    console.log("Decrypt Button Clicked!");
    handleImageProcessing('decrypt');
});

function handleImageProcessing(action) {
    const imageInput = document.getElementById('image').files[0];
    const keyInput = document.getElementById('key').value;

    if (!imageInput || !keyInput) {
        alert('Please upload an image and enter a key!');
        return;
    }

    console.log("Processing: ", action, " Key: ", keyInput);

    const formData = new FormData();
    formData.append('image', imageInput);
    formData.append('key', keyInput);

    const url = action === 'encrypt' ? '/encrypt' : '/decrypt';

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        console.log("Blob Received!");
        const imageUrl = window.URL.createObjectURL(blob);
        const outputImage = document.getElementById('output-image');
        outputImage.src = imageUrl;
        outputImage.style.display = 'block';
        const outputMessage = document.getElementById('output-message');
        outputMessage.textContent = action === 'encrypt' ? 'Image encrypted successfully!' : 'Image decrypted successfully!';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing the image.');
    });
}
