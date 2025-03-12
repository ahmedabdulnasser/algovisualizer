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
var traverserOrder = document.getElementById('visit-order');
let m = 1000;
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
async function svgExtend() {
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
        button.disabled = true;
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
        let prevx = -1000;
        for (let j = (1 << (i  -1)) + 1; j < (1 << i); j ++)
        {
            if (j >= nodes.length)return ;
            if (nodes[j - 1])prevx = parseInt(nodes[j - 1].getAttribute('cx'));
            if (!nodes[j])continue;
            let cx =  parseInt(nodes[j].getAttribute('cx'));
            if (Math.abs(cx - prevx) < red * 2)cx = prevx + red * 2;
            console.log(cx + " " + j);
            nodes[j].setAttribute('cx', cx);
            texts[j].setAttribute('x', cx);
            if (edges[j])
            edges[j].setAttribute('x2',cx);
        }
    }
    
}
async function insert(x)
{
    console.log("insert" + x + " " + nodes.length);
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
        await delay(m);
        
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
        circle.setAttribute('cy', parseInt(parent.getAttribute('cy')) + red * 5);
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
    
    await svgExtend();
    
    await reorder();
    
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
    if (ind == 1)
    {
        
        traverserOrder.innerHTML = "";
        addTraversedNode("post order traverse ( left - right - root ) ");
    }
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', "7,5");
        edges[ind].setAttribute('stroke', 'green');
        edges[ind].setAttribute('stroke-width', '2');
        
    }
    
    console.log(ind);
    await delay(m * 3);
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', 'none');
        edges[ind].setAttribute('stroke', 'black');

    }
    
    texts[ind].setAttribute('fill', 'black');
    nodes[ind].setAttribute('fill', 'grey');

}
async function addTraversedNode(value)
{
    let div = document.createElement('div');
    let p = document.createElement('p');
    p.innerHTML = value;
    div.appendChild(p);
    traverserOrder.appendChild(div);
}
async function inorder(ind)
{
    let left = ind << 1;
    let right = left + 1;
    if (nodes[left])await inorder(left);
    nodes[ind].setAttribute('fill', exploreColor);
    texts[ind].setAttribute('fill', '#FFD700');
    if (ind == 1)
    {
        
        traverserOrder.innerHTML = "";
        addTraversedNode("pre order Traverser (Root - left - right)");
    }
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', "7,5");
        edges[ind].setAttribute('stroke', 'green');
        edges[ind].setAttribute('stroke-width', '2');
        
    }
    await delay(m * 3);
    nodes[ind].setAttribute('fill', 'grey');
    await addTraversedNode(texts[ind].textContent);
    texts[ind].setAttribute('fill', 'black');
    if (ind > 1)
    {
        
        edges[ind].setAttribute('stroke', 'black');
        edges[ind].setAttribute('stroke-dasharray', 'none');
    }
    
    texts[ind].setAttribute('fill', 'black');
    if (nodes[right])await inorder(right);
    

}
async function preorder(ind)
{
    console.log(texts[ind].textContent);
    nodes[ind].setAttribute('fill', exploreColor);
    texts[ind].setAttribute('fill', '#FFD700');
    if (ind == 1)
    {
        traverserOrder.innerHTML = "";
        addTraversedNode("pre order Traverser (Root - left - right)");
    }
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', "7,5");
        edges[ind].setAttribute('stroke', 'green');
        edges[ind].setAttribute('stroke-width', '2');
        
    }
    await delay(m * 3);
    let left = ind << 1;
    let right = left + 1;
    nodes[ind].setAttribute('fill', 'grey');
    await addTraversedNode(texts[ind].textContent);
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
    await delay(m * 4);
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
        await delay(m);
    }
    
}
async function removeAll()
{
    for (let i = 0; i < nodes.length; i ++)
    {
        if (edges[i])svg.removeChild(edges[i]);
        if (nodes[i])svg.removeChild(nodes[i]);
        if (texts[i])svg.removeChild(texts[i]);
    }
    nodes = [];
    edges = [];
    texts = [];
}
async function balanceTree(first, last)
{
    if (last != undefined && first >= last)return ;
    if (!last)
    {
        console.log(last);
        console.log("HELL");
        await inorder(1);
        await removeAll();
        
        var divs = traverserOrder.children;
        last = divs.length;

    }
    console.log(first, last);
    await delay(m);
    let mid = (first + last) >> 1;
    let v = parseInt(traverserOrder.children[mid].firstChild.innerHTML);
    console.log(v);
    await insert(v);
    await balanceTree(first, mid);
    await balanceTree(mid + 1, last);
    
}
//build(n);