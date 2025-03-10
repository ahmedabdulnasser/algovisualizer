var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
document.body.appendChild(svg);
var n = parseInt(prompt());
var nodes = [];
var edges = [];
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
            if (!nodes[j])continue;
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
async function build(n)
{
    while (n --)
    {
        let x = parseInt(prompt());
        let ind = 1;
        while (nodes[ind])
        {
            var value = document.getElementById(ind+'-text');
            value = parseInt(value.textContent);
            nodes[ind].setAttribute('stroke', 'red');
            if (ind > 1)
            nodes[ind >> 1].setAttribute('stroke', 'black');
            if (x > value)ind = ind * 2 + 1;
            else ind = ind * 2;
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
        }
        reorder();
        await delay(1000);
    }
    
}
build(n);