import {BitsInternals} from "./bits-internals";

function setBit(this: BitsInternals, index: number, char: string): boolean {
	const bit = char === '0' ? 0 : char === '1' ? 1 : NaN;
	if (Number.isNaN(bit))
		return false;

	const byte   = this.data.getUint8(index >> 3);
	const newVal = bit ? byte | (128 >>> (index & 7)) : byte & ~(128 >>> (index & 7));

	if (byte === newVal)
		return false;

	this.data.setUint8(index >> 3, newVal);
	return true;
}

export function replaceSelection(this: BitsInternals, value: string): boolean {
	let changed = false;

	const start  = this.selectionLeft;
	const end    = this.selectionRight;
	const length = end - start + 1;

	for (let i = 0; i < length; i++) {
		if (setBit.call(this, i + start, i < value.length ? value[i] : '0'))
			changed = true;
	}
	for (let i = length; i < value.length; i++) {
		if (setBit.call(this, i + end, value[i]))
			changed = true;
	}

	if (changed)
		this.owner.dispatchEvent(new Event("change"));

	return changed;
}

const positionValues = [
	0x8000000000000000n, 0x4000000000000000n, 0x2000000000000000n, 0x1000000000000000n,
	0x0800000000000000n, 0x0400000000000000n, 0x0200000000000000n, 0x0100000000000000n,
	0x0080000000000000n, 0x0040000000000000n, 0x0020000000000000n, 0x0010000000000000n,
	0x0008000000000000n, 0x0004000000000000n, 0x0002000000000000n, 0x0001000000000000n,
	0x0000800000000000n, 0x0000400000000000n, 0x0000200000000000n, 0x0000100000000000n,
	0x0000080000000000n, 0x0000040000000000n, 0x0000020000000000n, 0x0000010000000000n,
	0x0000008000000000n, 0x0000004000000000n, 0x0000002000000000n, 0x0000001000000000n,
	0x0000000800000000n, 0x0000000400000000n, 0x0000000200000000n, 0x0000000100000000n,
	0x0000000080000000n, 0x0000000040000000n, 0x0000000020000000n, 0x0000000010000000n,
	0x0000000008000000n, 0x0000000004000000n, 0x0000000002000000n, 0x0000000001000000n,
	0x0000000000800000n, 0x0000000000400000n, 0x0000000000200000n, 0x0000000000100000n,
	0x0000000000080000n, 0x0000000000040000n, 0x0000000000020000n, 0x0000000000010000n,
	0x0000000000008000n, 0x0000000000004000n, 0x0000000000002000n, 0x0000000000001000n,
	0x0000000000000800n, 0x0000000000000400n, 0x0000000000000200n, 0x0000000000000100n,
	0x0000000000000080n, 0x0000000000000040n, 0x0000000000000020n, 0x0000000000000010n,
	0x0000000000000008n, 0x0000000000000004n, 0x0000000000000002n, 0x0000000000000001n,
]

export function increment(this: BitsInternals, position: number): void {
	this.data.setBigUint64(0, this.data.getBigUint64(0) + positionValues[position]);
	this.owner.dispatchEvent(new Event("change"));
}

export function decrement(this: BitsInternals, position: number): void {
	this.data.setBigUint64(0, this.data.getBigUint64(0) - positionValues[position]);
	this.owner.dispatchEvent(new Event("change"));
}

export function flip(this: BitsInternals, position: number): void {
	const byte = position >> 3;
	const bit  = 128 >>> (position & 7);
	this.data.setUint8(byte, this.data.getUint8(byte) ^ bit);
	this.owner.dispatchEvent(new Event("change"));
}