(function () {
    var bg = document.querySelector(".bg");
    var container = document.querySelector(".container");
    var review = document.querySelector("#review");
    // var button = document.querySelector("button");
    var size = 14; // 棋盘的格子数量
    var gridSize = 24; // 每个格子的大小
    var bgPadding = gridSize / 2; // 棋盘背景的padding
    var containerX;
    var containerY;
    var chessArr = [];
    var chessRecords = [];
    var chessClass = [
        {
            c: "chess chess-white chess-hw",
        },
        {
            c: "chess chess-black chess-hw",
        },
    ];
    var chessType = 0; // 棋子类型 0白色 1黑色，默认白棋先走
    var chessStep = 0;
    var isGameOver = false;

    function init() {
        bg.style.width = size * gridSize + gridSize + "px";
        bg.style.height = size * gridSize + gridSize + "px";
        bg.style.padding = bgPadding + "px ";

        container.style.width = size * gridSize + "px";

        function _createLi(i, j) {
            var li = document.createElement("li");
            li.className = "fl";
            li.setAttribute("xpos", j);
            li.setAttribute("ypos", i);
            container.appendChild(li);
        }

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                _createLi(i, j);
            }
        }

        for (let i = 0; i <= size; i++) {
            for (let j = 0; j <= size; j++) {
                if (!chessArr[i]) {
                    chessArr[i] = [];
                }
                chessArr[i][j] = 0;
            }
        }

        // console.log(chessArr);

        container.onclick = onClickContainer;
        review.onclick = onClickButton;

        onResize();
    }

    init();

    function onClickButton() {
        if (!isGameOver) {
            return;
        }
        var time = window.prompt("请输入回放时间间隔:(ms)");
        review.className = 'dn';
        // 清除所有棋子
        var chesses = container.querySelectorAll(".chess");
        for (var i = 0; i < chesses.length; i++) {
            chesses[i].remove();
        }
        chessStep = 0;
        var timerId = setInterval(function() {
            if (chessStep === chessRecords.length) {
                console.log("清理")
                clearInterval(timerId);
                showChessNumber(chessRecords[chessStep - 1].type + 1);
                return;
            }
            var { type, xpos, ypos } = chessRecords[chessStep];
            createChess(type, xpos, ypos, true);
            // console.log("step: " + chessStep , chessRecords.length, timerId);
        }, time);
    }

    function onClickContainer(e) {
        if (isGameOver) {
            console.log("GameOver ！");
            return;
        }
        var clickX = e.clientX - containerX;
        var clickY = e.clientY - containerY;
        // console.log(clickX, clickY);
        var li = e.target;
        var xpos = li.getAttribute("xpos");
        var ypos = li.getAttribute("ypos");
        xpos = Math.floor((clickX + gridSize / 2) / gridSize);
        ypos = Math.floor((clickY + gridSize / 2) / gridSize);
        // console.log(xpos, ypos);
        if (!xpos === undefined || ypos === undefined || chessArr[ypos][xpos] !== 0) {
            console.log("此位置已经有棋子了！");
            return;
        }
        createChess(chessType, xpos, ypos);
        chessType = 1 - chessType;

        setTimeout(checkGameOver, 100);
    }

    function checkGameOver() {
        // console.log(chessArr.length);
        for (let i = 0; i < chessArr.length; i++) {
            var chessLine = chessArr[i];
            // console.log("chessLine: ", chessLine.join(","));
            let j;
            for (j = 0; j < chessLine.length; j++) {
                // 横向
                if (
                    chessLine[j] !== 0 &&
                    j <= chessLine.length - 5 &&
                    chessLine[j] === chessLine[j + 1] &&
                    chessLine[j] === chessLine[j + 2] &&
                    chessLine[j] === chessLine[j + 3] &&
                    chessLine[j] === chessLine[j + 4]
                ) {
                    showChessNumber(chessLine[j]);
                    break;
                }
                // 纵向
                if (
                    chessLine[j] !== 0 &&
                    i <= chessArr.length - 5 &&
                    chessLine[j] === chessArr[i + 1][j] &&
                    chessLine[j] === chessArr[i + 2][j] &&
                    chessLine[j] === chessArr[i + 3][j] &&
                    chessLine[j] === chessArr[i + 4][j]
                ) {
                    showChessNumber(chessLine[j]);
                    break;
                }
                // 左下斜
                if (
                    chessLine[j] !== 0 &&
                    i <= chessArr.length - 5 &&
                    chessLine[j] === chessArr[i + 1][j - 1] &&
                    chessLine[j] === chessArr[i + 2][j - 2] &&
                    chessLine[j] === chessArr[i + 3][j - 3] &&
                    chessLine[j] === chessArr[i + 4][j - 4]
                ) {
                    showChessNumber(chessLine[j]);
                    break;
                }
                // 右下斜
                if (
                    chessLine[j] !== 0 &&
                    i <= chessArr.length - 5 &&
                    chessLine[j] === chessArr[i + 1][j + 1] &&
                    chessLine[j] === chessArr[i + 2][j + 2] &&
                    chessLine[j] === chessArr[i + 3][j + 3] &&
                    chessLine[j] === chessArr[i + 4][j + 4]
                ) {
                    showChessNumber(chessLine[j]);
                    break;
                }
            }
        }
    }

    function showChessNumber(winValue) {
        isGameOver = true;
        // console.log("winValue: " + winValue);
        var chesses = container.querySelectorAll(".chess");
        for (var i = 0; i < chesses.length; i++) {
            var chess = chesses[i];
            chess.className = chess.className.replace("chess-hw", "");
            // console.log(parseInt(chess.getAttribute("chessValue")))
            if (parseInt(chess.getAttribute("chessValue")) === winValue) {
                chess.className += " win";
            }
        }
        review.className = 'db';
    }

    function createChess(type, xpos, ypos, isRecord = false) {
        chessStep++;
        var chess = document.createElement("div");
        chess.className = chessClass[type].c;
        chess.style.left = xpos * gridSize + "px";
        chess.style.top = ypos * gridSize + "px";
        chess.setAttribute("chessValue", type + 1);
        chessArr[ypos][xpos] = type + 1;
        if (!isRecord) {
            chessRecords.push({
                type,
                xpos,
                ypos,
            });
        }
        chess.innerText = chessStep;
        container.appendChild(chess);

        // console.log(chessArr);
        // console.log(chessRecords);
    }

    window.onresize = debounce(onResize, 500);

    function onResize() {
        var bgMargin = (window.innerWidth - parseInt(bg.style.width)) >> 1;
        containerX = bgMargin + bgPadding;
        containerY = bg.offsetTop + bgPadding;
        // console.log("containerX: " + containerX, containerY);
    }

    function debounce(fn, delay) {
        var timerId = null;
        var newFunc = function () {
            var args = Array.prototype.slice.call(arguments);
            clearTimeout(timerId);
            timerId = setTimeout(function () {
                fn.apply(this, args);
            }, delay);
        };
        return newFunc;
    }
})();
