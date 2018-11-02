/* Init main svg */
var svg = drawSVGMain(svgPar.svgWidth, svgPar.svgHeight, svgPar.svgColor);

/* Draw SVG for Circles and return it */
function drawSVGMain(sWidth, sHeight, sColor){
    return   svg = d3.select('svg')
                .attr('width', sWidth)
                .attr('height', sHeight)
                .style('background', sColor);
}

function drawGroupByIt(groupId, singOrMult, groupsData, svgEl){

    if(singOrMult !== "single" && singOrMult !== "multiple") return false;
    
    var groupType = groupId.split('-')[0];
    var groupElement = groupsData[`${singOrMult}`][`${groupType}`];
    var color = groupElement.color;

    if(typeof groupElement === 'undefined') return false; 
    var groupElementId = groupElement.items.find(item => item.id == groupId);
    if(typeof groupElementId === 'undefined') return false;
    
    var selection = svgEl.selectAll(`g#${groupId}`)
        .data([groupElementId])
        .enter()
        .append('g')
        .attr('id', groupId)
        

    var circle =  selection.append('circle')
        .attr('cx', d => d.position.x)
        .attr('cy', d => d.position.y)
        .attr('r', d => d.position.r)
        .style('fill',color)
        // .attr()
    var text = selection.append('text')
                .text(d => d.name)
                .attr('x', d => d.position.x - d.position.r)
                .attr('y', d => d.position.y)
                .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                .attr("fill", "red");

    return {
        selection,
        position : groupElementId.position
    }

}

/* +++++++ */
var mod = modJSON(groups, ppl);
// drawGroupByIt('faculties-1', 'single', groups, svg);

function drawPplCircles(groupId, typeSM, mod, groupsData, svgEl){
    var pplItems;
    var selection = null;
    if(typeSM === 'single'){
        pplItems = mod.objsSingleArr.find(item => item.groupId === groupId);
    }
    
    if(typeSM === 'multiple'){
        pplItems = mod.objsMultiArr.find(item => item.groupId === groupId);
    }
    
    if(pplItems === undefined) return false;
    selection = drawGroupByIt(pplItems.groupId, typeSM, groupsData, svgEl);
    drawIt(selection, pplItems);
}

function drawIt(selection, pplItems){
    var ppl = pplItems.pplItems;
    var id = pplItems.groupId;
    // var rParent = circle;
    var arrLength = ppl.length;
    var selEl = selection.selection;
    var rParent = selection.position.r;
    var xParent = selection.position.x;
    var yParent = selection.position.y;
    selEl.append('g')
                .selectAll(`circle.${id}--ppl`)
                .data(ppl)
                .enter()
                .append('circle')
                .attr('id', d => d.id)
                .attr('class', `${id}--ppl`)
                .attr('cx', (d,i) => (rParent +25 )*Math.cos(2*Math.PI/arrLength*(i+1)) + xParent)
                .attr('cy', (d,i) => (rParent + 25 )*Math.sin(2*Math.PI/arrLength*(i+1)) + yParent)
                .attr('r', 10)
                .style('fill', d => d.color)
}


/* 
    Panel
*/

var svgP = d3.select('svg#panel-1');