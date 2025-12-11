const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Db ka Connection is Successfull');
    })
    .catch((err) => {
        console.log('Db ka Connection is Failed');
        console.error(err);
        process.exit(1);
    })
}
module.exports= dbConnect;