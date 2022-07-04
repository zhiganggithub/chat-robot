(function () {
    function $(selector) {
        return document.querySelector(selector);
    }

    var doms = {
        con1: $(".con1"),
        con2: $(".con2"),
        con3: $(".con3"),
        con4: $(".con4"),
        con5: $(".con5"),
        con6: $(".con6"),
    };
    var timerNum = 23 * 3600 + 59 * 60 + 59;
    var maxNum = [2, 9, 5, 9, 5, 9];
    var timerH = doms.con1.clientHeight;
    console.log(timerH);
    function init() {
        var str = getTimerString();
        var timeArr = Array.from(str);
        console.log(timeArr);
        for (let i = 1; i <= timeArr.length; i++) {
            let num = timeArr[i - 1];
            var num2 = num - 1;
            if (num2 < 0) {
                num2 = 9;
            }
            setConHtml(doms["con" + i], num, num2);
        }
        // console.log(doms);

        start();
    }

    function start() {
        changeTime(6, 1000);
        changeTime(5, 10000);
        changeTime(4, 60000);
        changeTime(3, 600000);
        changeTime(2, 3600000);
        changeTime(1, 36000000);
    }

    function changeTime(index, time) {
        setInterval(function () {
            var con = doms["con" + index];
            var imgs = con.querySelectorAll("img");
            var first = imgs[0];
            var second = imgs[1];
            var num = parseInt(first.getAttribute("timeNum"));
            con.style.transition = "all 0.3s linear";
            con.style.top = -timerH + "px";
            num = num - 1;
            if (num < 0) {
                num = 9;
            }
            var num2 = num - 1;
            if (num2 < 0) {
                num2 = maxNum[index - 1];
            }
            con.addEventListener("transitionend", function (first, num2) {
                this.style.transition = "none";
                // setConHtml(con, num, num2);
                first.src = `images/${num2}.png`;
                first.setAttribute("timeNum", num2);
                this.appendChild(first);
                this.style.top = 0;
            }.bind(con, first, num2));
        }, time);
    }

    function setConHtml(con, num, num2) {
        con.innerHTML = `<img cid="img1" timeNum=${num} src="images/${num}.png"><img cid="img2" timeNum=${num2} src="images/${num2}.png">`;
    }

    function getTimerString() {
        var hour = parseInt(timerNum / 3600);
        var minute = parseInt((timerNum / 60) % 60);
        var second = parseInt(timerNum % 60);
        // console.log(hour, minute, second);
        return hour + "" + minute + "" + second;
    }

    init();
})();
