const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
// Get correct answer
async function solveProblem(multiple, answerBox, s){
    // Make array of multiple choice
    let inputArr = [];
    let children = multiple.childNodes;
    for(let i = 0; i < children.length; i++){
        if(children[i].tagName == "DIV"){
            inputArr.push(children[i].childNodes[0]);
        }
    }

    // Make an array for the bit traversal
    bitArray = [];
    for(let i = 0; i < (1 << inputArr.length); i++){
        arr = [];
        for(let j = 0; j < inputArr.length; j++){
            if(i & (1 << j)){
                arr.push(j);
            }
        }
        bitArray.push(arr);
    }

    // To show the result
    inputArr[0].click();
    await sleep(500);
    s.click();
    await sleep(500);

    // Solve the problem
    for(let arr of bitArray){
        for(let e of arr)
            inputArr[e].click();
        await sleep(500);
        s.click();
        await sleep(500);
        // If the choice is correct, return 1
        if(answerBox.firstChild.firstChild.lastChild.innerHTML == " Correct"){
            return;
        }
        // Else, reset the choice clicked
        for(let e of arr)
            inputArr[e].click();
    }
}

async function main() {
    // Set e to be the HTML collections of multiple choises
    let e = document.getElementsByClassName("form--group form--group-prominent");

    // If the page on gradescope is not review quiz, return false
    if(!e.length) return;

    // Set a to be the HTML collection of the feedback
    let a = document.getElementsByClassName("question--feedback");

    // Set s to be the HTML collection of the submit bottons
    let s = document.getElementsByClassName("btnv7 btnv7-primary");

    // Process all elements in HTML collection
    for(let i = 0; i < e.length; i++) {
        await solveProblem(e[i], a[i], s[i]);
    }
};
window.addEventListener('load', function(){
    main();
});