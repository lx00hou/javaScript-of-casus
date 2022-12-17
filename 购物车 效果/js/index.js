// 单个商品 信息集合
class UiGoods {
    constructor(goods){
        this.data = goods,
        this.choose = 0
    }
    // 获取单个商品的总价
    getItemsTotalPrice(){
        return this.data.price * this.choose 
    }
    // 是否选中
    isChoose(){
        return this.choose > 0
    }
    // 选择数量+1
    increase(){
        this.choose++;
    }
    // 选择数量-1
    desrease(){
        if(!this.choose) return
        this.choose--
    }
}


class UiData{
    constructor(){
        let uiGoods = [];
        goods.forEach(item => {
            uiGoods.push(new UiGoods(item))
        })
        this.goodsData = uiGoods    // 获取页面所有商品相关数据 
        this.deliverThreshold = 100    // 起送费
        this.deliverPrice = 5 // 配送费
    }
    //  获取 当前 选中的的商品总价
    getTotalPrice(){
        return this.goodsData.reduce((total,next) => {
             total += next.getItemsTotalPrice();
             return total  
        },0)
    }

    // 获取当前 选中 商品总数量
    getTotalChooseNum(){
    return this.goodsData.reduce((total,next) => {
        total += next.choose;
        return total 
    },0)
    }

    // 根据下标 增加某件商品的 数量
    increase(index){
        this.goodsData[index].increase()
    }

    // 根据下标 减少某件商品的 数量
    desrease(index){
        this.goodsData[index].desrease()
    }

    // 购物车中 是否存在商品 (是否有商品 ui界面不同)
    hasGoodsInCar(){
        return this.getTotalChooseNum() > 0
    }

    // 判断 是否超过了 起送金额 , 是否可以起送
    isCrossDeliverThreesold(){
        return this.getTotalPrice() >= this.deliverThreshold
    }
    // 判断某件商品是否被选中
    isChoose(index){
        return this.goodsData[index].isChoose()
    }
 
}


class UI {
    constructor() {
        this.uiData = new UiData()
        this.doms = {
            goodsContains : document.querySelector('.goods-list'),
            deliveryPrice: document.querySelector('.footer-car-tip'),
            footerPay: document.querySelector('.footer-pay'),
            footerPayInnerSpan: document.querySelector('.footer-pay span'),
            totalPrice: document.querySelector('.footer-car-total'),
            car: document.querySelector('.footer-car'),
            badge: document.querySelector('.footer-car-badge'),
        }
        this.createHtml();
        this.updateFooter();
        this.listerEvent()
    }
    // 根据商品数据 生成商品元素
    createHtml(){
        let containHtml = '';
        this.uiData.goodsData.forEach((goods,index) => {
            let domHtml = `<div class="goods-item">
                <img src=${goods.data.pic} alt="" class="goods-pic" />
                <div class="goods-info">
                <h2 class="goods-title">${goods.data.title}</h2>
                <p class="goods-desc">
                    ${goods.data.desc}
                </p>
                <p class="goods-sell">
                    <span>月售 ${goods.data.sellNumber}</span>
                    <span>好评率${goods.data.favorRate}%</span>
                </p>
                <div class="goods-confirm">
                    <p class="goods-price">
                    <span class="goods-price-unit">￥</span>
                    <span>${goods.data.price}</span>
                    </p>
                    <div class="goods-btns">
                    <i index=${index} class="iconfont i-jianhao"></i>
                    <span>${goods.choose}</span>
                    <i index=${index} class="iconfont i-jiajianzujianjiahao"></i>
                    </div>
                </div>
                </div>
            </div>`
            containHtml += domHtml;
        })
        this.doms.goodsContains.innerHTML = containHtml;
    }

    // 监听事件
    listerEvent(){
        this.doms.car.addEventListener('animationend',function(){
            // 购物车跳跃动画 结束时 清除 animate类
            this.classList.remove('animate')
        })
    }
    // 根据下标 增加商品数量
    increase(index){
        this.uiData.increase(index);  // 根据下标更改数据
        this.upDateGoodsItem(index)   // 根据下标更新dom
        this.updateFooter();   // 更新页脚
        this.carAnimate();
    }

     // 根据下标 减少商品数量
    desrease(index){
        this.uiData.desrease(index);   // 根据下标更改数据
        this.upDateGoodsItem(index)   // 根据下标更新dom
        this.updateFooter()   // 更新页脚
    }

    // 更新某个商品元素状态
    upDateGoodsItem(index){
        /**
         * @param  curGoodsDom 当前操作的商品元素
         * * */
        let curGoodsDom = this.doms.goodsContains.children[index];
        if(this.uiData.isChoose(index)){
            // 被选中 添加 active样式
            curGoodsDom.classList.add('active')
        }else {
            // 不被选中  移除active样式
            curGoodsDom.classList.remove('active')
        }
        // 更改 当前项 商品的 选中数量
        let numSpan = curGoodsDom.querySelector('.goods-btns span');
        numSpan.textContent = this.uiData.goodsData[index].choose
    }


    //  更新页脚
    updateFooter(){
          // 得到总价数据
        let total = this.uiData.getTotalPrice();
        // 设置配送费
        this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliverPrice}`;
        // 设置起送费还差多少
        if (this.uiData.isCrossDeliverThreesold()) {
        // 到达起送点
        this.doms.footerPay.classList.add('active');
        } else {
        this.doms.footerPay.classList.remove('active');
        // 更新还差多少钱
        let dis = this.uiData.deliverThreshold - total;
        dis = Math.round(dis);
        this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`;
        }
        // 设置总价
        this.doms.totalPrice.textContent = total.toFixed(2);
        // 设置购物车的样式状态
        if (this.uiData.hasGoodsInCar()) {
        this.doms.car.classList.add('active');
        } else {
        this.doms.car.classList.remove('active');
        }
        // 设置购物车中的数量
        this.doms.badge.textContent = this.uiData.getTotalChooseNum();
    }

    // 每次添加商品 触发购物车动画
    carAnimate(){
        this.doms.car.classList.add('animate')
    }

}
let ui = new UI();

ui.doms.goodsContains.addEventListener('click',e => {
    if([...e.target.classList].includes('i-jiajianzujianjiahao')){
        let index = +e.target.getAttribute('index');
        ui.increase(index)
    }else if([...e.target.classList].includes('i-jianhao')){
        let index = +e.target.getAttribute('index');
        ui.desrease(index)
    }
})