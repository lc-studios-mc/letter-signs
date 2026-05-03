import * as mc from "@minecraft/server";
import { getConvertedPermutation } from "./conversion.js";

const CONVERSION_SIZE = 50;

/**
 * @param {mc.Block} block
 * @returns {boolean}
 */
const tryConversion = (block) => {
	try {
		if (!block.isValid) return false;

		const newPermutation = getConvertedPermutation(block.permutation);
		if (!newPermutation) return false;

		block.setPermutation(newPermutation);
		return true;
	} catch (error) {
		console.error("Error converting block:", error);
		return false;
	}
};

/**
 * @param {mc.Dimension} dimension
 * @param {mc.Vector3} center
 */
function* conversionGenerator(dimension, center) {
	const startTime = Date.now();

	const size = CONVERSION_SIZE;
	const startX = center.x - Math.floor(size / 2);
	const startY = center.y - Math.floor(size / 2);
	const startZ = center.z - Math.floor(size / 2);
	let convertedCount = 0;

	for (let x = startX; x < startX + size; x++) {
		for (let y = startY; y < startY + size; y++) {
			for (let z = startZ; z < startZ + size; z++) {
				let block;
				try {
					block = dimension.getBlock({ x, y, z });
				} catch {
					continue; // Probably a generic "out of bounds" error
				}

				if (!block) continue;

				const converted = tryConversion(block);
				if (converted) convertedCount++;

				yield;
			}
		}
	}

	const endTime = Date.now();
	const executionTime = endTime - startTime;

	mc.world.sendMessage(`Converted ${convertedCount} blocks (took ${executionTime} ms)`);
}

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: "lettersigns:convert_scpdy_signs",
			description: "Convert nearby Alphanumeric Signs from SCP: Dystopia 2.0 Alpha to Letter Signs",
			permissionLevel: mc.CommandPermissionLevel.Any,
			cheatsRequired: true,
			optionalParameters: [
				{
					name: "center",
					type: mc.CustomCommandParamType.Location,
				},
			],
		},
		(origin, customCenter) => {
			const dimension = origin.sourceBlock?.dimension ?? origin.sourceEntity?.dimension;

			if (dimension === undefined) {
				return {
					status: mc.CustomCommandStatus.Failure,
					message: "Failed to get target dimension",
				};
			}

			/** @type {mc.Vector3 | undefined} */
			const center = customCenter ?? origin.sourceBlock?.center() ?? origin.sourceEntity?.location;

			if (center === undefined) {
				return {
					status: mc.CustomCommandStatus.Failure,
					message: "Failed to get center location",
				};
			}

			mc.system.runJob(conversionGenerator(dimension, center));

			return {
				status: mc.CustomCommandStatus.Success,
				message: "Converting nearby Alphanumeric Signs...",
			};
		},
	);
});
