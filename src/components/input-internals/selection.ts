import {InputInternals} from "./input-internals";

export function setPosition(this: InputInternals, position: number): boolean {
	position = Math.min(Math.max(position, 0), this.length - 1);
	if (this.selectionStart === position && this.selectionEnd === position)
		return false;
	this.selectionStart = this.selectionEnd = position;
	return true;
}

export function setSelection(this: InputInternals, end: number, start?: number): boolean {
	let changed = false;

	if (start !== undefined) {
		start = Math.min(Math.max(start, 0), this.length - 1);
		if (this.selectionStart !== start) {
			changed = true;
			this.selectionStart = start;
		}
	}

	end = Math.min(Math.max(end, -1), this.length);
	if (this.selectionEnd === end)
		return changed;

	this.selectionEnd = end;
	return true;
}