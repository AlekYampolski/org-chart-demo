var svgHeight = 1000;
var svgWidth = 1000;
var svgColor = '#eee';

var svg = d3.select('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)
                .style('background', svgColor);
                

/* Return list of group types */
function getGroupList(){
    var arr = []; 
    groups.forEach( item => arr.push(item.type) );
    return arr;
}
                
/* Draw all groups */
function drawGroupsAll(){
    getGroupList().forEach(item => drawGroupSingle(item));
}

/* Draw a single group */
function drawGroupSingle(groupType){
    var listGroup = getGroupList();
    if(!listGroup.includes(groupType))return false;

    var group = groups.find(item => item.type === groupType);
    var groupItems = group.items;
    var groupColor = group.color;
    var roomRender = svg.selectAll(`.circle--${groupType}`)
                        .data(groupItems)
                        .enter();

                        roomRender.append('circle')
                        .attr('id', d => d.id)
                        .attr('class', `circle--${groupType}`)
                        .attr('cx', (d) => d.position.x)
                        .attr('cy', (d) => d.position.y)
                        .attr('r', (d) =>  d.position.r)
                        .style('fill', groupColor);

                        roomRender.append('text')
                        .text(d => d.name)
                        .attr('x', d => d.position.x - d.position.r)
                        .attr('y', d => d.position.y)
                       
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


/* Draw small circles around "Main Element" 
    modifiedEl - hybrid object. Group item + relative people
            {   
                id: "squads-1"
                name: "dolor ac nunc tristique"
                position: {x: 820, y: 158, r: 43}
                ppl: [{…}]
            }
*/
function renderPplForEl(modifiedEl){
    var ppl = modifiedEl.ppl;
    var id = modifiedEl.id;
    var rParent = modifiedEl.position.r;
    var xParent = modifiedEl.position.x;
    var yParent = modifiedEl.position.y;
    var arrLength = modifiedEl.ppl.length;
    if(arrLength == 0) return;
    svg.selectAll(`circle.${id}`)
                .data(ppl)
                .enter()
                .append('circle')
                .attr('class', `${id}-ppl`)
                .attr('cx', (d,i) => (rParent +25 )*Math.cos(2*Math.PI/arrLength*(i+1)) + xParent)
                .attr('cy', (d,i) => (rParent + 25 )*Math.sin(2*Math.PI/arrLength*(i+1)) + yParent)
                .attr('r', 10)
                .style('fill', d => d.color)
}

/* Draw all people belonging to groups */
function doIt(){
    var el = modefied();
    el.forEach(el => {
        renderPplForEl(el);
    })
}
