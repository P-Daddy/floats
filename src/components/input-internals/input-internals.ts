import {copy, cut, onCopy, onCut, onPaste, paste}           from "./event-handlers/clipboard";
import {onClick, onPointerDown, onPointerMove, onPointerUp} from "./event-handlers/pointer";
import {handleKeyDown}                                      from "./keyboard";
import {setPosition, setSelection}                          from "./selection";

export abstract class InputInternals {
	cells!: readonly HTMLPreElement[];

	dragStart = -1;

	selectionStart = 0;
	selectionEnd   = 0;

	get selectionLeft(): number {
		if (this.selectionStart === this.selectionEnd)
			return this.selectionEnd;

		if (this.selectionStart < this.selectionEnd)
			return this.selectionStart;

		return this.selectionEnd + 1;
	}
	get selectionRight(): number {
		if (this.selectionStart === this.selectionEnd)
			return this.selectionEnd;

		if (this.selectionStart < this.selectionEnd)
			return this.selectionEnd;

		return this.selectionStart + 1;
	}

	get position(): number { return Math.min(Math.max(this.selectionEnd, 0), this.length - 1) }

	constructor(readonly owner: HTMLElement, readonly length: number) {}

	setPosition  = setPosition;
	setSelection = setSelection;

	copy  = copy;
	cut   = cut;
	paste = paste;

	onCopy        = onCopy;
	onCut         = onCut;
	onClick       = onClick;
	onPaste       = onPaste;
	onPointerDown = onPointerDown;
	onPointerMove = onPointerMove;
	onPointerUp   = onPointerUp;

	handleKeyDown = handleKeyDown;

	abstract getSelection(): string;
	abstract positionAtX(x: number): number;
	abstract replaceSelection(value: string): boolean;
	abstract update(): void;
}