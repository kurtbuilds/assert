import * as assert from '../index'


describe("assert", () => {
    it("should be defined", function () {
        try {
            assert.is_true(false)
        } catch (_e) {
            let e = _e as Error;
            let match = /Assertion failed/.exec(e.message)
            if (match == null) {
                throw new Error("Expected Assertion failed, got " + e.message)
            }
            match = /^.*__tests__/.exec(e.stack!)
            if (match == null) {
                throw new Error("__tests__ was not the first line of the stack.")
            }
        }
    })
})