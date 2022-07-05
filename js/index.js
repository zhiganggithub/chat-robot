(async ()=> {

    const doms = {
        chatContainer: $('.chat-container'),
        msg: {
            container: $('.msg-container'),
            input: $("#txtMsg"),
            sendBtn: $(".msg-container button")
        },
        aside: {
            nickname: $('.aside-name'),
            loginId: $('.aside-account')
        },
        close: $('.close'),
    };

    const user = await API.getUserInfo();
    if (user.code) {
        alert("未登录或登录已过期，请重新登录")
        window.location.href = './login.html';
        return;
    }

    // init
    function init() {
        setUserInfo();
        getChatHistory();

        doms.close.onclick = logOut;
        doms.msg.sendBtn.onclick = sendMessage;
        doms.msg.container.onsubmit = sendMessage;
    }

    function setUserInfo() {
        doms.aside.loginId.innerText = user.data.loginId;
        doms.aside.nickname.innerText = user.data.nickname;
    }

    async function getChatHistory() {
        const history = await API.getChatHistory();
        for (let i = 0; i < history.data.length; i++) {
            const data = history.data[i];
            addChat(data);
        }
        scrollBottom();
    }

    function scrollBottom() {
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
    }

    /**
     *  content: "123"
        createdAt: 1656728969740
        from: "han"
        to: null
     * @param {*} data 
     */
    function addChat(data) {
        const item = $$$('div');
        item.classList.add('chat-item');
        if (data.from) {
            item.classList.add('me');
        }
        const imgAvatar = $$$('img');
        imgAvatar.className = 'chat-avatar';
        imgAvatar.src = './asset/robot-avatar.jpg';

        const content = $$$('div');
        content.className = 'chat-content';
        content.innerText = data.content;

        const date = $$$('div');
        date.className = 'chat-date';
        date.innerText = formatDate(data.createdAt);

        item.appendChild(imgAvatar);
        item.appendChild(content);
        item.appendChild(date);

        doms.chatContainer.appendChild(item);
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    async function sendMessage(e) {
        e.preventDefault();
        const content = doms.msg.input.value;
        let data = {
            content,
            createdAt: Date.now(),
            from: doms.aside.loginId.innerText,
            to: null
        }
        addChat(data);
        doms.msg.input.value = '';
        scrollBottom();

        const resp = await API.sendChat(content);
        console.log(resp)
        addChat({
            content: resp.data.content,
            createdAt: resp.data.createdAt,
            from: null,
            to: doms.aside.loginId.innerText
        });
        scrollBottom();
    }

    function logOut() {
        API.logOut();
        alert('退出成功，点击跳转到登录页面')
        window.location.href = './login.html';
    }

    init();
})()