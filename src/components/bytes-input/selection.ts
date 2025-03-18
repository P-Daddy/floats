import {toHex}          from "./format";
import {BytesInternals} from "./bytes-internals";

export function getSelection(this: BytesInternals): string {
	if (this.selectionStart === this.selectionEnd)
		return '';

	const selectionLeft  = this.selectionLeft;
	const selectionRight = this.selectionRight - 1;

	const start = selectionLeft  >> 1;
	const end   = selectionRight >> 1;

	let s = toHex(this.data.getUint8(start));

	if (selectionLeft & 1)
		s = s[1];

	for (let i = start + 1; i < end; i++)
		s += toHex(this.data.getUint8(i));

	if (selectionRight & 1)
		s += toHex(this.data.getUint8(end));
	else
		s += toHex(this.data.getUint8(end))[0];

	return s;
}