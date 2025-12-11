const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file,folder,height,quality) =>
{
    try{
        const options = {folder};
        if(quality)
        {
            options.quality = quality;
        }
        if(height)
        {
            options.height = height;
            options.crop = "scale";
        }

        options.resource_type = 'auto';

        const uploadImage = await cloudinary.uploader.upload(file.tempFilePath,options);

        return uploadImage;
    }
    catch(err)
    {
        console.error("Cloudinary Upload Error:", err);
        throw err;
    }
}