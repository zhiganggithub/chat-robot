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
        startBtn: $("button"),
        txtHour: $("#txthour"),
        txtMinute: $("#txtminute"),
        txtSecond: $("#txtsecond"),
    };
    var timerNum = 23 * 3600 + 59 * 60 + 59;
    var maxNum = [2, 9, 5, 9, 5, 9];
    var timerH = doms.con1.clientHeight;
    // console.log(timerH);

    var timerId;

    doms.startBtn.onclick = function () {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
        timerNum = parseInt(doms.txtHour.value) * 3600 + parseInt(doms.txtMinute.value) * 60 + parseInt(doms.txtSecond.value);
        init();
    };

    function init() {
        var str = getTimerString();
        for (let i = 1; i <= str.length; i++) {
            let num = str[i - 1];
            var num2 = num - 1;
            if (num2 < 0) {
                num2 = maxNum[i - 1];
            }
            setConHtml(doms["con" + i], num, num2);
        }

        start();
    }

    function start() {
        timerId = setInterval(function () {
            timerNum--;
            changeTime();
        }, 1000);
    }

    function changeTime() {
        var str = getTimerString();
        // console.log(str);
        for (let i = 1; i <= str.length; i++) {
            let num = str[i - 1];
            var con = doms["con" + i];
            var imgs = con.querySelectorAll("img");
            var first = imgs[0];
            var firstnum = parseInt(first.getAttribute("timeNum"));
            con.style.transition = "all 0.3s linear";
            if (firstnum !== +num) {
                con.style.top = -timerH + "px";
            } else {
                con.style.top = 0;
            }
            if (num < 0) {
                num = maxNum[i - 1];
            }
            var num2 = num - 1;
            if (num2 < 0) {
                num2 = maxNum[i - 1];
            }
            con.addEventListener(
                "transitionend",
                function (n1, n2) {
                    this.style.transition = "none";
                    this.style.top = 0;
                    setConHtml(this, n1, n2);
                }.bind(con, num, num2)
            );
        }
    }

    function setConHtml(con, num, num2) {
        con.innerHTML = `<img cid="img1" timeNum=${num} src="images/${num}.png"><img cid="img2" timeNum=${num2} src="images/${num2}.png">`;
    }

    function getTimerString() {
        var hour = parseInt(timerNum / 3600).toString();
        var minute = parseInt((timerNum / 60) % 60).toString();
        var second = parseInt(timerNum % 60).toString();
        // console.log(hour, minute, second);
        return hour.padStart(2, "0") + minute.padStart(2, "0") + "" + second.padStart(2, "0");
    }

    init();
})();
