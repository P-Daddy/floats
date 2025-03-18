// This is roughly four times faster than `parseInt(char, 16)` and returns the same result.
export function parseDigit(char: string): number {
	const c = char.charCodeAt(0);

	if (c < 48)
		return Number.NaN;
	if (c < 58)
		return c - 48;
	if (c < 65)
		return Number.NaN;
	if (c < 71)
		return c - 55;
	if (c < 97)
		return Number.NaN;
	if (c < 103)
		return c - 87;
	return Number.NaN;
}

const hexDigits = "0123456789ABCDEF";

// This is about 40% faster than `byte.toString().toUpperCase().padStart(2, '0')` and a lot easier
// to type.
export const toHex = (byte: number): string => hexDigits[byte >> 4] + hexDigits[byte & 0x0F];