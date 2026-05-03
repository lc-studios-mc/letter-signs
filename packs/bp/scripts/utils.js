import * as mc from "@minecraft/server";

/**
 * @param {mc.Block} origin
 * @param {mc.Direction} direction
 * @param {number} [steps=1]
 * @returns {mc.Block | undefined}
 */
export const getRelativeBlockFrom = (origin, direction, steps = 1) => {
	switch (direction) {
		case mc.Direction.Up:
			return origin.above(steps);
		case mc.Direction.Down:
			return origin.below(steps);
		case mc.Direction.North:
			return origin.north(steps);
		case mc.Direction.South:
			return origin.south(steps);
		case mc.Direction.West:
			return origin.west(steps);
		case mc.Direction.East:
			return origin.east(steps);
	}
};

/**
 * @param {mc.Direction} direction
 * @returns {mc.Direction}
 */
export const getOppositeDirection = (direction) => {
	switch (direction) {
		case mc.Direction.Up:
			return mc.Direction.Down;
		case mc.Direction.Down:
			return mc.Direction.Up;
		case mc.Direction.North:
			return mc.Direction.South;
		case mc.Direction.East:
			return mc.Direction.West;
		case mc.Direction.South:
			return mc.Direction.North;
		case mc.Direction.West:
			return mc.Direction.East;
		default:
			return mc.Direction.North;
	}
};

/**
 * @param {mc.Vector2} rotation
 * @param {boolean} [ignorePitch=false]
 * @param {number} [pitchThreshold=45]
 * @returns {mc.Direction}
 */
export const rotationToDirection = (rotation, ignorePitch = false, pitchThreshold = 45) => {
	if (!ignorePitch && rotation.x < -pitchThreshold) return mc.Direction.Up;
	if (!ignorePitch && rotation.x > pitchThreshold) return mc.Direction.Down;
	if (rotation.y > -45 && rotation.y <= 45) return mc.Direction.South;
	if (rotation.y > 45 && rotation.y <= 135) return mc.Direction.West;
	if (rotation.y > 135 || rotation.y <= -135) return mc.Direction.North;
	if (rotation.y > -135 && rotation.y <= -45) return mc.Direction.East;
	return mc.Direction.North;
};
