import {KeyEvent}      from "../../../lib/keyboard";
import {BitsInternals} from "../bits-internals";

export async function onKeyDown(this: BitsInternals, e: KeyEvent): Promise<void> {
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

	case '0':
		changed = this.replaceSelection('0');
		if (this.setPosition(this.selectionLeft + 1))
			changed = true;
		e.preventDefault();
		break;

	case '1':
		changed = this.replaceSelection('1');
		if (this.setPosition(this.selectionLeft + 1))
			changed = true;
		e.preventDefault();
		break;

	case ' ':
		this.flip(this.position);
		changed = true;
		e.preventDefault();
		break;

	// Ignore everything else and let it pass through to the default handler.
	}

	if (changed)
		this.update();
}