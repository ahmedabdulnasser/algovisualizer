async function test(){
for (let i=0 ; i<3; i++){
    let objDiv = document.createElement('div')
    objDiv.innerText = i
    document.body.appendChild(objDiv)
    await delay(1000)

}
}
await test()
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
