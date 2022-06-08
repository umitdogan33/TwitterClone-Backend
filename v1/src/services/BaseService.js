 let BaseModel = null;
class BaseService{
constructor(model){
    this.BaseModel = model;
}

    list(where){
        return this.BaseModel.find(where || {});
    }

    insert(data){
        return new this.BaseModel(data).save();
    }

    read(where){
        return this.BaseModel.findOne(where);
    }
    modify(id,data){
        return this.BaseModel.findByIdAndUpdate(data,id,{new: true});

    }
    remove(id){
        return this.BaseModel.findByIdAndDelete(id,{new:true})
    }
}

module.exports=BaseService;