(function () {
    var container = document.querySelector(".container");
    var imgs = [];

    var itemWidth = 100;
    var lineArr = [];
    var cols = 0;
    var rows = 0;
    var debounceResize = debounce(resetPosition, 500);

    function init() {
        resetLineArr();
        for (var i = 0; i <= 40; i++) {
            var img = document.createElement("img");
            img.src = "img/" + i + ".jpg";
            container.appendChild(img);
            img.onload = resetPosition;
            imgs.push(img);
        }
    }

    function resetLineArr() {
        lineArr = [];
        container.style.width = window.innerWidth * 0.90 + "px";
        var clientWidth = container.offsetWidth;
        cols = Math.floor(clientWidth / itemWidth);
        rows = Math.ceil(imgs.length / cols);
        for (var i = 0; i < cols; i++) {
            if (!lineArr[i]) {
                lineArr[i] = 0;
            }
        }
        // console.log("lineArr: " + lineArr.length);
    }

    function resetPosition() {
        resetLineArr();
        resetImgs();
    }

    function resetImgs() {
        var gap = (container.offsetWidth - cols * itemWidth) / (cols + 1);
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            var minValue = Math.min.apply(null, lineArr);
            var minIndex = lineArr.indexOf(minValue);
            img.style.left = gap + (gap + itemWidth) * minIndex + "px";
            img.style.top = gap + lineArr[minIndex] + "px";
            lineArr[minIndex] += gap + img.offsetHeight;
        }
        // console.log(lineArr);

        var maxValue = Math.max.apply(null, lineArr);
        container.style.height = maxValue + gap + "px";
    }

    window.onload = init;
    window.onresize = debounceResize;

    function debounce(fn, delay) {
        var timerId;
        return function() {
            if (timerId) {
                clearTimeout(timerId);
            }
            args = Array.prototype.slice.call(arguments);
            timerId = setTimeout(function() {
                fn.apply(this, args);
            }, delay)
        }
    }

    // init();
})();
