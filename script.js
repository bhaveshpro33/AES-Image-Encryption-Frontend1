// Backend URL (replace with your actual backend URL on Render)
const backendUrl = "https://aes-image-encryption-backend1.onrender.com";
fetch(`${backendUrl}/encrypt`, { method: "POST", body: formData });
// Event listener for the Encrypt button
document.getElementById('encrypt-btn').addEventListener('click', async function() {
    // Set up FormData for the encryption request
    const formData = new FormData();
    formData.append('key', document.getElementById('key').value);
    formData.append('image', document.getElementById('image').files[0]);

    try {
        // Send the encryption request to the backend
        const response = await fetch(`${backendUrl}/encrypt`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('output-message').textContent = "Encryption Successful!";
            document.getElementById('output-image').src = `data:image/png;base64,${result.encrypted_image}`;
            document.getElementById('output-image').style.display = "block";
        } else {
            const errorData = await response.json();
            document.getElementById('output-message').textContent = errorData.error || "Encryption failed.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('output-message').textContent = "Error encrypting image.";
    }
});

// Event listener for the Decrypt button
document.getElementById('decrypt-btn').addEventListener('click', async function() {
    // Extract the key and encrypted image for decryption
    const key = document.getElementById('key').value;
    const encryptedImage = document.getElementById('output-image').src.split(',')[1]; // Only the base64 part of the image

    // Set up FormData for the decryption request
    const formData = new FormData();
    formData.append('key', key);
    formData.append('encrypted_image', encryptedImage);

    try {
        // Send the decryption request to the backend
        const response = await fetch(`${backendUrl}/decrypt`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('output-message').textContent = "Decryption Successful!";
            document.getElementById('output-image').src = `data:image/png;base64,${result.decrypted_image}`;
        } else {
            const errorData = await response.json();
            document.getElementById('output-message').textContent = errorData.error || "Decryption failed.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('output-message').textContent = "Error decrypting image.";
    }
});
