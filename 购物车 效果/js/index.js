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
        return this.choose ? true : false
    }
    // 选择数量+1
    increase(){
        this.choose++
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

 
}

let datas = new UiData() 