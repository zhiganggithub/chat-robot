const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
    if (!val) {
        return "请填写账号";
    }
    return "";
});
const loginPwdValidator = new FieldValidator("txtLoginPwd", async function (val) {
    if (!val) {
        return "请填写密码";
    }
    return "";
});

const form = $(".user-form");
form.onsubmit = async (e) => {
    e.preventDefault();

    const result = await FieldValidator.validate(
        loginIdValidator,
        loginPwdValidator,
    );
    if (!result) {
        return; // 验证未通过
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const regResult = await API.login(data);
    if (regResult.code) {
        alert("登录失败：" + regResult.msg);
    } else {
        alert("登录成功，点击跳转到首页！");
        window.location.href = "./index.html";
    }
};
