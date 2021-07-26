"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Select.scss");
var Input_1 = __importDefault(require("../Input"));
// import { ReactComponent as Close } from '../../../icons/close.svg';
// import { ReactComponent as Chevron } from '../../../icons/chevron-down.svg';
var Tag_1 = __importDefault(require("../Tag"));
var useClickOutside_1 = __importDefault(require("../../../hooks/useClickOutside"));
var Select = function (_a) {
    var options = _a.options, onChange = _a.onChange, onSearch = _a.onSearch, _b = _a.defaultValues, defaultValues = _b === void 0 ? [] : _b, _c = _a.multiselect, multiselect = _c === void 0 ? false : _c, _d = _a.placeholder, placeholder = _d === void 0 ? '' : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.readOnly, readOnly = _f === void 0 ? false : _f, _g = _a.maxOptions, maxOptions = _g === void 0 ? options.length : _g, _h = _a.preloader, preloader = _h === void 0 ? false : _h, _j = _a.tagsPosition, tagsPosition = _j === void 0 ? 'inside' : _j, _k = _a.clearOnSelect, clearOnSelect = _k === void 0 ? false : _k, clearHook = _a.clearHook;
    var _l = react_1.useState(false), showDropdown = _l[0], toggleDropdown = _l[1];
    var componentNode = react_1.useRef(null);
    // -------------------------------------------------------------------------------------------------------------------
    /** Клик в сторону */
    var handleClickOutside = react_1.useCallback(function () {
        if (showDropdown) {
            toggleDropdown(false);
        }
    }, [showDropdown, multiselect]);
    useClickOutside_1.default(componentNode, handleClickOutside);
    // -------------------------------------------------------------------------------------------------------------------
    var _m = react_1.useState(function () {
        return defaultValues.length > 0 && !multiselect ? defaultValues[0].label : '';
    }), inputValue = _m[0], setInputValue = _m[1];
    var openDropdown = function () {
        toggleDropdown(true);
    };
    /** Очистка селекта */
    var onClear = function (e) {
        e.stopPropagation();
        setInputValue('');
        toggleDropdown(true);
        if (!multiselect) {
            setValues([]);
        }
        onSearch && onSearch('');
    };
    /** Очистка при изменении извне через clearHook */
    react_1.useEffect(function () {
        if (!multiselect) {
            setValues([]);
        }
        if (clearHook === undefined) {
            return;
        }
        setInputValue('');
        onSearch && onSearch('');
    }, [clearHook]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Поиск в селекте */
    var onSelectSearch = function (e) {
        setInputValue(e.target.value);
    };
    react_1.useEffect(function () {
        if (onSearch) {
            onSearch(inputValue);
            return;
        }
        var filtered = options.filter(function (o) { return o.label.toLowerCase().includes(inputValue.toLowerCase()); });
        setFilteredOptions(filtered);
    }, [inputValue]);
    // -------------------------------------------------------------------------------------------------------------------
    var _o = react_1.useState(function () { return defaultValues; }), values = _o[0], setValues = _o[1];
    var _p = react_1.useState({}), selectedMap = _p[0], setSelectedMap = _p[1];
    react_1.useEffect(function () {
        if (!values) {
            return;
        }
        var map = values.reduce(function (acc, o) {
            acc[o.value] = true;
            return acc;
        }, {});
        onChange(values);
        setSelectedMap(map);
    }, [values]);
    var onValueChange = function (option) {
        if (multiselect) {
            var index_1 = values.findIndex(function (o) { return option.value === o.value; });
            if (index_1 >= 0) {
                setValues(function (values) { return values.filter(function (_, i) { return i !== index_1; }); });
            }
            else {
                if (values.length < maxOptions) {
                    setValues(function (values) { return __spreadArray(__spreadArray([], values), [option]); });
                }
            }
        }
        else {
            setValues([option]);
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    var _q = react_1.useState([]), filteredOptions = _q[0], setFilteredOptions = _q[1];
    react_1.useEffect(function () {
        setFilteredOptions(options);
    }, [options]);
    // -------------------------------------------------------------------------------------------------------------------
    var listJSX = filteredOptions.map(function (o) {
        var disabled = o.disabled || false;
        var active = selectedMap[o.value] || false;
        var handleChange = function (e) {
            e.stopPropagation();
            onValueChange(o);
            if (!multiselect) {
                setInputValue(clearOnSelect ? '' : o.label);
                toggleDropdown(false);
            }
            else {
                setInputValue('');
            }
        };
        var disabledClass = disabled ? 'rf-select__list-element--disabled' : '';
        var activeClass = active ? 'rf-select__list-element--active' : '';
        return (react_1.default.createElement("div", { className: "rf-select__list-element " + disabledClass + " " + activeClass, key: o.value, onClick: handleChange }, o.label));
    });
    // -------------------------------------------------------------------------------------------------------------------
    var tagsRef = react_1.useRef(null);
    var tagsClass = tagsPosition === 'inside' ? 'rf-select__tags--inside' : 'rf-select__tags--outside';
    var tagsJSX = multiselect && values.length > 0 && (react_1.default.createElement("div", { className: "rf-select__tags " + tagsClass, ref: tagsRef, onClick: function () { return !disabled && toggleDropdown(true); } }, values.map(function (t) { return (react_1.default.createElement("div", { className: 'rf-select__tag', key: t.value },
        react_1.default.createElement(Tag_1.default, { onRemove: function () { return onValueChange(t); }, disabled: disabled }, t.label))); })));
    var _r = react_1.useState(20), paddingLeft = _r[0], setPaddingLeft = _r[1];
    react_1.useLayoutEffect(function () {
        if (!multiselect || tagsPosition === 'outside') {
            return;
        }
        var LEFT = 20;
        if (!tagsRef.current) {
            setPaddingLeft(LEFT);
            return;
        }
        var width = tagsRef.current.getBoundingClientRect().width;
        setPaddingLeft(width + 28);
    }, [values, multiselect]);
    // -------------------------------------------------------------------------------------------------------------------
    var closeButton = !disabled && !readOnly && inputValue.length > 0 && (react_1.default.createElement("button", { className: 'rf-select__button', onClick: onClear }, "X"));
    var chevronButton = !disabled && (readOnly || inputValue.length === 0) && (react_1.default.createElement("button", { className: "rf-select__button " + (showDropdown ? 'rf-select__button--rotate' : ''), onClick: function () { return toggleDropdown(function (state) { return !state; }); } }, "V"));
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: 'rf-select', ref: componentNode },
        react_1.default.createElement("div", { className: 'rf-select__wrapper' },
            react_1.default.createElement(Input_1.default, { style: { paddingLeft: paddingLeft + "px" }, onClick: openDropdown, onChange: onSelectSearch, value: inputValue, disabled: disabled, readOnly: readOnly, placeholder: disabled || (multiselect && tagsPosition === 'inside' && values.length === maxOptions) ? '' : placeholder }),
            tagsPosition === 'inside' && tagsJSX,
            closeButton,
            chevronButton),
        showDropdown && filteredOptions.length > 0 && (react_1.default.createElement("div", { className: 'rf-select__list' }, preloader ? (react_1.default.createElement("div", { className: 'rf-select__list-preloader' }, "Loading...")) : listJSX)),
        tagsPosition === 'outside' && tagsJSX));
};
exports.default = Select;
