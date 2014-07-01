var PEG    = require("pegjs"),
    assert = require("chai").assert,
    fs     = require("fs"),
    data,
    parse,
    assert_eq;

// Read file contents
data = fs.readFileSync("scheme.peg", "utf-8");
parse = PEG.buildParser(data).parse;
assert_eq = assert.deepEqual;

describe("peg", function () {
    it("should parse an atom", function () {
        assert_eq(parse("atom"), "atom");
    });

    it("should parse +", function () {
        assert_eq(parse("+"), "+");
    });

    it("should parse (+ x 3)", function () {
        assert_eq(parse("(+ x 3)"), ["+", "x", "3"]);
    });

    it("should parse newline(+ x 3)", function () {
        assert_eq(parse("\n\n\n\n\n(+ x 3)"), ["+", "x", "3"]);
    });

    it("should parse (+       x   3)", function () {
        assert_eq(parse("(+       x   3)"), ["+", "x", "3"]);
    });

    it("should parse (+ \nx   3)", function () {
        assert_eq(parse("(+ \nx   3)"), ["+", "x", "3"]);
    });

    it("should parse (+ \tx\t\t\t3)", function () {
        assert_eq(parse("(+ \tx\t\t\t3)"), ["+", "x", "3"]);
    });

    it("should parse '(1 2 3)", function () {
        assert_eq(parse("'(1 2 3)"), ["quote", ["1", "2", "3"]]);
    });

    it("should parse '(1     2 3)", function () {
        assert_eq(parse("'(1     2 3)"), ["quote", ["1", "2", "3"]]);
    });

    it("should parse '(1\n2 3)", function () {
        assert_eq(parse("'(1\n2 3)"), ["quote", ["1", "2", "3"]]);
    });

    it("should parse (+ 1 (f x 3 y))", function () {
        assert_eq(parse("(+ 1 (f x 3 y))"), ["+", "1", ["f", "x", "3", "y"]]);
    });

    it("should ignore a line of comments", function () {
        assert_eq(parse(";; comments\n(1 2 3)"), ["1", "2", "3"]);
    });

    it("should ignore a line of comments inside an expression", function () {
        assert_eq(parse(";; comments\n(1 2 3)"), ["1", "2", "3"]);
    });
});
