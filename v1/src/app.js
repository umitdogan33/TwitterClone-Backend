const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const config = require("./config/index")
const {UserRouters,OperationClaims,TweetRouters} = require("./api-routers/index");
const loaders = require("./loaders");
const events = require("./scripts/events/index")
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");

config();
loaders();
events();
const app = express();
app.use("/uploads",express.static(path.join(__dirname,"./","uploads")));
app.use(express.json());
app.use(helmet());  // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(fileUpload());
app.listen(process.env.APP_PORT,() => {
    console.log("sistem ayakta");
    app.use("/users",UserRouters);
    app.use("/operationclaims",OperationClaims);
    app.use("/tweets",TweetRouters);
    app.use((req,res,next)=>{
    const error = new Error("aradığınız sayfa bulunmamaktadır...");
    error.status=404;
    next(error);
    });
    app.use(errorHandler)
});
