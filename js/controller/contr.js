function modJSON(groups, ppl){

    var listOfAllIds = getGroupIds(groups);
    sortSingleGroups(listOfAllIds, ppl);
    sortMultiGroups(listOfAllIds, ppl)
    
    // console.log(listOfAllIds);

    return listOfAllIds;
}

function sortMultiGroups(listOfAllIds, ppl){
    ppl.forEach(pplItem => {
        listOfAllIds.multiList.forEach(type =>{
            if(pplItem.groups[type] !== "null" && Array.isArray(pplItem.groups[type])){
                var forCheck = pplItem.groups[type];
                forCheck.forEach(idG => {
                    var elToSave = listOfAllIds.objsMultiArr.find(item => {
                        // console.log(item.groupId === idG); 
                        return item.groupId ===idG; 
                    });
                    if(typeof elToSave !== "undefined"){
                        elToSave.pplItems.push(pplItem)
                    }  else {
                        // console.log('Element has an expected value')
                    }
                })
               
            } else {
                // console.log('Some troubles with singleList');
            }
        }) 
        // pplItem.groups
    })
}

function sortSingleGroups(listOfAllIds, ppl){
    ppl.forEach(pplItem => {
        listOfAllIds.singleList.forEach(type =>{
            if(pplItem.groups[type] !== "null" && typeof pplItem.groups[type] === "string"){
                var elToSave = listOfAllIds.objsSingleArr.find(item => {
                                // console.log(item.groupId === pplItem.groups[type]); 
                                return item.groupId === pplItem.groups[type]; 
                            });
                if(typeof elToSave !== "undefined"){
                    elToSave.pplItems.push(pplItem)
                } else {
                    // console.log('Element has an expected value');
                    // console.log(typeof pplItem.groups[type]);
                }
            } else {
                // console.log('Some troubles with singleList');
            }
        }) 
        // pplItem.groups
    })
}

function getGroupIds(groups){
    var singleList = Object.keys(groups.single);
    var multiList = Object.keys(groups.multiple);
    var listOfIds = [];

    var objsSingleArr = [];
    singleList.forEach((type, i) => {
        var color = groups.single[type].color;
        groups.single[type].items.forEach(d => {
            listOfIds.push(d.id);
            objsSingleArr.push({
                groupId : d.id, 
                name : d.name,
                position : d.position, 
                color : color, 
                pplItems : []
            })
        });
    });

    var objsMultiArr = [];
    multiList.forEach((type, i) => {
        var color = groups.multiple[type].color;
        groups.multiple[type].items.forEach(d => {
            listOfIds.push(d.id);
            objsMultiArr.push({
                groupId : d.id, 
                name : d.name, 
                position : d.position, 
                color : color,
                pplItems : []
            })
        });
    })
    return {
        singleList,
        multiList,
        objsMultiArr,
        objsSingleArr,
        listOfIds
    }
}

function getModGroupById(id, sOrM, mod){
    if(sOrM === 'single'){
        groupOb = mod.objsSingleArr.find(item => item.groupId === id);
    }
    
    if(sOrM === 'multiple'){
        groupOb = mod.objsMultiArr.find(item => item.groupId === id);
    }

    if(groupOb === undefined) return false;

    return groupOb
}
