

class FieldValidator {

    constructor(filedId, validateFunc) {
        this.input = $("#" + filedId);
        this.p = this.input.nextElementSibling;
        this.validateFunc = validateFunc;

        // this.input.onblur = this.validate.bind(this);
        // 或者用箭头函数绑定this指向
        this.input.onblur = () => {
            this.validate();
        };
    }

    /**
     * 开始验证
     * @returns 验证成功返回true,失败返回false
     */
    async validate() {
        const result = await this.validateFunc(this.input.value);
        this.p.innerText = result;
        return !result;
    }

    static async validate(...validators) {
        const promises = await validators.map(async v => await v.validate());
        const results = await Promise.all(promises);
        const ret = results.every(v=> v);
        return ret;
    }
}
