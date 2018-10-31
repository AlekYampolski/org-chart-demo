var svgHeight = 900;
var svgWidth = 900;
var svgColor = "green";

var myJSON = groups;

var svg = d3.select('svg')
            .attr('height', svgHeight)
            .attr('width', svgWidth)
            .style('background', svgColor);

var colors = {
    room : "red",
    faculty : 'aqua'
}

function renderGroup(groupType){
    var group = myJSON.find(item => item.type === groupType);
    var groupItems = group.items;
    var groupColor = group.color;
    var roomRender = svg.selectAll(`.circle--${groupType}`)
                        .data(groupItems)
                        .enter()
                        .append('circle')
                        .attr('id', d => d.id)
                        .attr('class', `circle--${groupType}`)
                        .attr('cx', (d) => d.descr.x)
                        .attr('cy', (d) => d.descr.y)
                        .attr('r', (d) =>  d.descr.r)
                        .style('fill', groupColor)
                        .on('click', (e, d) => {showPets(e,d)})
}

function showPets(e){
    var id = e.id;
    var typeG = id.split('-')[0];

    if(typeG === "faculty"){

        var pets = animals.pets;
        /* Find all pets belong to group */
        var petsData = pets.filter( item => {var someTest = item.petGroups.faculty === id
            return someTest;
        });
        
        renderPets(petsData, e)
    } 

    if(typeG === "room"){
        svg.selectAll(`line.${id}`)
            .attr('stroke', 'black');
    }

}

function renderPets(petsData, e){
    var groupCl = e.id
    var pos = {x : 'null', y : 'null'};
    svg.selectAll(`.circle--${groupCl}`)
                        .data(petsData)
                        .enter()
                        .append('circle')
                        .attr('id', d => d.id)
                        .attr('class', `circle--${groupCl}`)
                        .attr('cx', (d,i) => { var someX = e.descr.x - 2*(i+1)*20 - 5;
                            d.pos.x = someX;
                            return someX;    
                        } )
                        .attr('cy', (d,i) => { var someY = e.descr.y- e.descr.r - 20;
                            d.pos.y = someY;
                            return someY;
                        })
                        .attr('r', 20)
                        .style('fill', d => d.color)
                        .on('click', (d) => {
                            connections(d)
                        })
}

function connections(d){
    // var pos = positionCalc;
    var typeRoom = d.petGroups.room;
    if(Object.prototype.toString.call( typeRoom ) === '[object Array]' && typeRoom.length > 0){
        typeRoom.forEach(element => {
            var group = myJSON[0].items.find(item => { var someT = item.id === element.name
                return someT;
            });
            svg.append("line")
             .attr('class',`${group.id}`)
            .attr('x1', group.descr.x)
            .attr('y1', group.descr.y)
            .attr('x2', d.pos.x)
            .attr('y2', d.pos.y)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', (3,3))
            .attr('stroke', 'black')
        });
      
    } else return;
}

function lineInvis(){
    svg.selectAll('line')
        .attr('stroke', svgColor)
}

