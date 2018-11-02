/* Return list of group types */
function getGroupList(){
    var arr = []; 
    groups.forEach( item => arr.push(item.type) );
    return arr;
}

/* Return array of people belonging to group-id */
function getPeopleByGroupId(id){
    var subId = id.split('-')[0];
    var arr = [];
    ppl.forEach(items => {
       if(items.groups[subId] === id){
           arr.push(items);
       }
    })
    return arr;
}

/* Return a hybrid js object */
function modefied(){
    var newGroups = groups;
    var nG = [];
    groups.forEach(it => {
        it.items.forEach(subIt => {
            var ar = getPeopleByGroupId(subIt.id);
            subIt.ppl = ar;
            nG.push(subIt);
        })
    })
    return nG;
}

/* Group properties */
function checkGroup(groupName){
    /* validation */
    var groupList = getGroupList();
    if(groupList.includes(groupName)){
        return true;
    } 
    return false;
}

/* 
    groupType => single, multi 
    groupName => squads, faculties, etc    
*/

function groupNameValidation(groupName, groupType){
    /* Validation 
    if 
    */
    if(checkGroup(groupName) && gList[`${groupType}`] !== undefined){
        if(gList[`${groupType}`].includes(`${groupName}`)){
            return {groupName, groupType};
        }   
    }
    return false
}