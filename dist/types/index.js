"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variants = exports.isCustomOption = void 0;
function isCustomOption(option) {
    return option.__isNew__;
}
exports.isCustomOption = isCustomOption;
exports.variants = [
    'default',
    'blue',
    'lightBlue',
    'turquoise',
    'green',
    'yellow',
    'red',
    'magenta',
    'purple',
    'violet'
];
