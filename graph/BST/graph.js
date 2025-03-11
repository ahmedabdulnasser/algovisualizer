var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
document.body.appendChild(svg);
var n = parseInt(prompt());
var nodes = [];
var edges = [];
var texts = [];
var red = 20;
var circle;
var text;
var line;
var sq = 1;
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function reorder()
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
        if (ind > 1)
        nodes[ind >> 1].setAttribute('stroke', 'black');
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
        circle.setAttribute('cy', '20');
        circle.setAttribute('r', red);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('fill', 'none');
        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', 100);
        text.setAttribute('y', 20);
        text.setAttribute('id', ind + "-text");
        text.textContent = x;
        svg.appendChild(circle);
        svg.appendChild(text);
        nodes[ind] = circle;
        if (!nodes[ind])console.log('flk');
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
            circle.setAttribute('cx', parseInt(parent.getAttribute('cx')) + 20);
            
        }
        else {
            circle.setAttribute('cx', parseInt(parent.getAttribute('cx')) - 20);
        }
        sq *= 2;
        circle.setAttribute('cy', parseInt(parent.getAttribute('cy')) + 80);
        circle.setAttribute('r', red);
        circle.setAttribute('fill', 'white');
        circle.setAttribute('stroke', 'black');
        line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', parseInt(parent.getAttribute('cx')));
        line.setAttribute('y1', parseInt(parent.getAttribute('cy')) + red);
        line.setAttribute('x2', parseInt(circle.getAttribute('cx')));
        line.setAttribute('y2', parseInt(circle.getAttribute('cy')) - red);
        line.setAttribute('id', ind + "-line");
        line.setAttribute('stroke', 'black');
        console.log(circle.getAttribute('cx') + " " + circle.getAttribute('cy'));
        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", circle.getAttribute('cx'));
        text.setAttribute("y", circle.getAttribute('cy'));
        text.setAttribute("id", ind + "-text");
        text.textContent = x;
        svg.appendChild(circle);
        svg.appendChild(line);
        svg.appendChild(text);
        nodes[ind] = circle;
        edges[ind] = line;
    }
    texts[ind] = text;
    
}
async function preorder(ind)
{
    console.log(texts[ind].textContent);
    nodes[ind].setAttribute('fill', 'red');
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', "7,5");
        edges[ind].setAttribute('stroke', 'green');
    }
    await delay(3000);
    let left = ind << 1;
    let right = left + 1;
    nodes[ind].setAttribute('fill', 'grey');
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', 'none');
    }
    if (nodes[left] !== undefined)
    await preorder(left);
    if (nodes [right] !== undefined)
    await preorder(right);

}
function clearEffects()
{
    for (let node of nodes)
    {
        node.setAttribute('fill', 'none');
    }
}
async function postorder(ind)
{
    let left = ind << 1;
    let right = left + 1;
    if (nodes[left] !== undefined)
    await postorder(left);
    if (nodes [right] !== undefined)
    await postorder(right);
    nodes[ind].setAttribute('fill', 'red');
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', "7,5");
        edges[ind].setAttribute('stroke', 'green');
    }
    
    console.log(ind);
    await delay(3000);
    if (ind > 1)
    {
        edges[ind].setAttribute('stroke-dasharray', 'none');
    }
    nodes[ind].setAttribute('fill', 'grey');

}
async function build(n)
{
    while (n --)
    {
        let x = parseInt(prompt());
        await insert(x);
        reorder();
        await delay(1000);
    }
    
}
build(n);