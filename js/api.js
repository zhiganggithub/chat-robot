var API = (() => {
    const BASE_URL = "https://study.duyiedu.com";
    const TOKEN_KEY = "token";

    function get(path) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, { headers });
    }

    async function post(path, bodyObj) {
        const headers = {
            "Content-Type": "application/json",
        };
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        console.log(JSON.stringify(bodyObj));
        const resp = await fetch(BASE_URL + path, { method: "POST", headers, body: JSON.stringify(bodyObj) });
        return resp;
    }

    async function reg(userInfo) {
        const resp = await post("/api/user/reg", userInfo);
        const data = await resp.json();
        return data;
    }

    async function login(loginInfo) {
        loginInfo = loginInfo || { loginId: "han", loginPwd: "123123" };
        const resp = await post("/api/user/login", loginInfo);
        const result = await resp.json();
        if (result.code === 0) {
            const token = resp.headers.get("authorization");
            console.log(token);
            localStorage.setItem(TOKEN_KEY, token);
        }
        console.log(result);
        return result;
    }

    async function exists(loginId) {
        loginId = loginId || "han";
        const resp = await get(`/api/user/exists?loginId=${loginId}`);
        const result = await resp.json();
        console.log(result);
        return result;
    }

    async function getUserInfo() {
        const userInfo = await get("/api/user/profile");
        const result = await userInfo.json();
        console.log(result);
        return result;
    }

    async function sendChat(content) {
        const resp = await post("/api/chat", { content });
        const result = await resp.json();
        console.log(result);
        return result;
    }

    async function getChatHistory() {
        const resp = await get("/api/chat/history");
        const result = await resp.json();
        console.log(result);
        return result;
    }

    function logOut() {
        localStorage.removeItem(TOKEN_KEY);
    }

    return {
        reg,
        login,
        exists,
        getUserInfo,
        sendChat,
        getChatHistory,
        logOut
    }
})();
