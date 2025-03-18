import {InputInternals} from "../input-internals";

const LEFT_BUTTON = 0;

export function onPointerDown(this: InputInternals, e: PointerEvent): void {
	if (e.button !== LEFT_BUTTON)
		return;

	if (e.currentTarget instanceof HTMLElement)
		e.currentTarget.focus();

	e.preventDefault();

	const position = this.positionAtX(e.x);
	this.dragStart = position;

	if (this.setPosition(position))
		this.update();
}

export function onPointerMove(this: InputInternals, e: PointerEvent): void {
	if (!(e.buttons & 1) || this.dragStart < 0)
		return;

	const position = this.positionAtX(e.x);

	if (this.setSelection(position))
		this.update();
}

export function onPointerUp(this: InputInternals, e: PointerEvent): void {
	if (e.button === LEFT_BUTTON && this.dragStart >= 0)
		this.dragStart = -1;
}

export function onClick(this: InputInternals, e: MouseEvent): void {
	if (e.button !== LEFT_BUTTON)
		return;

	if (e.currentTarget instanceof HTMLElement)
		e.currentTarget.focus();

	e.preventDefault();
}