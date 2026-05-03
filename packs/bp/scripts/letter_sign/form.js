import * as mc from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

/**
 * @typedef {Object} PlacerFormResponse
 * @property {string} text
 * @property {number} spacing
 */

/**
 * @param {mc.Player} player
 * @returns {Promise<PlacerFormResponse | undefined>}
 */
export const showPlacerForm = async (player) => {
	const formData = new ModalFormData()
		.title({ translate: "lettersigns:ui.letter_sign_placer.title" })
		.textField(
			{ translate: "lettersigns:ui.letter_sign_placer.text.label" },
			{ translate: "lettersigns:ui.letter_sign_placer.text.placeholder" },
			{ tooltip: { translate: "lettersigns:ui.letter_sign_placer.text.tooltip" } },
		)
		.slider({ translate: "lettersigns:ui.letter_sign_placer.spacing.label" }, 0, 3, {
			tooltip: { translate: "lettersigns:ui.letter_sign_placer.spacing.tooltip" },
			valueStep: 1,
			defaultValue: 0,
		})
		.submitButton({ translate: "lettersigns:ui.letter_sign_placer.submit" });

	const response = await formData.show(player);
	if (response.canceled || response.formValues === undefined) return;

	const text = String(response.formValues[0]).trim();
	const spacing = Number(response.formValues[1]);

	return { text, spacing };
};
