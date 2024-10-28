console.log("JavaScript is running!");

const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const outputImage = document.getElementById('output-image');
const outputMessage = document.getElementById('output-message');

// Event listener for Encrypt button
encryptBtn.addEventListener('click', function() {
    handleImageProcessing('encrypt');
});

// Event listener for Decrypt button
decryptBtn.addEventListener('click', function() {
    handleImageProcessing('decrypt');
});

function handleImageProcessing(action) {
    const imageInput = document.getElementById('image').files[0];
    const keyInput = document.getElementById('key').value;

    if (!imageInput || !keyInput) {
        alert('Please upload an image and enter a key!');
        return;
    }

    const formData = new FormData();
    formData.append('image', imageInput);
    formData.append('key', keyInput);

    const url = action === 'encrypt' ? '/encrypt' : '/decrypt';  // Ensure this is correct


    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.blob();  // Get the response as a Blob
    })
    .then(blob => {
        const imageUrl = window.URL.createObjectURL(blob);  // Create a URL for the Blob
        const outputImage = document.getElementById('output-image');
        outputImage.src = imageUrl;  // Set the output image source (if applicable)
        outputImage.style.display = 'block';
        
        // Trigger download for the decrypted image
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = action === 'encrypt' ? 'encrypted_image.png' : 'decrypted_image.png';  // Suggest a name for the downloaded file
        document.body.appendChild(link);
        link.click();  // Programmatically click the link to trigger the download
        document.body.removeChild(link);  // Clean up the DOM
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing the image.');
    });
}
