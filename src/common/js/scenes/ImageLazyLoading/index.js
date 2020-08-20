/*
 * 图片懒加载 
 * @Author: liyan52 
 * @Date: 2020-07-09 18:15:47 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-10 11:57:19
 */
/* 给img标签一个自定义属性，用来记录真正的图片地址。
默认img标签只加载一个占位符。当图片进入可视区域时，再把img的src属性更换成真正的图片地址。 */
/* <div>
  <img src="/empty.jpg" data-src="/img/1.jpg" />
  <img src="/empty.jpg" data-src="/img/2.jpg" />
</div> */
/* rootMargin: 用来扩大或者缩小视窗的的大小，
使用css的定义方法，10px 10px 30px 20px表示top、right、bottom 和 left的值 */
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
        if (item.isIntersecting) {
            item.target.src = item.target.dataset.src;
            // 替换成功后，停止观察该dom
            intersectionObserver.unobserve(item.target);
        }
    })
  }, {
      rootMargin: "150px 0px" // 提前150px进入可视区域时就加载图片，提高用户体验
    });

const imgs = document.querySelectorAll('[data-src]');
imgs.forEach((item) => {
    intersectionObserver.observe(item)
});

 /* 解决方案二：Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
 监听scroll，有性能问题
 目前流行的方式是通过　Element.getBoundingClientRect()　拿到元素的相关位置信息
 后进行手动的判断，但是这种方法由于运行在　JavaScript的主进程上，
 所以当需要监听的元素较多时，可能会造成性能问题 */
 /** 
  * 如果一个元素在视窗之内的话，那么它一定满足下面四个条件：
    top 大于等于 0
    left 大于登录 0
    bottom 小于等于视窗高度
    right 小于等于视窗宽度
 */
 function isInViewPort(element) {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const {
      top,
      right,
      bottom,
      left,
    } = element.getBoundingClientRect();
  
    return (
      top >= 0 &&
      left >= 0 &&
      right <= viewWidth &&
      bottom <= viewHeight
    );
  }
  
  // usage
  console.log(isInViewPort(document.querySelector('.target'))); // t