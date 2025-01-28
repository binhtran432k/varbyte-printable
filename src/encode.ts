export enum Encode {
	BigValCode = 126, // '~'
	BigVal = 0xffff,
	Start = 32, // ' '
	Gap1 = 34, // '"'
	Gap2 = 92, // '\\'
	Base = 46, // (126 - 32 - 2) / 2
}

export interface NumberArrayLike {
	length: number;
	[x: number]: number;
}

export function encodeVarbytePrintable(values: NumberArrayLike): string {
	let result = "";
	for (let i = 0; i < values.length; i++) result += encodeNumber(values[i]);
	return result;
}

function encodeNumber(value: number): string {
	if (value === Encode.BigVal) return String.fromCharCode(Encode.BigValCode);

	let result = "";

	let walkValue = value;
	for (let first = Encode.Base; ; first = 0 as Encode) {
		const low = walkValue % Encode.Base;
		const rest = walkValue - low;
		result = digitToChar(low + first) + result;
		if (rest === 0) break;
		walkValue = rest / Encode.Base;
	}

	return result;
}

function digitToChar(digit: number): string {
	let ch = digit + Encode.Start;
	if (ch >= Encode.Gap1) ch++;
	if (ch >= Encode.Gap2) ch++;
	return String.fromCharCode(ch);
}
