
import mongoose from "mongoose";
function connect() {

    const uri = process.env.MONGODB_URI;

    return mongoose.connect(uri)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.log(err);
        });
}
export default connect;