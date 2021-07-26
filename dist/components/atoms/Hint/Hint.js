"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Hint.scss");
var InfoSolid_svg_1 = require("@openvtb/admiral-icons/build/service/InfoSolid.svg");
var Button_1 = __importDefault(require("../Button"));
var Hint = function (_a) {
    // const wrapper = useRef<HTMLDivElement>(null);
    var _b = _a.children, children = _b === void 0 ? 'Текстовое сообщение' : _b, _c = _a.button, button = _c === void 0 ? react_1.default.createElement(Button_1.default, { buttonType: 'text' }, "Text Button") : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.variant, variant = _e === void 0 ? 'default' : _e, _f = _a.icon, icon = _f === void 0 ? 'info' : _f, _g = _a.title, title = _g === void 0 ? 'Заголовок сообщения' : _g, _h = _a.maxWidth, maxWidth = _h === void 0 ? '648px' : _h;
    return (react_1.default.createElement("div", { style: { maxWidth: maxWidth }, className: "rf-hint__wrapper rf-hint__" + variant + " " + className + " " },
        icon === 'info' &&
            react_1.default.createElement("div", { className: 'rf-hint__icon' },
                react_1.default.createElement(InfoSolid_svg_1.ReactComponent, null)),
        react_1.default.createElement("div", { className: 'rf-hint__body' },
            react_1.default.createElement("div", { className: 'rf-hint__title-text' },
                "   ",
                title),
            react_1.default.createElement("div", { className: 'rf-hint__message' },
                " ",
                children,
                " "),
            !!button && button)));
};
exports.default = Hint;
