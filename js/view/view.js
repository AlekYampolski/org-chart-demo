/* Init main svg */
var svg = drawSVGMain(svgPar.svgWidth, svgPar.svgHeight, svgPar.svgColor);

/* Draw SVG for Circles and return it */
function drawSVGMain(sWidth, sHeight, sColor){
    return   svg = d3.select('svg')
                .attr('width', sWidth)
                .attr('height', sHeight)
                .style('background', sColor);
}

/* Draw all groups */
function drawGroupsAll(){
    // gList[`single`].forEach(item => {
    //     drawGroup(item, 'single')
    // })
    
    gList['multiple'].forEach(item => {
        drawGroup(item, 'multiple')
    })
}



/* Draw a single group */
function drawGroup(groupName, groupType){
    var group = groupNameValidation(groupName, groupType);
    if(group === false) return 'Problems with groupName-groupType'

    // var group = group.items.find(item => {
    //     item.type === groupName
    // });
    var groupItems = group.items;
    var groupColor = group.color;

    var groupSelection = svg.selectAll(`circle#${groupItems.id}`)
                            .data(svg.selectAll(`circle#${groupItems.id}`))
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
function doIt(ty){
    var el = modefied();
    el.forEach(el => {
        renderPplForEl(el);
    })
}


/* Draw panel */
// function drawPanel(){
//     d3.select('body')
//         .selectAll('svg#panel')
//         .data([panelControl])
//         .enter()
//         .append('svg')
//             .attr('id', "panel")
//             .attr('width', d => { 
//                 return d.width
//             })
//             .attr('height', d => { 
//                 return d.height
//             })
//             .attr('x', d => d.pos.x)
//             .attr('y', d=> d.pos.y)
//             .style('background', d => d.color);

//     drawPanelItems(svg, gList)
// }

// /* Draw panel items */
// function drawPanelItems(svgEl, data){
//     var singleItems = svgEl.selectAll('div#single-panel')
//                         .data([data.single])
//                         .enter()
//                         .append('div')
//                         .attr('id', 'single-panel')

//     // singleItems.selectAll('rect')
// }