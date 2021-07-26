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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var helpers_1 = require("../../../utils/helpers");
require("./Button.scss");
var Button = function (_a) {
    var _b = _a.type, type = _b === void 0 ? 'button' : _b, _c = _a.size, size = _c === void 0 ? 'm' : _c, _d = _a.fullWidth, fullWidth = _d === void 0 ? false : _d, _e = _a.buttonType, buttonType = _e === void 0 ? 'primary' : _e, preloader = _a.preloader, props = __rest(_a, ["type", "size", "fullWidth", "buttonType", "preloader"]);
    var classesMap = {
        primary: 'rf-button--primary',
        light: 'rf-button--light',
        secondary: 'rf-button--secondary',
        ghost: 'rf-button--ghost',
        danger: 'rf-button--danger',
        icon: 'rf-button--icon',
        text: 'rf-button--text',
    };
    var widthClass = fullWidth ? 'rf-button__full-width' : '';
    // -------------------------------------------------------------------------------------------------------------------
    var _f = react_1.useState(false), pressed = _f[0], setPressed = _f[1];
    /** Состояние pressed */
    var onMouseDown = function () {
        setPressed(true);
    };
    react_1.useEffect(function () {
        var onMouseUp = function () {
            setPressed(false);
        };
        window.addEventListener('mouseup', onMouseUp);
        return function () {
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);
    var pressedClass = pressed ? 'rf-button--pressed' : '';
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("button", __assign({}, props, { type: type, onMouseDown: onMouseDown, className: "rf-button " + classesMap[buttonType] + " " + helpers_1.sizeClass[size] + " " + widthClass + " " + pressedClass + " " + (props.className || '') }), preloader === undefined ? props.children : preloader ? react_1.default.createElement("div", null, "loading...") : props.children));
};
exports.default = Button;
