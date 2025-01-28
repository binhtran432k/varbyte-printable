import { describe, expect, test } from "bun:test";

import { decodeVarbytePrintable } from "./decode.js";

describe("decodeVarbytePrintable()", () => {
	test("can decode", () => {
		testDecode("OPQR", [0, 1, 2, 3]);
	});
	test("can decode multi-chars into single number", () => {
		testDecode("}", [45]);
		testDecode("!O", [46]);
		testDecode("!}", [91]);
		testDecode("#O", [92]);
		testDecode("N}", [2115]);
		testDecode("! O", [2116]);
	});
	test("can decode big value code", () => {
		testDecode("?Mn", [0xffff - 1]);
		testDecode("~", [0xffff]);
		testDecode("?Mp", [0xffff + 1]);
	});
});

function testDecode(input: string, expectedArray: number[]) {
	const array = new Array<number>(expectedArray.length);
	decodeVarbytePrintable(input, array);
	expect(array).toEqual(expectedArray);
}
