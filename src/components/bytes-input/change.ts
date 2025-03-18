import {parseDigit}     from "./format";
import {BytesInternals} from "./bytes-internals";

function setDigit(this: BytesInternals, index: number, char: string): boolean {
	const digit = parseDigit(char);
	if (Number.isNaN(digit))
		return false;

	const byte   = this.data.getUint8(index >> 1);
	const newVal = index & 1
		? byte & 0xF0 | digit
		: byte & 0x0F | (digit << 4);

	if (byte === newVal)
		return false;

	this.data.setUint8(index >> 1, newVal);
	return true;
}

export function replaceSelection(this: BytesInternals, value: string): boolean {
	let changed = false;

	const start  = this.selectionLeft;
	const end    = this.selectionRight;
	const length = end - start + 1;

	for (let i = 0; i < length; i++) {
		if (setDigit.call(this, i + start, i < value.length ? value[i] : '0'))
			changed = true;
	}
	for (let i = length; i < value.length; i++) {
		if (setDigit.call(this, i + end, value[i]))
			changed = true;
	}

	if (changed)
		this.owner.dispatchEvent(new Event("change"));

	return changed;
}

const positionValues = [
	0x1000000000000000n,
	0x0100000000000000n,
	0x0010000000000000n,
	0x0001000000000000n,
	0x0000100000000000n,
	0x0000010000000000n,
	0x0000001000000000n,
	0x0000000100000000n,
	0x0000000010000000n,
	0x0000000001000000n,
	0x0000000000100000n,
	0x0000000000010000n,
	0x0000000000001000n,
	0x0000000000000100n,
	0x0000000000000010n,
	0x0000000000000001n,
];

export function increment(this: BytesInternals, position: number): void {
	this.data.setBigUint64(0, this.data.getBigUint64(0) + positionValues[position]);
	this.owner.dispatchEvent(new Event("change"));
}

export function decrement(this: BytesInternals, position: number): void {
	this.data.setBigUint64(0, this.data.getBigUint64(0) - positionValues[position]);
	this.owner.dispatchEvent(new Event("change"));
}