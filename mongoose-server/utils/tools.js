class Tools {
    getRouterMiddleWareByWareNames(wareGroupInstanc,wareNames) {
        const rtn = []
        wareNames.forEach(ware => {
            if (wareGroupInstanc[ware]) {
                rtn.push(wareGroupInstanc[ware])
            }
        });
        return rtn
    }
}

module.exports = new Tools()