class Tools {
    /**
     * 获取路由中间件集合
     * @param {*} wareGroupInstanc 中间件方法集合对象
     * @param {*} wareNames []Array中间件名称数组
     * @returns []Array 中间件方法
     */
    getRouterMiddleWareByWareNames(wareGroupInstanc,wareNames) {
        const rtn = []
        wareNames.forEach(ware => {
            if (wareGroupInstanc[ware]) {
                rtn.push(wareGroupInstanc[ware])
            }
        });
        return rtn
    }

    replacePathLine(path) {
        return path.replace('/','')
    }
}

module.exports = new Tools()