import {html}           from "../../lib/html";
import {toHex}          from "./format";
import {BytesInternals} from "./bytes-internals";

export function update(this: BytesInternals): void {
	if (this.selectionStart === this.selectionEnd) {
		for (let i = 0; i < 8; i++) {
			const value = this.data.getUint8(i);
			const text  = toHex(value);
			const cell  = this.cells[i];
			if (this.selectionEnd === i * 2)
				cell.innerHTML = html`<span class="caret">${text[0]}</span>${text[1]}`;
			else if (this.selectionEnd === i * 2 + 1)
				cell.innerHTML = html`${text[0]}<span class="caret">${text[1]}</span>`;
			else
				cell.innerHTML = text;
		}
		return;
	}

	const selectionLeft  = this.selectionLeft;
	const selectionRight = this.selectionRight;
	const position       = this.position;

	const notSelected = (i: number, text: string): string =>
		position === i * 2 ?
			html`<span class="caret">${text[0]}</span>${text[1]}` :
		position === i * 2 + 1 ?
			html`${text[0]}<span class="caret">${text[1]}</span>` :
		text;

	const totallySelected = (i: number, text: string): string =>
		html`<span class="selection">${notSelected(i, text)}</span>`;

	const leftSelected = (i: number, text: string): string =>
		position === i * 2 ?
			// Not normally possible.
			html`<span class="caret selection">${text[0]}</span>${text[1]}` :
		position === i * 2 + 1 ?
			// Possible.
			html`<span class="selection">${text[0]}</span>` +
			html`<span class="caret">${text[1]}</span>` :
		html`<span class="selection">${text[0]}</span>${text[1]}`;

	const rightSelected = (i: number, text: string): string =>
		position === i * 2 ?
			// Possible.
			html`<span class="caret">${text[0]}</span>` +
			html`<span class="selection">${text[1]}</span>` :
		position === i * 2 + 1 ?
			// Not normally possible.
			html`${text[0]}<span class="caret selection">${text[1]}</span>` :
		html`${text[0]}<span class="selection">${text[1]}</span>`;

	const getHTML = (i: number, text: string): string =>
		selectionRight < i * 2 || selectionLeft > i * 2 + 1 ?
			notSelected(i, text) :
		selectionLeft <= i * 2 && selectionRight > i * 2 + 1 ?
			totallySelected(i, text) :
		selectionRight === i * 2 + 1 ?
			leftSelected(i, text) :
		selectionLeft === i * 2 + 1 ?
			rightSelected(i, text) :
		notSelected(i, text);

	for (let i = 0; i < 8; i++)
		this.cells[i].innerHTML = getHTML(i, toHex(this.data.getUint8(i)));
}