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
require("./Input.scss");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Input = function (_a) {
    var _b, _c;
    var onClear = _a.onClear, _d = _a.debounce, debounce = _d === void 0 ? 300 : _d, icon = _a.icon, props = __rest(_a, ["onClear", "debounce", "icon"]);
    /** Ref */
    var ref = react_1.useRef(null);
    /** Значение поля */
    var _e = react_1.useState(((_b = props.defaultValue) === null || _b === void 0 ? void 0 : _b.toString()) || ((_c = props.value) === null || _c === void 0 ? void 0 : _c.toString()) || ''), value = _e[0], setValue = _e[1];
    // ------------------------------------------------------------------------------------------------------------------
    react_1.useEffect(function () {
        /** Подписываемся на ввод текста */
        var sub;
        if (ref.current) {
            sub = rxjs_1.fromEvent(ref.current, 'keyup')
                .pipe(operators_1.map(function (e) { return e; }), operators_1.debounceTime(debounce), operators_1.distinctUntilChanged())
                .subscribe(function (e) {
                setValue(e.target.value);
                props.onKeyUp && props.onKeyUp(e);
            });
        }
        return function () {
            try {
                sub && sub.unsubscribe();
            }
            catch (e) {
                console.log(e);
            }
        };
    }, [onClear, debounce, props.onKeyUp]);
    // ------------------------------------------------------------------------------------------------------------------
    /** Очистка поля ввода и сброс результатов поиска */
    var clearInput = function () {
        if (ref.current) {
            ref.current.value = '';
            setValue('');
            onClear && onClear();
        }
    };
    /** Кнопка поиска и сброса */
    var closeButton = onClear && value.length > 0 && (react_1.default.createElement("button", { className: 'rf-input__action', onClick: clearInput }, "X"));
    // ------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: "rf-input " + (props.className || '') },
        react_1.default.createElement("input", __assign({}, props, { ref: ref, className: 'rf-input__field', autoComplete: 'off', type: props.type || 'text' })),
        icon ? react_1.default.createElement("button", { className: 'rf-input__action' }, icon) : closeButton));
};
exports.default = Input;
