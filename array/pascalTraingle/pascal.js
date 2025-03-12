var pascal = [];
var algorithm = document.getElementById('algorithm');
let pause = 0;
let m = 400;

async function delay(ms) {
    while (pause)
    {
        await new Promise(resolve =>setTimeout(resolve, ms));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function RemoveAll()
{
    for (let row in pascal)
    {
        algorithm.removeChild(row);
    }
}
async function draw(rows)
{
    if (!rows)
    {
        rows = document.getElementById('rows-number').value;
        rows = parseInt(rows);
    }
    if (!rows)return ;
    for (let i = 0; i <= rows; i ++)
    {
        var div = document.createElement('div');
        algorithm.appendChild(div);
        pascal[i] = [];
        for (let j = 0; j <= i; j ++)
        {
            var p = document.createElement('p');
            if (j == 0 || j == i)pascal[i][j] = 1;
            else 
            {
                pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
               // algorithm.children[i - 1].children[j - 1].classList.add('select');
              //  algorithm.children[i - 1].children[j].classList.add('select');
            }
            p.innerHTML = pascal[i][j];
            div.appendChild(p);
          //  div.classList.add('main-select');
            await delay(m);
            if (j && i)
            {
                
                //algorithm.children[i - 1].children[j - 1].classList.remove('select');
               // algorithm.children[i - 1].children[j].classList.remove('select');
            }
          //  div.classList.remove('main-select');
            
        }
    }

}
async function calcBolynomial(x, y, n)
{
    if (!x && x != 0)
    {
        x = document.getElementById('x').value;
        x = parseInt(x);
    }
    if (!y && y != 0)
    {
        y = document.getElementById('y').value;
        y = parseInt(y);
    }
    
    if (!n && n!= 0)
    {
        n = document.getElementById('n').value;
        n = parseInt(n);
    }
    if ((!y && y != 0) || (!x && x != 0) || (!n && n != 0))
    {
        console.log(x, y, n);
        return ;
    }
    await draw(n);
    let p = document.getElementById('result');
    let ty = y, tx = x;
    x = 1, y = 1;
    for (let i = 0; i <= n; i ++)x *= tx;
    let ans = 0;
    for (let i = 0; i <= n; i ++)
    {
        ans += pascal[n][i] * x * y;
        p.innerHTML += `${pascal[n][i]} * ${tx} <sup> ${n - i} </sup> * ${ty} <sup>${i}</sup>`;
        if (i < n)p.innerHTML += " + ";
        else p.innerHTML += ` = ${ans}`;
        x /= tx;
        y *= ty;

    }

    await draw(n);

}
