const arr = [1, 2, 3, 4, 5];

//console.log(arr);

// arr.push(6);
// console.log(arr);


// const popValues = arr.pop();
// console.log(popValues);
// console.log(arr);

// for (let i =0; i< arr.length; i++){
//     console.log(arr[i]);
// }

// arr.forEach((el, index) => {
//     console.log(el, index);
// })

// const mapToValues = arr.map((el, index) => {
//     //console.log(el, index);
//     return el * 2;
// })

// console.log(mapToValues);


for(el of arr){
    console.log(el);
}

for(el in arr){ //avem acces doar la indexul elementelor - sub forma de string
    console.log(el);
}