const service = require("../services/OperationClaims");
const httpStatus = require("http-status");

const create = (req,res) =>{
    service.insert(req.body).then((response)=>{
        res.status(httpStatus.CREATED).send(response);
    }).
    catch((e)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
}

const index  = (req,res) => {
    service.list().then((response) => {
        res.status(httpStatus.OK).send(response);
    })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}


    module.exports ={
        create,
        index,
    }