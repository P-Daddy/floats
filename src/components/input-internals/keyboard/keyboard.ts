import {KeyEvent}           from "../../../lib/keyboard";
import {InputInternals}     from "../input-internals";
import {handleClipboardKey} from "./clipboard";
import {handleEditKey}      from "./edit";
import {handleMovementKey}  from "./movement";
import {handleSelectionKey} from "./selection";

export async function handleKeyDown(this: InputInternals, e: KeyEvent): Promise<boolean> {
	return (
		handleMovementKey.call(this, e) ||
		handleSelectionKey.call(this, e) ||
		await handleClipboardKey.call(this, e) ||
		handleEditKey.call(this, e)
	);
}