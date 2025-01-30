import { describe, expect, test } from "bun:test";

import { encodeVarbytePrintable } from "./encode.js";

describe("encodeVarbytePrintable()", () => {
	test("can encode", () => {
		expect(encodeVarbytePrintable([0, 1, 2, 3])).toBe("SOPQR");
	});
	test("can encode single number into multi-chars", () => {
		expect(encodeVarbytePrintable([45])).toBe("P}");
		expect(encodeVarbytePrintable([46])).toBe("P!O");
		expect(encodeVarbytePrintable([91])).toBe("P!}");
		expect(encodeVarbytePrintable([92])).toBe("P#O");
		expect(encodeVarbytePrintable([2115])).toBe("PN}");
		expect(encodeVarbytePrintable([2116])).toBe("P! O");
	});
	test("can encode big value", () => {
		expect(encodeVarbytePrintable([0xffff - 1])).toBe("P?Mn");
		expect(encodeVarbytePrintable([0xffff])).toBe("P~");
		expect(encodeVarbytePrintable([0xffff + 1])).toBe("P?Mp");
	});
	test("can skip gaps", () => {
		expect(encodeVarbytePrintable([12])).toBe("P[");
		expect(encodeVarbytePrintable([13])).not.toBe("P\\");
		expect(encodeVarbytePrintable([13])).toBe("P]");
		expect(encodeVarbytePrintable([91])).toBe("P!}");
		expect(encodeVarbytePrintable([92])).not.toBe('P"O');
		expect(encodeVarbytePrintable([92])).toBe("P#O");
	});
});
