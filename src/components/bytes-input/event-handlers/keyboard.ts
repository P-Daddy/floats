import {KeyEvent}       from "../../../lib/keyboard";
import {parseDigit}     from "../format";
import {BytesInternals} from "../bytes-internals";

export async function onKeyDown(this: BytesInternals, e: KeyEvent): Promise<void> {
	if (await this.handleKeyDown(e))
		return;

	let changed = false;

	switch (e.keyCombination) {
	// Increment the value at the current position
	case "ArrowUp":
		this.increment(this.position);
		changed = true;
		e.preventDefault();
		break;

	// Decrement the value at the current position
	case "ArrowDown":
		this.decrement(this.position);
		changed = true;
		e.preventDefault();
		break;

	// Invalid (don't let it scroll the page, though)
	case ' ':
		e.preventDefault();
		break;

	default:
		if (/^!?.$/.test(e.keyCombination)) {
			// Typed character
			if (!Number.isNaN(parseDigit(e.key))) {
				changed = this.replaceSelection(e.key);
				if (this.setPosition(this.selectionLeft + 1))
					changed = true;
			}
			e.preventDefault();
		}
		// Everything else (ignore, let it pass through to the default handler).
		break;
	}

	if (changed)
		this.update();
}