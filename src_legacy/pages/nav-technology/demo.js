let h4 =document.querySelectorAll(".text-gray");

const result = Array.from(h4).map(nav=>{
  let obj = {};
  obj.title = nav.innerText;
  let children = [];
  children = Array.from(nav.nextElementSibling.querySelectorAll(".box2")).map(item=>{
    let child = {};
    child.title = item.querySelector(".xe-user-name").innerText;
    child.icon = item.querySelector(".xe-user-img img").getAttribute("src");
    child.src = item.getAttribute("data-original-title");
    child.comment = item.querySelector(".overflowClip_2").innerText;
    return child;
  });
  obj.children = children;
  return obj;
});
console.log(JSON.stringify(result));


let result2 = arr.map(item=>{
  item.children = item.children.map(child=>{
    child.icon = "https://www.haozehua.com/xinghai-website/image/website-logo/" + child.icon.split("/").pop();
    return child;
  });
  return item;
});
console.log(JSON.stringify(result2));