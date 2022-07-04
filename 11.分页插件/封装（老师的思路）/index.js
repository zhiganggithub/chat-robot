function createPager(page, totalPages, mostNum, container) {
    container.innerHTML = "";

    var divPager = document.createElement("div");
    divPager.className = "pager";
    container.appendChild(divPager);

    function createAnchor(clsName, text, newPage) {
        var a = document.createElement("a");
        a.className = clsName;
        a.innerText = text;
        divPager.appendChild(a);
        a.onclick = function () {
            if (newPage < 1 || newPage > totalPages || newPage === page) {
                return;
            }
            createPager(newPage, totalPages, mostNum, container);
        };
    }

    // 首页和上一页
    createAnchor(page === 1 ? "disabled" : "", "首页", 1);
    createAnchor(page === 1 ? "disabled" : "", "上一页", page - 1);

    // 中间数字
    var min = Math.max(Math.floor(page - mostNum / 2), 1);
    var max = Math.min(min + mostNum - 1, totalPages);
    for (let i = min; i <= max; i++) {
        createAnchor(i === page ? "active" : "", i, i);
    }

    // 尾页和下一页
    createAnchor(page === totalPages ? "disabled" : "", "下一页", page + 1);
    createAnchor(page === totalPages ? "disabled" : "", "尾页", totalPages);

    // 当前页数/总页数
    var span = document.createElement("span");
    span.className = "pagerNum";
    span.innerText = page + '/' + totalPages;
    divPager.appendChild(span);
}
