///Targeting all documents in the DB///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function findAll(req, res, model){
    model.find((err, foundModels)=>{
        if(!err){
            res.send(foundModels);

        }else{
            
            res.send(err);
        }
    });
}

function postModel(req, res, model){
    const newModel = new model(req.body);

    newModel.save((err)=>{
        if(!err){
            res.send("Successfully added.");
        }else{
            res.send(err);
        }
    });
}

function deleteAll(req, res, model){
    model.deleteMany((err)=>{
        if(!err){
            res.send("Successfully deleted");
        }else{
            res.send(err);
        }
    })
}

///Targeting spesific documents in DB//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function findOneDoc(req, res, model, where){
    model.findOne(
        where,
        (err, foundModel)=>{
            if(foundModel && !err){
                res.send(foundModel);
            }
            else if(err == null){
                res.send("Found nothing");
              
            }else{
                res.send(err);
            }          
    });
}


function putOne(req, res, model, where){
    model.replaceOne(
        //Find name
        where,
        //Replace values
        req.body,
        
        (err)=>{
           if(!err){
                res.send("Successfully updated");
           }else{
                res.send(err);
           } 
        }

    );
}

function updateOneDoc(req, res, model, where){
    model.updateOne(
        //Find name
        where,
        //only changes sent values
        {$set: req.body},
        (err)=>{
            if(!err){
                res.send("Successfully updated");
            }else{
                res.send(err);
            }
        }

    )
}

function deleteOneDoc(req, res, model, where){
    model.deleteOne(
        where,
        (err)=>{
            if(!err){
                res.send("Successfully deleted");
            }else{
                res.send(err);
            }
        });
}

module.exports = {
    findAll,
    postModel,
    deleteAll,
    findOneDoc,
    putOne,
    updateOneDoc,
    deleteOneDoc
};