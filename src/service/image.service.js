var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT
});


async function upload(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: 'posts'
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })

}


module.exports = { upload }