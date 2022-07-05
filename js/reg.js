const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
    if (!val) {
        return "请填写账号";
    }

    const result = await API.exists(val);
    if (result.data) {
        return "账号已存在，请重新输入一个账号";
    }
    return "";
});
const nicknameValidator = new FieldValidator("txtNickname", async function (val) {
    if (!val) {
        return "请填写昵称";
    }
    return "";
});
const loginPwdValidator = new FieldValidator("txtLoginPwd", async function (val) {
    if (!val) {
        return "请填写密码";
    }
    return "";
});
const loginPwdConfirmValidator = new FieldValidator("txtLoginPwdConfirm", async function (val) {
    if (!val) {
        return "请确认密码";
    }
    if (val !== $("#txtLoginPwd").value) {
        return "两次密码不一致，请重新输入";
    }
    return "";
});

const form = $(".user-form");
form.onsubmit = async (e) => {
    e.preventDefault();

    const result = await FieldValidator.validate(
        loginIdValidator,
        nicknameValidator,
        loginPwdValidator,
        loginPwdConfirmValidator
    );
    if (!result) {
        return; // 验证未通过
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const regResult = await API.reg(data);
    if (regResult.code) {
        alert(regResult.msg);
    } else {
        alert("注册成功，点击跳转登录页面！");
        window.location.href = "./login.html";
    }
};
