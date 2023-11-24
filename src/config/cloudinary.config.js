const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


module.exports = {
    /**
     * @param imagePath 
     * @returns {Object} Cloudinary Response 
     */

    upload: async function (imagePath) {
        return await cloudinary.uploader.upload(imagePath, {
            folder: 'public/'
        });
    },
    delete: async function (publicId) {
        try {
            return await cloudinary.uploader.destroy(publicId);
        }
        catch (e) {
            console.log(e)
        }
    }
}