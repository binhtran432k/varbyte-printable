import { describe, expect, test } from "bun:test";

import { decodeVarbytePrintable } from "./decode.js";

describe("decodeVarbytePrintable()", () => {
	test("can decode", () => {
		expect(decodeToNumbers("OPQR", 4)).toEqual([0, 1, 2, 3]);
	});
	test("can decode multi-chars into single number", () => {
		expect(decodeToNumbers("}", 1)).toEqual([45]);
		expect(decodeToNumbers("!O", 1)).toEqual([46]);
		expect(decodeToNumbers("!}", 1)).toEqual([91]);
		expect(decodeToNumbers("#O", 1)).toEqual([92]);
		expect(decodeToNumbers("N}", 1)).toEqual([2115]);
		expect(decodeToNumbers("! O", 1)).toEqual([2116]);
	});
	test("can decode big value code", () => {
		expect(decodeToNumbers("?Mn", 1)).toEqual([0xffff - 1]);
		expect(decodeToNumbers("~", 1)).toEqual([0xffff]);
		expect(decodeToNumbers("?Mp", 1)).toEqual([0xffff + 1]);
	});
	test("can skip gaps", () => {
		expect(decodeToNumbers("[", 1)).toEqual([12]);
		expect(decodeToNumbers("\\", 1)).not.toEqual([13]);
		expect(decodeToNumbers("]", 1)).toEqual([13]);
		expect(decodeToNumbers("!}", 1)).toEqual([91]);
		expect(decodeToNumbers('"O', 1)).not.toEqual([92]);
		expect(decodeToNumbers("#O", 1)).toEqual([92]);
	});
});

function decodeToNumbers(input: string, size: number) {
	const array = new Array<number>(size);
	decodeVarbytePrintable(input, array);
	return array;
}
