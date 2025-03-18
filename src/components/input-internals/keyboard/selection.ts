import {KeyEvent}       from "../../../lib/keyboard";
import {InputInternals} from "../input-internals";

export function handleSelectionKey(this: InputInternals, e: KeyEvent): boolean {
	let changed = false;

	switch (e.keyCombination) {
	// Select to start
	case "!Home":
	case "!PageUp":
		changed = this.setSelection(-1);
		e.preventDefault();
		break;

	// Select to end
	case "!End":
	case "!PageDown":
		changed = this.setSelection(this.length);
		e.preventDefault();
		break;

	// Select character left
	case "!ArrowLeft":
		changed = this.setSelection(this.selectionEnd - 1);
		e.preventDefault();
		break;

	// Select word left
	case "^!ArrowLeft":
		changed = this.setSelection((this.selectionEnd - 1) & ~1);
		e.preventDefault();
		break;

	// Select character right
	case "!ArrowRight":
		changed = this.setSelection(this.selectionEnd + 1);
		e.preventDefault();
		break;

	// Select word right
	case "^!ArrowRight":
		changed = this.setSelection((this.selectionEnd + 2) & ~1);
		e.preventDefault();
		break;

	// Select all
	case "^a":
	case "^!A":
		changed = this.setSelection(this.length, 0);
		e.preventDefault();
		break;

	default:
		return false;
	}

	if (changed)
		this.update();

	return true;
}