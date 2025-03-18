import {BytesInternals} from "../bytes-internals";

const LEFT_BUTTON = 0;

export function positionAtX(this: BytesInternals, x: number): number {
	for (let i = 0; i < this.cells.length; i++) {
		const {offsetLeft, offsetWidth} = this.cells[i];
		if (x >= offsetLeft + offsetWidth)
			continue;

		const char = x < offsetLeft ? -1 : x < offsetLeft + offsetWidth / 2 ? 0 : 1;
		return i * 2 + char;
	}
	return 16;
}

export function onDoubleClick(this: BytesInternals, e: MouseEvent): void {
	if (e.button !== LEFT_BUTTON)
		return;

	e.preventDefault();

	const start = this.positionAtX(e.x) & ~1;
	if (this.setSelection(start + 2, start))
		this.update();
}