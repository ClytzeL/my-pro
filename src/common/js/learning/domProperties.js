/*
 * DOM元素属性使用 
 * @Author: liyan52 
 * @Date: 2020-06-28 18:22:03 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-06-28 18:26:53
 */
// 实现图片懒加载
// 方案一：预留img元素占位，监听scroll函数，判断图片的offset与scrollTop+clientHeight的大小
// 首先给图片一个占位资源:
// <img src="default.jpg" data-src="http://www.xxx.com/target.jpg" /></img>
// 接着，通过监听 scroll 事件来判断图片是否到达视口:
let img = document.document.getElementsByTagName("img");
let count = 0;//计数器，从第一张图片开始计

lazyload();//首次加载别忘了显示图片

// window.addEventListener('scroll', lazyload);
// 当然，最好对 scroll 事件做节流处理，以免频繁触发:
window.addEventListener('scroll', throttle(lazyload, 200));

function lazyload() {
  let viewHeight = document.documentElement.clientHeight;//视口高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动条卷去的高度
  for(let i = count; i <num; i++) {
    // 元素现在已经出现在视口中
    if(img[i].offsetTop < scrollHeight + viewHeight) {
      if(img[i].getAttribute("src") !== "default.jpg") continue;
      img[i].src = img[i].getAttribute("data-src");
      count ++;
    }
  }
}
// 方案二：getBoundingClientRect
function lazyload2() {
    for(let i = count; i <num; i++) {
      // 元素现在已经出现在视口中
      if(img[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
        if(img[i].getAttribute("src") !== "default.jpg") continue;
        img[i].src = img[i].getAttribute("data-src");
        count ++;
      }
    }
  }
// 方案三：IntersectionObserver
// 这是浏览器内置的一个API，实现了监听window的scroll事件、判断是否在视口中以及节流三大功能。
let img = document.document.getElementsByTagName("img");

const observer = new IntersectionObserver(changes => {
  //changes 是被观察的元素集合
  for(let i = 0, len = changes.length; i < len; i++) {
    let change = changes[i];
    // 通过这个属性判断是否在视口中
    if(change.isIntersecting) {
      const imgElement = change.target;
      imgElement.src = imgElement.getAttribute("data-src");
      observer.unobserve(imgElement);
    }
  }
})
observer.observe(img);