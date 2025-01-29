import { describe, expect, test } from "bun:test";

import { encodeVarbytePrintable } from "./encode.js";

describe("encodeVarbytePrintable()", () => {
	test("can encode", () => {
		expect(encodeVarbytePrintable([0, 1, 2, 3])).toBe("OPQR");
	});
	test("can encode single number into multi-chars", () => {
		expect(encodeVarbytePrintable([45])).toBe("}");
		expect(encodeVarbytePrintable([46])).toBe("!O");
		expect(encodeVarbytePrintable([91])).toBe("!}");
		expect(encodeVarbytePrintable([92])).toBe("#O");
		expect(encodeVarbytePrintable([2115])).toBe("N}");
		expect(encodeVarbytePrintable([2116])).toBe("! O");
	});
	test("can encode big value", () => {
		expect(encodeVarbytePrintable([0xffff - 1])).toBe("?Mn");
		expect(encodeVarbytePrintable([0xffff])).toBe("~");
		expect(encodeVarbytePrintable([0xffff + 1])).toBe("?Mp");
	});
	test("can skip gaps", () => {
		expect(encodeVarbytePrintable([12])).toBe("[");
		expect(encodeVarbytePrintable([13])).not.toBe("\\");
		expect(encodeVarbytePrintable([13])).toBe("]");
		expect(encodeVarbytePrintable([91])).toBe("!}");
		expect(encodeVarbytePrintable([92])).not.toBe('"O');
		expect(encodeVarbytePrintable([92])).toBe("#O");
	});
});
