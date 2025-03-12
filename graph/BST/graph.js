var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
document.getElementById('algorithm').appendChild(svg);
svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
var nodes = [];
var edges = [];
var texts = [];
var red = 1;
var circle;
var text;
var line;
var sq = 1;
var height = 0;
var defaultColor = 'white';
var exploreColor = "#663399";
var pause = 0;
function resume()
{
    pause = 0;
}
function stop()
{
    pause = 1;
}
function add()
{
    let n = parseInt(document.getElementById('size').value);
    if (!n)return ;
    insert(n);
}
function svgExtend() {
    const box = svg.getBBox();
    const sidePadding = red *11;
    const topPadding = red * 0.5; 
    let viewBoxX = box.x - sidePadding;
    let viewBoxY = box.y - topPadding;
    let boxWidth = box.width + (sidePadding * 2);
    let boxHeight = box.height + topPadding;
    viewBoxY *= .8;
    svg.setAttribute("viewBox", `${viewBoxX} ${viewBoxY} ${boxWidth} ${boxHeight}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
    
    let parent = svg.parentNode;
    let parentWidth = parent.clientWidth;
    if (parentWidth == 0)parentWidth = 1000;
    let aspectRatio = boxWidth / boxHeight;
    
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", `${parentWidth / aspectRatio}px`);
}
function disableButtons()
{
    let b = document.getElementsByTagName('button');
    for (let button in b)
    {
        b.disabled = true;
    }
}

function enableButtons()
{
    let b = document.getElementsByTagName('button');
    for (let button in b)
    {
        b.disabled = false;
    }
}
async function delay(ms) {
    while (pause)
    {
        await new Promise(resolve =>setTimeout(resolve, ms));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function reorder()
{
    for (let i = 1;; i ++)
    {
        let start = 40;
        for (let j = (1 << (i  -1)); j < (1 << i); j ++)
        {
            if (j >= nodes.length)return ;
            if (!nodes[j])
            {
                start += 2 * red;
                return ;
            }
            nodes[j].setAttribute('cx', start);
            text = document.getElementById(j+"-text");
            text.setAttribute('x', start);
            line = document.getElementById(j+'-line');
            if (line)
            line.setAttribute('x2',start);
            start += 2 * red;
        }
    }
    
}
async function insert(x)
{
    let ind = 1;
    while (nodes[ind])
    {
        var value = document.getElementById(ind+'-text');
        value = parseInt(value.textContent);
        nodes[ind].setAttribute('stroke', 'red');
        nodes[ind].setAttribute('stroke-width', '2');
        if (ind > 1)
        {
            nodes[ind >> 1].setAttribute('stroke', 'black');
            nodes[ind].setAttribute('stroke-width', '2');
        }
        if (x == value)
        {
            console.log("already exist");
            return ;
        }
        if (x > value)ind = (ind << 1) + 1;
        else ind = ind << 1;
        await delay(1000);
        
    }
    if (ind >> 1)
    nodes[ind >> 1].setAttribute('stroke', 'black');
    if (ind == 1)
    {
        circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', red);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('fill', defaultColor);
        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', 100);
        text.setAttribute('y', 0);
        text.setAttribute('id', ind + "-text");
        height = 20;
        text.textContent = x;
        svg.appendChild(circle);
        svg.appendChild(text);
        nodes[ind] = circle;
        circle.setAttribute("vector-effect", "non-scaling-stroke");
        if (!nodes[ind])console.log('flk');
        
        text.setAttribute("font-size", .5 * red + "px");
    }
    else
    {
        let parent = nodes[ind >> 1];
        if (!nodes[ind >> 1])
        {
            console.log("Fl" + " " + ind);
        }
        console.log(ind + " - " + ind >> 1);
        console.log(ind);
        circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        if (ind & 1)
        {
            circle.setAttribute('cx', parseInt(parent.getAttribute('cx')) + red);
            
        }
        else {
            circle.setAttribute('cx', parseInt(parent.getAttribute('cx')) - red);
        }
        height = Math.max(height, parseInt(parent.getAttribute('cy')) + 80);
        sq *= 2;
        circle.setAttribute('cy', parseInt(parent.getAttribute('cy')) + red * 3);
        circle.setAttribute('r', red);
        circle.setAttribute('fill', defaultColor);
        circle.setAttribute('stroke', 'black');
        line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', parseInt(parent.getAttribute('cx')));
        line.setAttribute('y1', parseInt(parent.getAttribute('cy')) + red);
        line.setAttribute('x2', parseInt(circle.getAttribute('cx')));
        line.setAttribute('y2', parseInt(circle.getAttribute('cy')) - red);
        line.setAttribute('id', ind + "-line");
        line.setAttribute('stroke', 'black');
        circle.setAttribute("vector-effect", "non-scaling-stroke");
        line.setAttribute("vector-effect", "non-scaling-stroke");
        console.log(circle.getAttribute('cx') + " " + circle.getAttribute('cy'));
        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", circle.getAttribute('cx'));
        text.setAttribute("y", circle.getAttribute('cy'));
        text.setAttribute("id", ind + "-text");
        text.setAttribute("font-size", .5 * red + "px");
        text.textContent = x;
        svg.appendChild(circle);
        svg.appendChild(line);
        svg.appendChild(text);
        nodes[ind] = circle;
        edges[ind] = line;
    }
    
    texts[ind] = text;
    
    svgExtend();
    
}

async function postorder(ind)
{
    let left = ind << 1;
    let right = left + 1;
    if (nodes[left] !== undefined)
    await postorder(left);
    if (nodes [right] !== undefined)
    await postorder(right);
    nodes[ind].setAttribute('fill', exploreColor);
    texts[ind].setAttribute('fill', '#FFD700');
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', "7,5");
        edges[ind].setAttribute('stroke', 'green');
        edges[ind].setAttribute('stroke-width', '2');
        
    }
    
    console.log(ind);
    await delay(3000);
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', 'none');
        edges[ind].setAttribute('stroke', 'black');

    }
    
    texts[ind].setAttribute('fill', 'black');
    nodes[ind].setAttribute('fill', 'grey');

}
async function preorder(ind)
{
    console.log(texts[ind].textContent);
    nodes[ind].setAttribute('fill', exploreColor);
    texts[ind].setAttribute('fill', '#FFD700');
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', "7,5");
        edges[ind].setAttribute('stroke', 'green');
        edges[ind].setAttribute('stroke-width', '2');
        
    }
    await delay(3000);
    let left = ind << 1;
    let right = left + 1;
    nodes[ind].setAttribute('fill', 'grey');
    texts[ind].setAttribute('fill', 'black');
    if (ind > 1)
    {
        
        edges[ind].setAttribute('stroke', 'black');
        edges[ind].setAttribute('stroke-dasharray', 'none');
    }
    
    texts[ind].setAttribute('fill', 'black');
    if (nodes[left] !== undefined)
    await preorder(left);
    if (nodes [right] !== undefined)
    await preorder(right);

}
function clearEffects()
{
    for (let node of nodes)
    {
        if (node)
        {
            node.setAttribute('fill', defaultColor);
        }
    }
    for (let edge of edges)
    {
        if (edge)
            edge.setAttribute('stroke', 'black');
    }
}
async function search(ind, value)
{
    if (!value && value != 0)
    {
        value = document.getElementById('search-input').value;
        value = parseInt(value);
        if (!value && value != 0)
        {
            return ;
        }
    }
    
    if (!nodes[ind])
    {
        alert("not found");
        return ;
    }
    let v = parseInt(texts[ind].textContent);
    if (v == value)
    {
        nodes[ind].setAttribute('fill', 'green');
        alert('found');
        return ;
    }
    nodes[ind].setAttribute('fill', exploreColor);
    await delay(4000);
    nodes[ind].setAttribute('fill', 'grey');
    if (v > value)
    {
        await search(ind * 2, value);
    }
    else
    {
        await search(ind * 2 + 1, value);
    }
}
async function build(n)
{
    while (n --)
    {
        let x = parseInt(prompt());
        await insert(x);
        await reorder();
        await delay(1000);
    }
    
}
//build(n);
//for (let i = 0; i < 11; i ++)insert(i);