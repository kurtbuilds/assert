"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_true = exports.exists = exports.nullish = exports.deep_equal = exports.throws = exports.equal = void 0;
const util_1 = require("util");
function to_string(o) {
    return (0, util_1.inspect)(o, { sorted: true });
}
function assert_message(s, left, right) {
    s = s ?? 'Assertion failed.';
    let comparison = `\n\x1b[0mGot: \x1b[31m${left}\n\x1b[0mExpected: \x1b[32m${right}\x1b[0m`;
    return new AssertionError(s, comparison);
}
class AssertionError extends Error {
    comparison;
    name = 'AssertionError';
    constructor(message, comparison) {
        super('');
        this.comparison = comparison;
        this.stack = this.stack?.split('\n')
            .slice(7).join('\n');
        this.message = message + comparison;
    }
}
function equal(left, right, message) {
    if (left === right) {
        return;
    }
    else if (typeof left === 'object' && typeof right === 'object' && eq_deep_equal(left, right)) {
        return;
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), to_string(right));
    }
    else {
        throw message;
    }
}
exports.equal = equal;
function throws(fn) {
    try {
        fn();
    }
    catch (e) {
        return;
    }
    throw new AssertionError('Expected function to throw but it did not.', '');
}
exports.throws = throws;
function is_object(o) {
    return o != null && typeof o === 'object';
}
function eq_deep_equal(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = is_object(val1) && is_object(val2);
        if (areObjects && !eq_deep_equal(val1, val2) ||
            !areObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
}
function deep_equal(left, right, message) {
    if (eq_deep_equal(left, right)) {
        return;
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), to_string(right));
    }
    else {
        throw message;
    }
}
exports.deep_equal = deep_equal;
function nullish(left, message) {
    if (left == null) {
        return;
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), 'null or undefined');
    }
    else {
        throw message;
    }
}
exports.nullish = nullish;
function exists(left, message) {
    if (left != null) {
        return;
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), 'an object');
    }
    else {
        throw message;
    }
}
exports.exists = exists;
function is_true(left, message) {
    if (left === true) {
        return;
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), 'true');
    }
    else {
        throw message;
    }
}
exports.is_true = is_true;
//# sourceMappingURL=index.js.map