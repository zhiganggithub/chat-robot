(function () {
    var table = document.querySelector(".table");
    var uls = table.querySelectorAll(".line-data");
    var headers = table.querySelectorAll(".line-head li");
    var checkBoxAll = headers[0].children[0];
    var dataCheckBoxes = table.querySelectorAll(".line-data .cb");
    var selectedCount = 0;

    function init() {
        // 总单选框的事件
        checkBoxAll.onclick = function () {
            if (this.checked) {
                selectedCount = 5;
                selectAllCheckbox();
            } else {
                selectedCount = 0;
                cancelSelectAllCheckbox();
            }
        };
        // 其他单选框的事件
        for (var i = 0; i < dataCheckBoxes.length; i++) {
            dataCheckBoxes[i].children[0].onclick = function () {
                if (this.checked) {
                    selectedCount++;
                } else {
                    selectedCount--;
                }
                checkBoxAll.checked = selectedCount === dataCheckBoxes.length;
            };
        }

        // 顶部其他标题的事件
        for (let i = 1; i < headers.length; i++) {
            headers[i].onclick = function () {
                sortTable(i);
            };
        }
    }

    function selectAllCheckbox() {
        for (var i = 0; i < dataCheckBoxes.length; i++) {
            dataCheckBoxes[i].children[0].checked = true;
        }
    }

    function cancelSelectAllCheckbox() {
        for (var i = 0; i < dataCheckBoxes.length; i++) {
            dataCheckBoxes[i].children[0].checked = false;
        }
    }

    init();

    /**
     * 排序
     * @param {number} type 排序类型 1:编号，2:姓名，3:年龄，4:职业
     */
    function sortTable(type) {
        var ulsArray = Array.prototype.slice.call(uls);
        
        // console.dir(ul1.children[type].children[0].innerText);
        ulsArray.sort(function (ul1, ul2) {
            var text1 = ul1.children[type].children[0].innerText;
            var text2 = ul2.children[type].children[0].innerText;
            if ([1, 3].includes(type)) { // 数字类型
                return +text1 - +text2;
            } else { //
                return text1.localeCompare(text2);
            }
        });
        for (var i = 0; i < ulsArray.length; i++) {
            table.appendChild((ulsArray[i]))
        }
        console.log(ulsArray);
    }
})();
