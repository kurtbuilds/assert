import {inspect} from 'util'

function to_string(o: any): string {
    return inspect(o, {sorted: true})
}


function assert_message(s: string | undefined, left: string, right: string): AssertionError {
    s = s ?? 'Assertion failed.'
    let comparison = `\n\x1b[0mGot: \x1b[31m${left}\n\x1b[0mExpected: \x1b[32m${right}\x1b[0m`
    return new AssertionError(s, comparison)
}


class AssertionError extends Error {
    name = 'AssertionError'
    constructor(message: string, public comparison: string) {
        super('')
        let stack = this.stack!.split('\n')
        const start = stack.indexOf("AssertionError")
        stack = stack.slice(start)
        const end = stack.findIndex(line => line.search(/node_modules\/(vitest|mocha)\//) > -1)
        this.stack = stack
            .slice(3, end).join('\n')
        this.message = message + comparison
    }
}

export function equal<T>(left: T, right: T, message?: string | Error): void {
    if (left === right) {
        return
    } else if (typeof left === 'object' && typeof right === 'object' && eq_deep_equal(left, right)) {
        return
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), to_string(right))
    } else {
        throw message
    }
}

export function throws(fn: () => void) {
    try {
        fn()
    } catch (e) {
        return
    }
    throw new AssertionError('Expected function to throw but it did not.', '')
}


function is_object(o: any): boolean {
    return o != null && typeof o === 'object'
}


function eq_deep_equal(object1: any, object2: any): boolean {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)

    if (keys1.length !== keys2.length) {
        return false
    }

    for (const key of keys1) {
        const val1 = object1[key]
        const val2 = object2[key]
        const areObjects = is_object(val1) && is_object(val2)
        if (
            areObjects && !eq_deep_equal(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false
        }
    }
    return true
}


export function deep_equal<T>(left: T, right: T, message?: string | Error): void {
    if (eq_deep_equal(left, right)) {
        return
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), to_string(right))
    } else {
        throw message
    }
}


export function nullish<T>(left: T, message?: string | Error): void {
    if (left == null) {
        return
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), 'null or undefined')
    } else {
        throw message
    }
}


export function exists<T>(left: T, message?: string | Error): void {
    if (left != null) {
        return
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), 'an object')
    } else {
        throw message
    }
}


export function is_true(left: boolean, message?: string | Error): void {
    if (left === true) {
        return
    }
    if (message === undefined || typeof message === 'string') {
        throw assert_message(message, to_string(left), 'true')
    } else {
        throw message
    }
}