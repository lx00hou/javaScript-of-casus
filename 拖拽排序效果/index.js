let list = document.querySelector('.contain');
let sourceNode;   // 当前被拖动的元素
list.ondragstart = e => {
    setTimeout(() => {
        e.target.classList.add('move')
    },0)
    sourceNode = e.target
}
list.ondragover = e => {
    e.preventDefault()
}
list.ondragenter = e => {
    e.preventDefault()
    if(e.target === list || e.target === sourceNode){
        // 排除 父元素 和 自身
        return
    }
    // 被拖动元素 进入其他元素(e.target)   
    let children = [...list.children];
    let sourceIndex = children.indexOf(sourceNode);
    let targetIndex = children.indexOf(e.target);
    if(sourceIndex < targetIndex){
        // 向下拖动
        list.insertBefore(sourceNode,e.target.nextElementSibling)
    }else {
        // 向上拖动
        list.insertBefore(sourceNode,e.target)
    }
}
list.ondragend = e => {
    e.target.classList.remove('move')
}

