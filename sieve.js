var parent = document.getElementById('parent');
var divs = [];
var cells;
var primes;
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
        div.onmouseover = function()
        {
            this.innerHTML = '';
            for (j of divs[i])
            {

                let li = document.createElement('li');
                li.innerHTML = j;
                this.appendChild(li);
            }
        }
        div.onmouseout = function()
        {
            this.innerHTML = i;
        }
        parent.appendChild(div);
    }
}
async function delay(ms) {
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
                await delay(0);
                cells[j - 1].classList.remove('select');
            }
        }
        else await delay(0);
        
    }
}

