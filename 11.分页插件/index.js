(function () {
    function $(selector) {
        return document.querySelector(selector);
    }

    function $$(selector) {
        return document.querySelectorAll(selector);
    }

    var doms = {
        page: $(".page"),
        list: $$(".page a"),
        first: $(".page #first"),
        last: $(".page #last"),
        next: $(".page #next"),
        end: $(".page #end"),
        span: $(".page span"),
    };

    var showTotalPage = 9;
    var totalPage = 20;
    var currentPage = 1;
    var showFirstPage = 1;
    var pageList = [];

    function init() {
        doms.first.onclick = onClickFirst;
        doms.last.onclick = onClickLast;
        doms.next.onclick = onClickNext;
        doms.end.onclick = onClickEnd;

        for (let i = 0; i < showTotalPage; i++) {
            var a = document.createElement("a");
            a.innerText = i + 1;
            doms.page.appendChild(a);
            pageList.push(a);
            a.onclick = function () {
                onClickLink(i);
            };
        }

        doms.page.appendChild(doms.next);
        doms.page.appendChild(doms.end);
        doms.page.appendChild(doms.span);
        onChangePage(1);
    }

    function onClickFirst(e) {
        // e.preventDefault(); // a没有href属性就不需要阻止默认事件
        if (currentPage === 1) {
            return;
        }
        onChangePage(1);
    }
    function onClickLast(e) {
        // e.preventDefault();
        if (currentPage === 1) {
            return;
        }
        onChangePage(--currentPage);
    }
    function onClickNext(e) {
        // e.preventDefault();
        if (currentPage === totalPage) {
            return;
        }
        onChangePage(++currentPage);
    }
    function onClickEnd(e) {
        // e.preventDefault();
        if (currentPage === totalPage) {
            return;
        }
        onChangePage(totalPage);
    }
    function onClickLink(index) {
        console.log(index);
        onChangePage(showFirstPage + index);
    }

    function onChangePage(page) {
        currentPage = page;
        console.log(page);
        doms.first.className = page === 1 ? "disabled" : "";
        doms.last.className = page === 1 ? "disabled" : "";
        doms.next.className = page === totalPage ? "disabled" : "";
        doms.end.className = page === totalPage ? "disabled" : "";

        showFirstPage = 1;
        if (currentPage > showTotalPage / 2) {
            showFirstPage = currentPage - Math.floor(showTotalPage / 2);
        }
        if (currentPage + Math.floor(showTotalPage / 2) > totalPage) {
            showFirstPage = totalPage - showTotalPage + 1;
        }
        console.log(currentPage, showFirstPage);
        for (var i = 0; i < pageList.length; i++) {
            pageList[i].innerText = showFirstPage + i;
        }

        var beforeActive = $(".page .active");
        if (beforeActive) {
            beforeActive.className = "";
        }
        var curDom = pageList[page - showFirstPage];
        curDom.className = "active";

        doms.span.innerText = currentPage + "/" + totalPage;
    }

    init();
})();
