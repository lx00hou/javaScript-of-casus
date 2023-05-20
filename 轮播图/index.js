const distance = 1050;
class Swiper {
    constructor(){
        this.autoPlayInterval = null;
        this.lock = true;   // 节流锁
        this.imgList = document.querySelector('.img-list');
        this.circleAll = document.querySelectorAll('.circle');
        this.warp = document.getElementById('warp'); 
        this.index = 0;  // 图片索引 代表第几张图片
        let cloneFirstImg = this.imgList.firstElementChild.cloneNode();   // 克隆imgList的第一张图片
        this.imgList.appendChild(cloneFirstImg);  // 将第一张图片克隆 并放到list最后的位置
        this.initBingDom();   // 绑定元素点击事件
        this.autoPlay();   // 自动轮播
        this.mouseEvent();   // 鼠标移入移出事件
    }
    initBingDom(){
        let arrowLeft = document.querySelector('.arrow-left');
        let arrowRight = document.querySelector('.arrow-right');
        arrowLeft.addEventListener('click',this.arrLeftClick.bind(this));   // 不改变this指向,this会默认指向 箭头元素
        arrowRight.addEventListener('click',this.arrRightClick.bind(this));
        /**
         * 给底部原点绑定 添加 class 类名
         * 点击事件 委托父元素
         */
        let ulCircle = document.querySelector('ul');
        ulCircle.addEventListener('click',this.ulTargetClick.bind(this))
        this.bingClassOfCircle();
    }
    arrLeftClick(){   // 左侧箭头点击事件
        if(!this.lock) return 
        this.index--;
        if(this.index == -1){
            let imgLength = this.imgList.children.length - 1;
            this.imgList.style.left = `${imgLength * -distance}px`;
            this.imgList.style.transition = 'none';
            this.index = imgLength - 1; 
            setTimeout(() => {
                this.imgList.style.left = `${this.index * -distance}px`;
                this.imgList.style.transition = '0.5s ease';
            }, 0);
        } else {
            this.imgList.style.left = `${this.index * -distance}px`;
        }
        this.bingClassOfCircle();
        this.lock = false;
        setTimeout(() => {
            this.lock = true
        },500)
    }
    arrRightClick(){   // 右侧箭头点击事件
        if(!this.lock) return 
        this.index++;
        this.imgList.style.left = `${this.index * -distance}px`;
        if(this.index == this.imgList.children.length-1){
            // 点击到 最后一张假图 关闭过渡动画 将 left 置为0;
            this.index = 0;
            setTimeout(() => {
                this.imgList.style.left = 0;
                this.imgList.style.transition = 'none';
            },500) // 和过渡动画 时长必须保持一致,(必须关闭过渡动画)
        }else this.imgList.style.transition = '0.5s ease';
        this.bingClassOfCircle();
        this.lock = false;
        setTimeout(() => {
            this.lock = true
        },500)
    }
   
    ulTargetClick(e){
        if(e.target.nodeName.toLowerCase() === 'li'){   // 点击原点
            if(!this.lock) return 
            let circleIndex = Number(e.target.dataset.ids);
            this.index = circleIndex;
            this.bingClassOfCircle();
            this.imgList.style.left = `${this.index * -distance}px`;
            this.lock = false;
            setTimeout(() => {
                this.lock = true
            },500)

        }
    }
    bingClassOfCircle(){   // 原点绑定类名 高亮显示
        for(let i = 0 ;i < this.circleAll.length; i++){  
            this.index == i && this.circleAll[i].classList.add('active');
            this.index !== i && this.circleAll[i].classList.remove('active');
        }
    }
    autoPlay(){
        this.autoPlayInterval = setInterval(this.arrRightClick.bind(this),2000)
    }
    mouseEvent(){
        this.warp.onmouseenter = () => {   // 鼠标移入 停止轮播
            clearInterval(this.autoPlayInterval);
        }
        this.warp.onmouseleave = () =>{   // 鼠标移出 重新开始轮播
            clearInterval(this.autoPlayInterval)
            this.autoPlay()
        }

    }

}