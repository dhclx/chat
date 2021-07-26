"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// those individual imports are types from @types/express:
var express_1 = __importDefault(require("express"));
// setup:
var app = express_1.default();
// we'll use x001 & x002 for socket & http(?)
var port = process.env.PORT || 5000;
// routes:
app.use('/', function (req, res, next) {
    res.status(200).send({ data: 'this should work :)' });
});
// start:
app.listen(port, function () { return console.log("server is listening on port " + port + "!"); });
//# sourceMappingURL=index.js.map