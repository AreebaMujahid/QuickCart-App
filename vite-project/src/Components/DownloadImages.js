const fs = require('fs');
const https = require('https');

for (let i = 1; i <= 100; i++) {
    const url = `https://via.placeholder.com/200.png?text=Product+${i}`;
    const file = fs.createWriteStream(`${i}.jpg`);

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${i}.jpg`);
        });
    }).on('error', (err) => {
        fs.unlink(`${i}.jpg`); // Delete the file if there's an error
        console.error(`Error downloading ${i}.jpg: ${err.message}`);
    });
}
