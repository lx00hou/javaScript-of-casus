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
            goodsContains : document.querySelector('.goods-list')
        }
        this.createHtml()
    }
    // 根据商品数据 生成商品元素
    createHtml(){
        let containHtml = '';
        this.uiData.goodsData.forEach(goods => {
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
                    <i class="iconfont i-jianhao"></i>
                    <span>${goods.choose}</span>
                    <i class="iconfont i-jiajianzujianjiahao"></i>
                    </div>
                </div>
                </div>
            </div>`
            containHtml += domHtml;
        })
        this.doms.goodsContains.innerHTML = containHtml;
    }
    // 根据下标 增加商品数量
    increase(index){
        this.uiData.increase(index);  // 根据下标更改数据
        this.upDateGoodsItem(index)   // 根据下标更新dom
    }

     // 根据下标 减少商品数量
    desrease(index){
        this.uiData.desrease(index);   // 根据下标更改数据
        this.upDateGoodsItem(index)   // 根据下标更新dom
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
        
    }

}
let ui = new UI() 