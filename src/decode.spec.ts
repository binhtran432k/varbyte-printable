import { describe, expect, test } from "bun:test";

import { decodeVarbytePrintable } from "./decode.js";

describe("decodeVarbytePrintable()", () => {
	test("can decode", () => {
		expect(decodeToNumbers("SOPQR")).toEqual([0, 1, 2, 3]);
	});
	test("can decode multi-chars into single number", () => {
		expect(decodeToNumbers("P}")).toEqual([45]);
		expect(decodeToNumbers("P!O")).toEqual([46]);
		expect(decodeToNumbers("P!}")).toEqual([91]);
		expect(decodeToNumbers("P#O")).toEqual([92]);
		expect(decodeToNumbers("PN}")).toEqual([2115]);
		expect(decodeToNumbers("P! O")).toEqual([2116]);
	});
	test("can decode big value code", () => {
		expect(decodeToNumbers("P?Mn")).toEqual([0xffff - 1]);
		expect(decodeToNumbers("P~")).toEqual([0xffff]);
		expect(decodeToNumbers("P?Mp")).toEqual([0xffff + 1]);
	});
	test("can skip gaps", () => {
		expect(decodeToNumbers("P[")).toEqual([12]);
		expect(decodeToNumbers("P\\")).not.toEqual([13]);
		expect(decodeToNumbers("P]")).toEqual([13]);
		expect(decodeToNumbers("P!}")).toEqual([91]);
		expect(decodeToNumbers('P"O')).not.toEqual([92]);
		expect(decodeToNumbers("P#O")).toEqual([92]);
	});
});

function decodeToNumbers(input: string): number[] {
	return decodeVarbytePrintable<number[]>(Array, input);
}
