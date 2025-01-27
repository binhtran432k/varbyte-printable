import { describe, expect, test } from "bun:test";

import { encodeVarbytePrintable } from "./encode.js";

describe("encodeVarbytePrintable()", () => {
	test("can encode", () => {
		expect(encodeVarbytePrintable([0, 1, 2, 3])).toBe("OPQR");
		expect(encodeVarbytePrintable([45])).toBe("}");
		expect(encodeVarbytePrintable([46])).toBe("!O");
		expect(encodeVarbytePrintable([91])).toBe("!}");
		expect(encodeVarbytePrintable([92])).toBe("#O");
		expect(encodeVarbytePrintable([2115])).toBe("N}");
		expect(encodeVarbytePrintable([2116])).toBe("! O");
	});
});
