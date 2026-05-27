function customPromise(fn){
    return fn();
}

let intVal=[1,2,3,4,5]
let target = 5;


let map={};
let l=0;
let R=intVal.length;
// for ( let i = 0; i<=intVal.length;i++){
//     for (let j=i+1;j<=intVal.length-1;j++){
//         if (intVal[i]+intVal[j]===target){
//             map[i]=[intVal[i],intVal[j]]
//         }
//         // else{
//         //     console.log("Not found");
//         // }
//     }
//     // console.log("Not found");
// }

console.log(map);

