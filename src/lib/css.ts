/**
 * This is a simple tagged template parser that works exactly like regular tagged templates. But its
 * name works with certain VS Code extensions to enable CSS syntax highlighting and autocompletion.
 *
 * In other words, instead of using something like this:
 *
 * ```js
 * const myStyle = `
 *     .my-div {
 *         display : flex;
 *         gap     : 1em;
 *     }
 * `;
 * ```
 *
 * Just stick `css` in front of the backtick and, if you have one several VS Code extensions
 * installed (such as the Lit extension), enjoy pretty colors in your embedded CSS!
 *
 * ```js
 * const myStyle = css`
 *     .my-div {
 *         display : flex;
 *         gap     : 1em;
 *     }
 * `;
 * ```
 */
export const css = (template: TemplateStringsArray, ...args: any[]): string =>
	template.reduce((a, b, i) => a + String(args[i - 1]) + b);