// routes/route/users.js

const router = require("koa-router")();
// 模块路由前缀
router.prefix("/users");

router.get("/", function (ctx, next) {
	ctx.body = "this a users response!";
});
router.get("/detail/:id", function (ctx, next) {
    console.log(ctx.state)
	ctx.body = "this a users response!";
});

/**
 * 用户登录接口
 * @param {username} 用户名
 * @param {password} 用户密码
 */
router.post("/login", async (ctx) => {
	const request = ctx.request.body;
	const { username, password } = request;
    const validateNotice = ctx.res.$validate(ctx.state.collectionusers.login, request, ctx.state.collectionusers.fields)
    console.log(validateNotice)
	if (username&&password) {
        ctx.res.$success('登录成功');
    } else {
        ctx.res.$error("请求失败", 403);
    }
});

module.exports = router;