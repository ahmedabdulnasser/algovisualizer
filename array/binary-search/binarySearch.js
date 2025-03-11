var parent = document.getElementById('parent-res');
var arr = [];
var curr = false;
var pause = false;
var m = 400;
function drewGrid(n)
{
    parent.innerHTML = "";
    for (let i = 0; i <  n; i ++)
    {
        var div = document.createElement('div');
        div.classList.add('cell');
        div.innerHTML = arr[i];
        div.onclick = function(){
            if (curr)return;
            binSearch(arr[i], n);
        }
        parent.appendChild(div);
    }
}
function max()
{
    m = 0;
}
function resume()
{
    pause = 0;
}
function stop()
{
    pause = 1;
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

async function delay(ms) {
    while (pause)
    {
        await new Promise(resolve =>setTimeout(resolve, ms));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
var cells = document.getElementsByClassName('cell');
let prev = -1;
async function binSearch(v, n)
{
    curr = true;
    f = 0, l = n - 1;
    while (f <= l)
    {
        let mid = (l + f) >> 1;
        console.log(mid);
        cells[mid].classList.add('select');
        if (~prev)
        {
            cells[prev].classList.remove('select');
        }
        prev = mid;
        if (arr[mid] < v)
        {
            for (let j = f; j <= mid; j ++)await delay(m),cells[j].classList.add('eliminated');
            f = mid + 1;
        }
        else if (arr[mid] > v)
        {
            for (let j = l; j >= mid; j --)await delay(m),cells[j].classList.add('eliminated');
            l = mid - 1;
        }
        else
        {
            cells[mid].classList.add('found');
            curr = false;
            return ;
        }
        await delay(m);
    }
}
function play()
{
    arr = document.getElementById('array-numbers').value.split(' ');
    for (let i = 0; i < arr.length; i ++)
    {
        if (!parseInt(arr[i]) && arr[i] != '0')
        {
            arr = [];
            break;
        }
    }
  //  alert(arr);
    let N = parseInt(document.getElementById('required-size').value);
    if (!N && arr.length == 0)return ;
    let form = document.getElementById('ask-for-n');
    if (arr.length)
    {
        N = arr.length;
        
    }
    else
    {
        for (let i = 0; i < N; i ++)
        {
            arr[i] = Math.floor(Math.random() * 1000); 
        }
    }
    arr.sort(function(a, b){return a - b});
   // let indx = Math.floor(Math.random() * 1000) % N;
    //var v = arr[indx];
    drewGrid(N);
    //return ;
    //binSearch(v, N);

}
