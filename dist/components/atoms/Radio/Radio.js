"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Radio.scss");
var Radio = function (_a) {
    var label = _a.label, value = _a.value, _b = _a.icon, icon = _b === void 0 ? true : _b, props = __rest(_a, ["label", "value", "icon"]);
    /** Отображение иконки */
    var withIcon = icon ? (react_1.default.createElement("span", { className: 'rf-radio__circle' },
        react_1.default.createElement("span", { className: 'rf-radio__mark' }))) : ('');
    return (react_1.default.createElement("label", { className: "rf-radio " + (props.className || '') + " " + (props.disabled ? 'disabled' : '') },
        react_1.default.createElement("input", __assign({}, props, { type: 'radio', className: 'rf-radio__input', value: value })),
        withIcon,
        react_1.default.createElement("span", { className: 'rf-radio__label' }, label)));
};
exports.default = Radio;
