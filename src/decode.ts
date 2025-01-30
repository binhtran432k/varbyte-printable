import { Encode, type NumberArrayLike } from "./encode.js";

interface DecodeState {
	pos: number;
}

export interface NumberArrayLikeConstructor<T extends NumberArrayLike> {
	readonly prototype: T;
	new (length: number): T;
}

export function decodeVarbytePrintable<T extends NumberArrayLike>(
	ArrayConstructor: NumberArrayLikeConstructor<T>,
	input: string,
): T {
	const state: DecodeState = { pos: 0 };
	const array = new ArrayConstructor(decodeNumber(input, state));
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
