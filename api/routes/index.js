const routeApiGet = require("./upload.route");
const routeApiPost = require("./download.route");
const routeApiDelete = require("./delete.route");
const routeApiPut = require("./edit.route");
const routeRes = require("./resource.route")

module.exports.routes = {
    get: routeApiGet,
    post: routeApiPost,
    del: routeApiDelete,
    put: routeApiPut,
    res: routeRes
}