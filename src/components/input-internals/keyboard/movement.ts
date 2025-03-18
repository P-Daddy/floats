import {KeyEvent}       from "../../../lib/keyboard";
import {InputInternals} from "../input-internals";

export function handleMovementKey(this: InputInternals, e: KeyEvent): boolean {
	let changed = false;

	switch (e.keyCombination) {
	// Home
	case "^Home":
	case "Home":
	case "^PageUp":
	case "PageUp":
		changed = this.setPosition(0);
		e.preventDefault();
		break;

	// End
	case "^End":
	case "End":
	case "^PageDown":
	case "PageDown":
		changed = this.setPosition(this.length - 1);
		e.preventDefault();
		break;

	// Character left
	case "ArrowLeft":
		changed = this.setPosition(this.selectionEnd - 1);
		e.preventDefault();
		break;

	// Word left
	case "^ArrowLeft":
		changed = this.setPosition((this.selectionEnd - 1) & ~1);
		e.preventDefault();
		break;

	// Character right
	case "ArrowRight":
		changed = this.setPosition(this.selectionEnd + 1);
		e.preventDefault();
		break;

	// Word right
	case "^ArrowRight":
		changed = this.setPosition((this.selectionEnd + 2) & ~1);
		e.preventDefault();
		break;

	default:
		return false;
	}

	if (changed)
		this.update();

	return true;
}