function modJSON(groups, ppl){

    var listOfAllIds = getGroupIds(groups);
    sortSingleGroups(listOfAllIds, ppl);
    sortMultiGroups(listOfAllIds, ppl)
    
    console.log(listOfAllIds);

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
                        console.log('Element has an expected value')
                    }
                })
               
            } else {
                console.log('Some troubles with singleList');
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
                    console.log('Element has an expected value');
                    console.log(typeof pplItem.groups[type]);
                }
            } else {
                console.log('Some troubles with singleList');
            }
        }) 
        // pplItem.groups
    })
}

function getGroupIds(groups){
    var singleList = Object.keys(groups.single);
    var multiList = Object.keys(groups.multiple);

    var objsSingleArr = [];
    singleList.forEach((type, i) => {
        groups.single[type].items.forEach(d => {
            objsSingleArr.push({groupId : d.id, pplItems : []})
        });
    });

    var objsMultiArr = [];
    multiList.forEach((type, i) => {
        groups.multiple[type].items.forEach(d => {
            objsMultiArr.push({groupId : d.id, pplItems : []})
        });
    })
    return {
        singleList,
        multiList,
        objsMultiArr,
        objsSingleArr
    }
}
