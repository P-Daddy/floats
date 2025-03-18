/**
 * This is a simple tagged template parser that works exactly like regular tagged templates. But its
 * name works with certain VS Code extensions to enable HTML syntax highlighting and autocompletion.
 *
 * In other words, instead of using something like this:
 *
 * ```js
 * div.innerHTML = `
 *     <span class="first-word">You</span> have nothing to fear but fear itself.
 * `;
 * ```
 *
 * Just stick `html` in front of the backtick and, if you have one several VS Code extensions
 * installed (such as the Lit extension), enjoy pretty colors in your embedded HTML!
 *
 * ```js
 * div.innerHTML = html`
 *     <span class="first-word">You</span> have nothing to fear but fear itself.
 * `;
 * ```
 */
export const html = (template: TemplateStringsArray, ...args: any[]): string =>
	template.reduce((a, b, i) => a + String(args[i - 1]) + b);