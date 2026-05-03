import * as mc from "@minecraft/server";
import { SIGN_BLOCK_TYPE, signRegistry } from "../letter_sign/registry.js";

const symbolCharMap = /** @type {Record<string, string>} */ ({
	plus: "+",
	hyphen: "-",
	asterisk: "*",
	equal: "=",
	slash: "/",
	bar: "|",
	backslash: "\\",
	at: "@",
	hash: "#",
	dollar: "$",
	percent: "%",
	caret: "^",
	ampersand: "&",
	tilde: "~",
	period: ".",
	comma: ",",
	colon: ":",
	semicolon: ";",
	emdash: "—",
	underscore: "_",
	paren_left: "(",
	paren_right: ")",
	bracket_left: "[",
	bracket_right: "]",
	brace_left: "{",
	brace_right: "}",
	lessthan: "<",
	greaterthan: ">",
	backtick: "`",
	quote: "'",
	dbquotes: '"',
});

/**
 * @param {mc.BlockPermutation} fromPermutation
 * @returns {mc.BlockPermutation | undefined}
 */
export const getConvertedPermutation = (fromPermutation) => {
	const typeId = fromPermutation.type.id;
	if (!typeId.startsWith("lc:scpdy_")) return;

	const states = {
		"lettersigns:color": String(fromPermutation.getState("lc:color")),
		"lettersigns:direction": String(fromPermutation.getState("lc:dir")),
		"lettersigns:tilt": String(fromPermutation.getState("lc:updown")),
	};

	if (typeId === "lc:scpdy_number_sign") {
		const number = Number(fromPermutation.getState("lc:number"));
		return mc.BlockPermutation.resolve(SIGN_BLOCK_TYPE.NUMBER, {
			"lettersigns:letter": number,
			...states,
		});
	}

	if (typeId === "lc:scpdy_alphabet_sign_1") {
		const char = String(fromPermutation.getState("lc:char"));
		return mc.BlockPermutation.resolve(SIGN_BLOCK_TYPE.ALPHABET_1, {
			"lettersigns:letter": char,
			...states,
		});
	}

	if (typeId === "lc:scpdy_alphabet_sign_2") {
		const char = String(fromPermutation.getState("lc:char"));
		return mc.BlockPermutation.resolve(SIGN_BLOCK_TYPE.ALPHABET_2, {
			"lettersigns:letter": char,
			...states,
		});
	}

	if (typeId === "lc:scpdy_symbol_sign_1" || typeId === "lc:scpdy_symbol_sign_2") {
		const symbolId = String(fromPermutation.getState("lc:symbol"));
		const char = symbolCharMap[symbolId];
		const signDef = signRegistry[char];

		if (signDef !== undefined) {
			return mc.BlockPermutation.resolve(signDef.type, {
				"lettersigns:letter": signDef.value,
				...states,
			});
		}
	}
};
