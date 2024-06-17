// process line fun.
let ll=document.getElementById("process");
function load_light(){
  setTimeout(()=>{
    ll.style.display="block"
  },2000);
}
// header time function
let a=document.getElementById('loader');
let b=document.getElementById('main');      
function load(){
  setTimeout(show,2000);
}
function show(){
  let bd=  document.getElementsByTagName('body');
  bd[0].style.backgroundColor="white";
  a.style.display="none";
  b.style.display = "block";
  ll.style.display="none";
}
// time function
let time_span=document.querySelector("#time");
setInterval(()=>{let time = new Date();
  time_span.innerHTML=time.toLocaleTimeString();
},1000)
// theme
let side_bar =document.querySelector("#sidebar");
let top_bar =document.querySelector("#mf_top");
let m = document.querySelector("#middle");
let ch = document.querySelector("#theme");
var temp=0;
function change(){
  if(temp==0){
    ch.innerHTML='<i class="fa-solid fa-sun" ></i>'
    m.style.backgroundColor="white"
    side_bar.style.backgroundColor="white"
    top_bar.style.backgroundColor="white"
    temp=1;
  }
  else if(temp==1){
    ch.innerHTML='<i class="fa-solid fa-moon"></i>';
    m.style.backgroundColor= "grey";
    side_bar.style.backgroundColor=" grey"
    top_bar.style.backgroundColor="grey"
    temp=0;
  }  
}
// ========================form validator=============================
let hnm =document.querySelector("#pd_name_h");
let hid =document.querySelector("#pd_id_h");
let hamt =document.querySelector("#pd_am_h");
let hds =document.querySelector("#pd_ds_h");
function fun1(){
  let nm =document.getElementById("pd_name");
  let pid =document.getElementById("pd_id");
  let amt =document.getElementById("pd_amt");
  let ds =document.getElementById("dis");
  if(nm.value==""){
    hnm.innerHTML="Product Name Required*";
    nm.focus();
    return false;
  }
  else if(!(isNaN(nm.value))){
    hnm.innerHTML="Invalid Product Name*";
    nm.focus();
    return false;
  }
  else if(pid.value==""){
    hid.innerHTML="Product ID Required*";
    id.focus();
    return false;
  }
  else if(isNaN(pid.value)){
    hid.innerHTML="Invalid Product ID*";
    id.focus();
    return false;
  }
  else if(amt.value==""){
    hamt.innerHTML="Product Amount Required*";
    amt.focus();
    return false;
  }
  else if(isNaN(amt.value)){
    hamt.innerHTML="Invalid Product Amount*";
    amt.focus();
    return false;
  }
  else if(ds.value==""){
    hds.innerHTML="Discount Amount Required*";
    ds.focus();
    return false;
  }
  else if(isNaN(ds.value)){
    hds.innerHTML="Invalid Discount Amount*";
    ds.focus();
    return false;
  }
  else{
    let insert = {
      pd_name:nm.value,
      id:pid.value,
      amount:amt.value,
      discount:ds.value
   }
   fetch('http://localhost:3000/info',{
      method:"POST",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(insert)
   }).then(alert("Submitted......",window.location.href = "/table.html")); 
  }
}
function r1(){
  hnm.innerHTML="";
  return false;
}
function r2(){
  hid.innerHTML="";
  return false;
}
function r3(){
  hamt.innerHTML="";
  return false;
}function r4(){
  hds.innerHTML="";
  return false;
}
// end================================

// get data function========================================
async function getdata(){
  let d=document.getElementById("table_data");
  let reg = await fetch("http://localhost:3000/info");
  let reg1 =await reg.json();
  let data =reg1.map((e)=>`
      <tr>
        <td>${e.pd_name}</td>
        <td>${e.id}</td>
        <td>${e.amount}</td>
        <td>${e.discount}</td>
        <td class="button_con"><button onclick="update(${e.id})">Update</button></td>
        <td class="button_con"><button onclick="del(${e.id})">Delete</button></td>
      </tr>
      `).join("");
  d.innerHTML=data;
}
getdata();
// end============================================================
function del(id){
    fetch(`http://localhost:3000/info/${id}`,{
      method:"DELETE"
    }).then(res=>alert("Data deleted successfully"))
}
// =========================end
// update function============================================
let objid=0
async function update(i){
  objid=i;
  let bd=  document.getElementsByTagName('body');
  bd[0].style.backgroundColor="#176B87";
  let mn = document.getElementById("main")
   mn.style.display="none"
  let myfrm =document.getElementById("update_form")
  myfrm.style.display="block";
  let nm =document.getElementById("name");
  let pid =document.getElementById("id");
  pid.value=i
  let amt =document.getElementById("amt");
  let ds =document.getElementById("disc");
  let reg = await fetch(`http://localhost:3000/info/${i}`);
  let reg1=await reg.json()
  nm.value=reg1.pd_name;
  amt.value=reg1.amount;
  ds.value=reg1.discount;
}
function close(){
   window.location.href = "/table.html";
}
function update_main(){
  let insert = {
    pd_name:document.getElementById("name").value,
    id:document.getElementById("id").value,
    amount:document.getElementById("amt").value,
    discount:document.getElementById("disc").value
 }
 fetch(`http://localhost:3000/info/${objid}`,{
    method:"PUT",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(insert)
 }).then(alert("Updated......",window.location.href = "/table.html")); 
}

// js for about =====================
let op=0;

function o1(id){
  let d = document.getElementsByClassName("con_hide")
  let bu = document.getElementsByClassName("bu")
  if(op==0){
    d[id].style.position="static"
    bu[id].innerHTML='<i class="fa-solid fa-minus"></i>'
    op=1;
  }
  else{
    d[id].style.position="fixed"
    bu[id].innerHTML='<i class="fa-solid fa-plus"></i>'
    op=0;
  }
}
