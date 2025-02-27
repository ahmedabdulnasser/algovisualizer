var parent = document.getElementById('parent-res');
var arr = [];
function drewGrid(n)
{
    for (let i = 0; i <  n; i ++)
    {
        var div = document.createElement('div');
        div.classList.add('cell');
        div.innerHTML = arr[i];
        parent.appendChild(div);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var cells = document.getElementsByClassName('cell');
let prev = -1;
async function binSearch(v, n)
{
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
            for (let j = f; j <= mid; j ++)cells[j].classList.add('eliminated');
            f = mid + 1;
        }
        else if (arr[mid] > v)
        {
            for (let j = l; j >= mid; j --)cells[j].classList.add('eliminated');
            l = mid - 1;
        }
        else
        {
            cells[mid].classList.add('found');
            return ;
        }
        await delay(1000);
    }
}
function play()
{
    let N = parseInt(document.getElementById('required-size').value);
    let form = document.getElementById('ask-for-n');
    form.style.display = 'none';
    for (let i = 0; i < N; i ++)
    {
        arr[i] = Math.floor(Math.random() * 1000); 
    }
    arr.sort(function(a, b){return a - b});
    let indx = Math.floor(Math.random() * 1000) % N;
    var v = arr[indx];
    alert(`searching for ${v}`);
    drewGrid(N);
    //return ;
    binSearch(v, N);

}
