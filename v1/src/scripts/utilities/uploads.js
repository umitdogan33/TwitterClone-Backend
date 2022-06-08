const uuid = require("uuid");
const path = require("path");
const httpStatus = require("http-status");
const upload = (folder,req,res) =>{
    const extension = path.extname(req.files.image.name);
 const fileName = `${uuid.v4()}${extension}`;
 const folderPath = path.join(__dirname,"../../",`uploads/${folder}`,fileName);
 req.files.image.mv(folderPath, function(err) {
     if(err){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
     }
    });
    return fileName;
}
module.exports = upload;