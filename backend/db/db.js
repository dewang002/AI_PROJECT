// import mongoose from "mongoose";

// function connect() {
//     const uri = process.env.MONGODB_URI.replace('<db_password>', process.env.MONGODB_PASSWORD);
    
//     return mongoose.connect(uri)
//         .then(() => {
//             console.log("Connected to MongoDB");
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// export default connect;

import mongoose from "mongoose";
function connect() {
    const uri = ('mongodb+srv://new_user2:manishbisht1234@cluster0.ipvnrik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    return mongoose.connect(uri)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.log(err);
        });
}
export default connect;