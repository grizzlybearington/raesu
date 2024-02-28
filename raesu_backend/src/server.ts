import mongoose from "mongoose";
import app from "./app";
import env from "./util/validateEnv";

const port = env.PORT;

mongoose.connect(env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to DB");
        app.listen(port, () => {
            console.log("Listening on port: " + port);
        });
    })
    .catch((err) => {
        console.log(err);
    });
