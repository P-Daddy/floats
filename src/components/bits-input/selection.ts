import {BitsInternals} from "./bits-internals";
import {toBinary}      from "./format";

export function getSelection(this: BitsInternals): string {
	if (this.selectionStart === this.selectionEnd)
		return '';

	const selectionLeft  = this.selectionLeft;
	const selectionRight = this.selectionRight - 1;

	const start = selectionLeft  >> 3;
	const end   = selectionRight >> 3;

	let s = toBinary(this.data.getUint8(start));

	if (selectionLeft & 7)
		s = s.slice(selectionLeft & 7);

	for (let i = start + 1; i < end; i++)
		s += toBinary(this.data.getUint8(i));

	const bitCount = selectionRight & 7;
	if (bitCount)
		s += toBinary(this.data.getUint8(end)).slice(0, bitCount);
	else
		s += toBinary(this.data.getUint8(end));

	return s;
}