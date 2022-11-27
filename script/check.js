import * as mae from './index.js';
console.log(mae);
let newele = document.createElement("div");
let inn=`<div class="chtab">
<h1>CART</h1>
<table>
    <tr>
    <th>Item
    <th>Quantity
    <th>Price
    <th>Total
    </tr>
`;
let to=0; 
orders.map((item,n)=>{
if(item === 0) return
else {
    inn+=`
    <tr id="row"+${n}>
    <td><img src=${imgs[n]} width="120px"></td>
    <td>${item}</td>
    <td>${prices[n]}</td>
    <td>${item*prices[n]}</td>
    </tr>
    `
    to+=item*prices[n];
}
})
let pox= to>100 ? (0.1*to):(10);
inn+=`</table><h1>Total Price: ${to+pox}</h1>
<h2>Donation+$${pox}</h2>`;

newele.innerHTML=inn;
document.querySelector("article").append(newele);