var parent = document.getElementById('parent');
var divs = [];
var cells;
var primes;
var m = 400;
var pause = 0;
function resume()
{
    pause = 0;
}
function stop()
{
    pause = 1;
}
function play()
{
    let N = parseInt(document.getElementById('size').value) ;
    var form = document.getElementById('form');
    form.style.display='none';
    drewGrid(N);
    cells = document.getElementsByClassName('cell');
    primes = document.getElementById('primes_area');
    sieve(N);
}
function speedup()
{
    m -= 20;
    if (m < 1)m = 1;
}
function speeddown()
{
    m += 20;
    if (m > 1000)m = 1000;
}
function drewGrid(n)
{
    for (let i = 1; i <=  n; i ++)
    {
        var div = document.createElement('div');
        divs[i] = [];
        div.classList.add('cell');
        if (i > 1)
        div.classList.add('prime');
        div.innerHTML = i;
        parent.appendChild(div);
    }
}
async function delay(ms) {
    while (pause)
    {
        await new Promise(resolve =>setTimeout(resolve, ms));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sieve(n)
{
    for (let i = 2; i <= n; i ++)
    {
        cells[i - 1].classList.add('select-outer');
        cells[i - 2].classList.remove('select-outer');
        if (cells[i - 1].classList.contains('prime'))
        {
            let d = document.createElement('div');
            d.innerHTML=i;
            divs[i] = [i];
            primes.appendChild(d);
            for (let j = i + i; j <= n; j += i)
            {
                let li = document.createElement('li');
                if (divs[j])divs[j].push(i);
                else divs[j ] = [i];
                cells[j - 1].classList.remove('prime');
                cells[j - 1].classList.add('not_prime');
                cells[j - 1].classList.add('select');
                await delay(m);
                cells[j - 1].classList.remove('select');
            }
        }
        else await delay(m);
        
    }
}

