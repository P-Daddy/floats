import {css} from "../../lib/css";

export const styles = new CSSStyleSheet();

styles.replaceSync(css`
	pre:first-of-type {
		background: #d6ffff;
	}

	pre:nth-of-type(2) {
		background: #a5ffb5;
	}

	pre:last-of-type {
		background: #ffb3b5;
	}
`);