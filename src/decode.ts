import { Encode, type NumberArrayLike } from "./encode.js";

interface DecodeState {
	pos: number;
}

export function decodeVarbytePrintable(
	input: string,
	array: NumberArrayLike,
): NumberArrayLike {
	const state: DecodeState = { pos: 0 };
	let arrI = 0;
	while (state.pos < input.length) {
		array[arrI++] = decodeNumber(input, state);
	}
	return array;
}

function decodeNumber(input: string, state: DecodeState): number {
	let value = 0;
	for (;;) {
		let next = input.charCodeAt(state.pos++);
		if (next === Encode.BigValCode) {
			return Encode.BigVal;
		}
		if (next >= Encode.Gap2) next--;
		if (next >= Encode.Gap1) next--;
		const digit = next - Encode.Start;
		if (digit >= Encode.Base) {
			return value + digit - Encode.Base;
		}
		value += digit;
		value *= Encode.Base;
	}
}
