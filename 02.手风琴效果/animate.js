function createAnimation(options) {
    var { from, to, onMove, onEnd } = options;
    var totalMS = options.totalMS || 1000;
    var duration = options.duration || 16;
    var times = Math.floor(totalMS / duration);
    var dis = (to - from) / times;
    var curTime = 0;
    var timerId = setInterval(function () {
        from += dis;
        curTime++;
        onMove && onMove(from);
        if (curTime >= times) {
            from = to;
            clearInterval(timerId);
            onEnd && onEnd();
        }
    }, duration);
    return timerId;
}

// var timerId = createAnimation({
//     from: 300,
//     to: 100,
//     totalMS: 3000,
//     onMove: function(e) {
//         console.log(e)
//     },
//     onEnd: function() {
//     }
// })
