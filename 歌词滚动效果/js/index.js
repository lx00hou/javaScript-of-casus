
/**
 * 页面元素
 * @param {HTMLAudioElement}  音频播放器 
 */
let dom = {
    audio:document.querySelector('audio')
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
console.log('Index',unit.curLrcIndex());














