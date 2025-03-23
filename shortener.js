async function shortenLink() {
    const longUrl = document.getElementById('longUrl').value;
    const accessToken = 'bd2e742480bdd098490dbe8e98fc9edf92b5ef7d'; // Replace with your Bitly access token

    // Validate the URL
    if (!isValidUrl(longUrl)) {
        document.getElementById('shortUrl').innerText = 'Invalid URL';
        return;
    }

    try {
        const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ long_url: longUrl })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('shortUrl').innerText = `Shortened URL: ${data.link}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('shortUrl').innerText = `Error: ${error.message}`;
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
