/* Init main svg */
var svg = drawSVGMain(svgPar.svgWidth, svgPar.svgHeight, svgPar.svgColor);

/* Draw SVG for Circles and return it */
function drawSVGMain(sWidth, sHeight, sColor){
    return   svg = d3.select('svg')
                .attr('width', sWidth)
                .attr('height', sHeight)
                .style('background', sColor);
}

/* +++++++ */
var mod = modJSON(groups, ppl);
// drawGroupByIt('faculties-1', 'single', groups, svg);

// var svgP = d3.select('svg#panel-1');


/* NEW */
// drawGroupById('squads-1', 'single', mod, svg, true);
drawAllGroups(mod, svg, true);

// function drawGroups
function drawAllGroups(mod, svg, flag){
    drawGroupsSingle(mod, svg, flag);
    drawGroupsMultiple(mod, svg, flag);
}

function drawGroupsSingle(mod, svg, flag){
    var sOrM = 'single'
    mod.singleList.forEach( 
        name => drawGroupByType(name, sOrM, mod, svg, flag)
    )
}

function drawGroupsMultiple(mod, svg, flag){
    var sOrM = 'multiple'
    mod.multiList.forEach( 
        name => drawGroupByType(name, sOrM, mod, svg, flag)
    )
}

function drawGroupByType(name, sOrM, mod, svg, flag){
    var getAllGroupIds = mod.listOfIds.filter(id => {
        return id.split('-')[0] === name;
    });
    getAllGroupIds.forEach(id => {
        drawGroupById(id, sOrM, mod, svg, flag);
    })
}

// drawGroupByType('squads', 'single', mod, svg, true);

function drawGroupById(id, sOrM, mod, svg, flag){
    var pplItems = getModGroupById(id, sOrM, mod);
    if (pplItems === false) return "People haven't found";

    // console.log(pplItems);
    /* GROUP CIRCLE */
    var selection = svg.selectAll(`g#${id}`)
                        .data([pplItems])
                        .enter()
                        .append('g')
                        .attr('id', d => d.groupId)

    var circle = selection.append('circle')
                    .attr('cx', d => d.position.x)
                    .attr('cy', d => d.position.y)
                    .attr('r', d => d.position.r)
                    .style('fill', d => d.color);

    var text = selection.append('text')
                    .text( d => d.name)
                    .attr('x', d => d.position.x -  d.position.r)
                    .attr('y', d => d.position.y)
                    .style('font-family', 'sans-serif')
                    .style('font-size', '13px')
                    .style('fill', 'red');


    if(flag === true){
        selection.selectAll('circle.sub-items')
                    .data(pplItems.pplItems)
                    .enter()
                    .append('circle')
                    .attr('class', 'sub-items')
                    .attr('id', newd => newd.id)
                    .attr('cx', (newD,i) => (pplItems.position.r +25 )*Math.cos(2*Math.PI/pplItems.pplItems.length*(i+1)) + pplItems.position.x)
                    .attr('cy', (newD,i) => (pplItems.position.r + 25 )*Math.sin(2*Math.PI/pplItems.pplItems.length*(i+1)) + pplItems.position.y)
                    .attr('r', '10')
                    .style('fill', d => d.color)
            
    }
}