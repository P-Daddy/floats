import {BitsInternals} from "../bits-internals";

const LEFT_BUTTON = 0;

export function positionAtX(this: BitsInternals, x: number): number {
	let {offsetLeft, offsetWidth} = this.cells[0];
	if (x < offsetLeft)
		return -1;
	if (x < offsetLeft + offsetWidth)
		return 0;

	({offsetLeft, offsetWidth} = this.cells[1]);
	if (x < offsetLeft + offsetWidth)
		return ((x - offsetLeft) * 11 / offsetWidth | 0) + 1;

	({offsetLeft, offsetWidth} = this.cells[2]);
	if (x >= offsetLeft + offsetWidth)
		return 64;

	return ((x - offsetLeft) * 52 / offsetWidth | 0) + 12;
}

export function onDoubleClick(this: BitsInternals, e: MouseEvent): void {
	if (e.button !== LEFT_BUTTON)
		return;

	let changed = false;
	e.preventDefault();

	const position = this.positionAtX(e.x);

	if (position < 1)
		changed = this.setSelection(1, 0);
	else if (position < 12)
		changed = this.setSelection(12, 1);
	else
		changed = this.setSelection(64, 13);

	if (changed)
		this.update();
}