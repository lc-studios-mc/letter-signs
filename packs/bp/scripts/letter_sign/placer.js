import * as mc from "@minecraft/server";
import { getOppositeDirection, getRelativeBlockFrom, rotationToDirection } from "../utils.js";
import { showPlacerForm } from "./form.js";
import { signRegistry } from "./registry.js";

/** @param {any[]} arr @param {number} n */
const insertNulls = (arr, n) => {
	for (let i = arr.length - 1; i > 0; i--) {
		arr.splice(i, 0, ...Array(n).fill(null));
	}
};

/**
 * @param {mc.Direction} cardinalDir
 * @returns {mc.Direction}
 */
const getExtendDirection = (cardinalDir) => {
	switch (cardinalDir) {
		default:
		case mc.Direction.North:
			return mc.Direction.East;
		case mc.Direction.East:
			return mc.Direction.South;
		case mc.Direction.South:
			return mc.Direction.West;
		case mc.Direction.West:
			return mc.Direction.North;
	}
};

/**
 * @param {mc.Player} player
 * @param {mc.Block} origin
 * @param {mc.Direction} originFace
 * @param {string} placerType
 * @param {string} letterColor
 */
const startPlacerSession = async (player, origin, originFace, placerType, letterColor) => {
	const correctOriginType = origin.typeId;

	const formResponse = await showPlacerForm(player);
	if (!formResponse) return;
	if (!player.isValid) return;
	if (!origin.isValid) return;
	if (origin.typeId !== correctOriginType) return;

	const equippable = player.getComponent(mc.EntityComponentTypes.Equippable);
	if (!equippable) return;

	const mainhandSlot = equippable.getEquipmentSlot(mc.EquipmentSlot.Mainhand);
	const itemStack = mainhandSlot.getItem();
	if (!itemStack) return;
	if (itemStack.typeId !== placerType) return;

	const { text, spacing } = formResponse;

	const playerRot = player.getRotation();
	const playerCardinalDir = rotationToDirection(playerRot, true);

	const isFacingVertical = originFace === mc.Direction.Up || originFace === mc.Direction.Down;
	const extendDir = getExtendDirection(
		isFacingVertical ? playerCardinalDir : getOppositeDirection(originFace),
	);
	const dir = isFacingVertical ? getOppositeDirection(playerCardinalDir) : originFace;
	const dirState = dir.toLowerCase();
	const tiltState = isFacingVertical ? originFace.toLowerCase() : "none";

	const permutationsToPlace = /** @type {(mc.BlockPermutation | null)[]} */ ([]);

	for (let i = 0; i < text.length; i++) {
		let char = text[i];
		if (char === undefined || char === " ") {
			permutationsToPlace.push(null);
			continue;
		}

		char = char.toLocaleLowerCase();

		const signDefinition = signRegistry[char];
		if (!signDefinition) {
			console.error(`Unsupported character: ${char}`);
			player.sendMessage({
				translate: "lettersigns:msg.letter_sign_placer.unsupported_character",
				with: [char],
			});
			return;
		}

		const perm = mc.BlockPermutation.resolve(signDefinition.type, {
			"lettersigns:direction": dirState,
			"lettersigns:tilt": tiltState,
			"lettersigns:letter": signDefinition.value,
			"lettersigns:color": letterColor,
		});
		permutationsToPlace.push(perm);
	}

	if (spacing > 0) {
		insertNulls(permutationsToPlace, spacing);
	}

	const shouldConsume = player.getGameMode() !== mc.GameMode.Creative;
	let nextStackCount = itemStack?.amount ?? 0;
	/** @type {mc.Block | undefined} */
	let targetBlock = origin;

	for (const perm of permutationsToPlace) {
		if (!targetBlock || !targetBlock.isValid || !(targetBlock.isAir || targetBlock.isLiquid)) {
			player.sendMessage({
				translate: "lettersigns:msg.letter_sign_placer.path_obstructed",
			});
			break;
		}

		if (nextStackCount <= 0) {
			player.sendMessage({
				translate: "lettersigns:msg.letter_sign_placer.insufficient_items",
			});
			break;
		}

		if (perm !== null) {
			try {
				targetBlock.setPermutation(perm);
			} catch (error) {
				console.error(`Error setting permutation:`, error);
				break;
			}

			if (shouldConsume) nextStackCount--;

			mc.system.run(() => {
				// @ts-ignore
				targetBlock.dimension.playSound("mob.slime.squish", targetBlock.center(), {
					pitch: 1.2,
					volume: 0.7,
				});
			});
		}

		targetBlock = getRelativeBlockFrom(targetBlock, extendDir, 1);
	}

	if (shouldConsume) {
		if (nextStackCount > 0) {
			itemStack.amount = nextStackCount;
			mainhandSlot.setItem(itemStack);
		} else {
			mainhandSlot.setItem(undefined);
		}
	}
};

mc.system.beforeEvents.startup.subscribe(({ itemComponentRegistry }) => {
	itemComponentRegistry.registerCustomComponent("lettersigns:letter_sign_placer", {
		onUseOn({ block, blockFace, source, itemStack }, arg1) {
			if (!(source instanceof mc.Player)) return;

			const origin = getRelativeBlockFrom(block, blockFace, 1);
			if (!origin) {
				console.error("Failed to get relative block");
				return;
			}

			const params = /** @type {any} */ (arg1.params);
			const letterColor = /** @type {string | undefined} */ (params.color);
			if (letterColor === undefined) {
				console.error("Color is undefined");
				return;
			}

			startPlacerSession(source, origin, blockFace, itemStack.typeId, letterColor);
		},
	});
});
