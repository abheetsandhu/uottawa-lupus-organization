/* All content remains available without JavaScript. */
(function(){
function setup(root,buttonAttr,itemAttr,statusSelector,noun){
if(!root)return;
const buttons=Array.from(root.querySelectorAll("["+buttonAttr+"]"));
const items=Array.from(root.querySelectorAll("["+itemAttr+"]"));
const status=root.querySelector(statusSelector);
if(!buttons.length||!items.length)return;
function apply(value){
let count=0;
items.forEach(function(item){item.hidden=value!=="all"&&item.getAttribute(itemAttr)!==value;if(!item.hidden)count++;else if(item.tagName==="DETAILS")item.open=false;});
buttons.forEach(function(button){button.setAttribute("aria-pressed",String(button.getAttribute(buttonAttr)===value));});
if(status)status.textContent=count+" "+noun+(count===1?"":"s");
const archive=root.querySelector(".science-archive-block");
if(archive)archive.hidden=!Array.from(archive.querySelectorAll("["+itemAttr+"]")).some(function(item){return !item.hidden;});
}
buttons.forEach(function(button){button.addEventListener("click",function(){apply(button.getAttribute(buttonAttr));});});
buttons[0].parentElement.hidden=false;apply("all");
}
setup(document.getElementById("team"),"data-team-filter","data-team-department","[data-team-status]","team member");
setup(document.getElementById("science-fridays"),"data-science-filter","data-science-topic","[data-science-status]","Science Friday");
}());