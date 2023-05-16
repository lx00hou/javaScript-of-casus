const distance = 1050;
class Swiper {
    constructor(){
        this.imgList = document.querySelector('.img-list');
        this.index = 0;  // 图片索引 代表第几张图片
        let cloneFirstImg = this.imgList.firstElementChild.cloneNode();   // 克隆imgList的第一张图片
        this.imgList.appendChild(cloneFirstImg);  // 将第一张图片克隆 并放到list最后的位置
        this.initBingDom();   // 绑定元素点击事件
    }
    initBingDom(){
        let arrowLeft = document.querySelector('.arrow-left');
        let arrowRight = document.querySelector('.arrow-right');
        arrowLeft.addEventListener('click',this.arrLeftClick.bind(this));   // 不改变this指向,this会默认指向 箭头元素
        arrowRight.addEventListener('click',this.arrRightClick.bind(this));
    }
    arrLeftClick(e){   // 左侧箭头点击事件
        this.imgList.style.left = `${--this.index * -distance}px`;
    }
    arrRightClick(e){   // 右侧箭头点击事件
        this.index++;
        this.imgList.style.left = `${this.index * -distance}px`;
        if(this.index == this.imgList.children.length-1){
            // 点击到 最后一张假图 关闭过渡动画 将 left 置为0;
            setTimeout(() => {
                this.index = 0;
                this.imgList.style.left = 0;
                this.imgList.style.transition = 'none';
            },500) // 和过渡动画 时长必须保持一致,(必须关闭过渡动画)
        }else this.imgList.style.transition = '0.5s ease';
    }

}