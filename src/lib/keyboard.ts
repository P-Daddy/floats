import {platform} from "./platform";

// export interface KeyEvent {
// 	altKey   : boolean;
// 	ctrlKey  : boolean;
// 	shiftKey : boolean;
// 	key      : string
// }

// Using this minimal projection allows using the DOM `KeyboardEvent` or the React
// `KeyboardEvent<T>` type. Or, for that matter, any other compatible object.
type BaseKeyEvent = Pick<KeyboardEvent, "ctrlKey" | "shiftKey" | "altKey" | "metaKey" | "key">;

/**
 * Generates a string that describes the modified key identified by the given keyboard event,
 * consisting of the `key` property of the event preceded by up to four symbols representing the
 * currently active modifier keys, in the following order:
 *
 * | Symbol |  Property  | Windows/Linux |     Mac     |
 * |--------|------------|---------------|-------------|
 * |  `^`   | `ctrlKey`  |   `Ctrl`      | `⌘ command` |
 * |  `&`   | `altKey`   |   `Alt`       | `⌥ option`  |
 * |  `!`   | `shiftKey` |   `⇧ Shift`   | `⇧ shift`   |
 * |  `%`   | `metaKey`  |   `◆ Meta`    | `⌃ control` |
 *
 * > Notice in the above table that for Macs, we've swapped the `⌘ command` and `⌃ control` keys.
 * > That's because Mac uses `⌘ command` (which looks to JavaScript like a meta key) the way normal
 * > platforms use `Ctrl`, and they use `⌃ control` the way most platforms use `◆ Meta`. So, to
 * > keep _you_ from having to check the platform and accept `"%c"` on Macs and `"^c"` everywhere
 * > else, we'll normalize the output here so that `⌘ command + C` generates `"^c"` on Mac.
 *
 * For example, if the user presses `Shift`+`Enter`, this function will return the string
 * `"!Enter"`, while `Ctrl`+`Alt`+`Esc` results in `"^&Escape"`
 *
 * This makes it easy to check for exact key combinations. For example, the following code will
 * perform some action when the user presses `Ctrl`+`Enter`, `Ctrl`+`Shift`+`Enter`,
 * `Ctrl`+`Alt`+`Enter`, etc.
 *
 * ```ts
 * function onKeyDown(e: KeyboardEvent) {
 *     if (e.key === "Enter" && e.ctrlKey)
 *         performSomeAction();
 * }
 * ```
 *
 * If you wanted to respond _only_ to `Ctrl`+`Enter`, you'd have to use this:
 *
 * ```ts
 * function onKeyDown(e: KeyboardEvent) {
 *     if (e.key === "Enter" && e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
 *         performSomeAction();
 *     }
 * }
 * ```
 *
 * That's tedious and error prone. But with `keyCombination`, you can simply do this:
 *
 * ```ts
 * function onKeyDown(e: KeyboardEvent) {
 *     if (keyCombination(e) === "^Enter")
 *         performSomeAction();
 * }
 * ```
 */
export const keyCombination =
	platform === "mac" ?
		(e: BaseKeyEvent): string =>
			(e.metaKey  ? "^" : "") +
			(e.shiftKey ? "!" : "") +
			(e.altKey   ? "&" : "") +
			(e.ctrlKey  ? "%" : "") +
			e.key
	:
		(e: BaseKeyEvent): string =>
			(e.ctrlKey  ? "^" : "") +
			(e.shiftKey ? "!" : "") +
			(e.altKey   ? "&" : "") +
			(e.metaKey  ? "%" : "") +
			e.key;

export type KeyEvent<E extends BaseKeyEvent = KeyboardEvent> = E & {keyCombination: string};

export const keyEvent = <E extends BaseKeyEvent>(e: E): KeyEvent<E> =>
	Object.assign(e, {keyCombination: keyCombination(e)});