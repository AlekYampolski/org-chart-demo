/* Started settings */
var svgPar = {
    svgHeight : 1000,
    svgWidth : 1000,
    svgColor : '#eee'
}

/* Group settings */
var gList = {
    single : ["squads", "faculties", "agencies"],
    multiple : ["council", "clubs"]
}

function getSVGSelection(sWidth, sHeight, sColor){
    return   svg = d3.select('svg')
                .attr('width', sWidth)
                .attr('height', sHeight)
                .style('background', sColor);
}

var svg = getSVGSelection(svgPar.svgWidth, svgPar.svgHeight, svgPar.svgColor);