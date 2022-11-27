const prices=[184.99,49.99,29.99,24.78,1674.88];
let na="";
let ca="";
let tota=0;
let dono=0;
const imgs=["images/ia.jpg","images/ib.jpg","images/i3.jpg","images/id.png","images/ie.jpg"]
let sub2=document.querySelector("#stp2")
sub2.style.display="none";
console.log(sub2)
let sub1=document.querySelector("#stp1 input[type=submit]");
const validate_e= function(email)
    {return ( Boolean(email.search("@")+1) && Boolean(email.search(".com")+1) ) ?  true : false;
    }
const validate_card=function(card){
    let rege=new RegExp('[0-9][0-9][0-9][0-9][-][0-9][0-9][0-9][0-9][-][0-9][0-9][0-9][0-9][-][0-9][0-9][0-9][0-9]');
    return rege.test(card)
}
const validate_date= function(mon,yr){
//yr
console.log(mon);
console.log(yr);
let reyr=new RegExp('[2][0-9][2-9][2-9]');
const moth=["NOV","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","OCT","SEP","DEC"];
console.log(moth.includes(mon));
console.log(reyr.test(yr));
return (moth.includes(mon) && reyr.test(yr)) ? true:false;
}

console.log(sub1);
sub1.addEventListener('click',(e)=>{
    e.preventDefault();
    if(document.querySelector(".err")){
        document.querySelector(".err").remove();
    }
    const name= document.querySelector("#stp1").elements['fname'].value;
    console.log(e);
    let rr=``;
    const lcard=document.querySelector('#stp1').elements['card'].value;
    if(! validate_card(document.querySelector('#stp1').elements['card'].value)){
        rr+=`<h4>Card not in valid format(4444-4444-4444-4444)</h4>`;
    }
    if(!validate_e(document.querySelector('#stp1').elements['ema'].value)){
        rr+=`<h4>Invalid Email</h4>`;
    }
    if(!validate_date(document.querySelector('#stp1').elements['mon'].value,
    document.querySelector('#stp1').elements['yr'].value)){
       rr+=`<h4>Invalid Date</h4>`;
       console.log("troooo");
    }
    const newele=document.createElement("p");
    newele.innerHTML=rr;
    newele.style.color="red";
    newele.classList.add("err");
    newele.style.backgroundColor="black";
    if(rr.length != 0){
        document.querySelector("#stp1").append(newele);
        rr=``;
    }
    else{
        document.querySelector("#stp1").style.display="none";
        sub2.style.display="block";
        //sub2.children[0].innerHTML="Thank You  "+name;
        let net=document.querySelector("table");
        net.style.width="70%";
        sub2.append(net);
        let lise=`
        <ul>
        <li>Name:${name}</li>
        <li>Email:${document.querySelector('#stp1').elements['ema'].value}</li>
        <li>Total Price:${tota}</li>
        <li>Donation:+${dono}</li>
        <li>Payment:Card-***${lcard.substr(lcard.length-4,4)}</li>
        <li>Date:+${new Date()}</li>
        </ul>
        `
        let det=document.createElement('div');
        det.innerHTML=lise;
        det.style.listStyle="none";
        det.style.textAlign="left";
        sub2.append(det);
        na=name;
        ca=lcard;
    }

});

const orders=[0,0,0,0,0];
const items=document.querySelectorAll("#pri ul li div");
console.log(items);

//item.children[2].innerHTML ="Price :"+(prices[ind]*quant);
items.forEach((item,ind)=>{
    item.children[2].innerHTML ="Price :"+(prices[ind]); 
    let bu=true; 
    item.children[5].addEventListener('click',()=>{
       let pro=item.children[4];
       bu= !bu;
       item.children[5].innerHTML= bu?"Buy":"Cancel";
       pro.classList.toggle("cos");
       //item.children[6].classList.toggle("cos");
       let quant=1;
       pro.children[1].innerHTML=quant.toString();
       if(bu) {item.children[2].innerHTML ="Price :"+(prices[ind]);orders[ind]=0}
       else orders[ind]=quant;
       pro.children[0].addEventListener('click',()=>{
        quant-=1;
        if(quant === 0){
            pro.children[0].disabled=true;
            orders[ind]=0;
            item.children[2].innerHTML ="Price :"+(prices[ind]*orders[ind]);
            pro.children[1].innerHTML=orders[ind].toString();
            bu=true;
        }
        else{
         orders[ind]=quant;
         item.children[2].innerHTML ="Price :"+(prices[ind]*orders[ind]);
        pro.children[1].innerHTML=orders[ind].toString();
       }});
       pro.children[2].addEventListener('click',()=>{
        quant+=1;
        pro.children[0].disabled=false;
        orders[ind]=quant;
        item.children[2].innerHTML ="Price :"+(prices[ind]*orders[ind]);
        pro.children[1].innerHTML=orders[ind].toString();
       });

    });
    item.addEventListener('mouseover',()=>{
        item.children[2].classList.toggle("cos");
        //item.children[2].innerHTML ="Price :"+prices[ind];
    });
    item.addEventListener('mouseout',()=>{
        item.children[2].classList.toggle("cos");
    });
});

const ch=document.querySelector("#check");
ch.addEventListener('click',(e)=>{
    additem(e,orders,prices);
})

const additem=(e,orders,prices)=>{
    console.log(document.querySelector(".chtab"));
    if(document.querySelector(".chtab")){
        document.querySelector(".chtab").remove(); 
    }
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
inn+=`</table><h1>Total Price: ${to}</h1>
<h2>Donation+$${pox}</h2>
<button id="dis_form">Proceed</button></div>`;
newele.innerHTML=inn;
tota=to+pox;
dono=pox;
document.querySelector('#car').prepend(newele);
if(to <= 0){
    document.querySelector("#dis_form").disabled=true;
}
document.querySelector("#dis_form").addEventListener('click',()=>{
    document.querySelector("#stp1").classList.toggle("frl");
})
}
//export {na,ca ,orders,prices};


