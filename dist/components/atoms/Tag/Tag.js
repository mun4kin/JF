"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Tag.scss");
var Tag = function (_a) {
    var children = _a.children, onClick = _a.onClick, onRemove = _a.onRemove, disabled = _a.disabled, _b = _a.variant, variant = _b === void 0 ? 'default' : _b;
    var handleClick = function (e) {
        e.preventDefault();
        onClick && onClick();
    };
    var handleRemove = function (e) {
        e.stopPropagation();
        onRemove && onRemove();
    };
    // -------------------------------------------------------------------------------------------------------------------
    var clickableClass = onClick ? 'rf-tag--clickable' : '';
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: "rf-tag " + clickableClass + " rf-tag--" + variant, onClick: handleClick },
        children,
        onRemove && react_1.default.createElement("div", { className: 'rf-tag__remove', onClick: handleRemove }, "X")));
};
exports.default = Tag;
