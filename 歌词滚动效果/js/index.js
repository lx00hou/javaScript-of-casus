
/**
 * 页面元素
 * @param {HTMLAudioElement}  音频播放器 
 */
let dom = {
    audio:document.querySelector('audio'),
    contain:document.querySelector('section'),
    Ul:document.querySelector('ul')
}


/**
 * 工具函数 
 * @param {Function} getTime 转为 秒(数字) 
 * @param {Function} curLrcIndex 获取当前播放歌词在数组中的下标 
 * @return {Number}  -1 代表 第一句歌词 还没开始
 */
 let unit = {
    getTime:(timeStr) => {
        return +timeStr.split(':')[0] * 60 + +timeStr.split(':')[1]
    },
    curLrcIndex:() => {
        let curAudioTime = dom.audio.currentTime;
        // let curAudioTime = 67.76;
        for(var i = 0 ; i <lrcData.length; i++ ){
            if(curAudioTime < lrcData[i].time){
                 return i - 1 
            }
        }
        // 当播放到 最后一句时。 会出现undefined  进行额外处理 
        return lrcData.length - 1
    }
}



function processData(lyric){
    /**
     * 处理拿到的数据格式
     * 需要 一个对象数组
     *  @params {Array} final 最终需要的 数据
     */
    let final = [];
    lyric.split('\n').forEach(song => {
        final.push({
            time:unit.getTime(song.split(']')[0].slice(1)),
            words:song.split(']')[1]
        })
    });
    return final
}
var lrcData = processData(lrc) || [];

var containHeight = dom.contain.clientHeight;   // 可视容器 高度


function createLrcItem(){
    /**
     * 循环数据 渲染 li 标签
     */
    let frag = document.createDocumentFragment();
    lrcData.forEach(lrc => {
        let li = document.createElement('li');
        li.textContent = lrc.words;
        frag.appendChild(li);
    })
    dom.Ul.appendChild(frag);
}
createLrcItem();



function setUlPosition(){
    /**
     * @param {number} 32 单个 li 高度
     * @param {number} 16 单个 li 高度的一般
     * 实际开发中建议动态获取
     */
    let InvolvedHeight = unit.curLrcIndex() * 32;
    let upTranslateY =  InvolvedHeight + 16 - ( containHeight / 2 ) 
    if(upTranslateY < 0) upTranslateY = 0;

    /**
     * 通过 transform 设置 Ul 整体的偏移量 
     */
    dom.Ul.style.transform = `translateY(-${upTranslateY}px)`;

    /**
     * 判断是否存在 li 添加类名
     */
    let li = document.querySelector('.active');
    li && li.classList.remove('active');
    li = dom.Ul.children[unit.curLrcIndex()];
    li && li.classList.add('active');

}

/**
 * 播放器 时间更新 
 */
dom.audio.addEventListener('timeupdate',setUlPosition)












