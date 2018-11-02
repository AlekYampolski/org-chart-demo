/* Draw all groups */
function drawGroupsAll(){
    gList[`single`].forEach(item => {
        drawGroup(item, 'single')
    })
    
    gList['multiple'].forEach(item => {
        drawGroup(item, 'multiple')
    })
}



/* Draw a single group */
function drawGroup(groupName, groupType){
    groupNameValidation(groupName, groupType);
    if(groupNameValidation === false) return 'Problems with groupName-groupType'

    var group = groups.find(item => {
        item.type === groupName
    });
    var groupItems = group.items;
    var groupColor = group.color;

    var groupSelection = svg.selectAll(`.circle--${groupType}`)
                            .data(groupItems)
                            .enter();

    groupSelection.append('circle')
        .attr('id', d => d.id)
        .attr('class', `circle--${groupType}`)
        .attr('cx', (d) => d.position.x)
        .attr('cy', (d) => d.position.y)
        .attr('r', (d) =>  d.position.r)
        .style('fill', groupColor);

    groupSelection.append('text')
            .text(d => d.name)
            .attr('x', d => d.position.x - d.position.r)
            .attr('y', d => d.position.y)               
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
