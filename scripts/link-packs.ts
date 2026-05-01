import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const { values: options } = parseArgs({
	options: {
		delete: {
			type: "boolean",
			short: "d",
		},
	},
});

const bpSourcePath = path.resolve("packs/bp");
const rpSourcePath = path.resolve("packs/rp");

const bpLinkDest = Bun.env["LINK_BP_DEST"];
if (bpLinkDest === undefined) {
	throw new Error("Environment variable 'LINK_BP_DEST' is undefined");
}

const rpLinkDest = Bun.env["LINK_RP_DEST"];
if (rpLinkDest === undefined) {
	throw new Error("Environment variable 'LINK_RP_DEST' is undefined");
}

const bpLinkPath = path.resolve(bpLinkDest);
const rpLinkPath = path.resolve(rpLinkDest);

function createLinks() {
	if (!fs.existsSync(bpLinkPath)) {
		fs.symlinkSync(bpSourcePath, bpLinkPath, "junction");
		console.log("Created symbolic link:", `'${bpLinkPath}'`, "->", `'${bpSourcePath}'`);
	} else {
		console.log("Skipped creating BP link because it already exists");
	}

	if (!fs.existsSync(rpLinkPath)) {
		fs.symlinkSync(rpSourcePath, rpLinkPath, "junction");
		console.log("Created symbolic link:", `'${rpLinkPath}'`, "->", `'${rpSourcePath}'`);
	} else {
		console.log("Skipped creating RP link because it already exists");
	}
}

function deleteLinks() {
	if (fs.existsSync(bpLinkPath)) {
		fs.rmSync(bpLinkPath);
		console.log("Deleted symbolic link:", `'${bpLinkPath}'`);
	} else {
		console.log("Skipped deleting BP link because it doesn't exist");
	}

	if (fs.existsSync(rpLinkPath)) {
		fs.rmSync(rpLinkPath);
		console.log("Deleted symbolic link:", `'${rpLinkPath}'`);
	} else {
		console.log("Skipped deleting RP link because it doesn't exist");
	}
}

if (options.delete) {
	deleteLinks();
} else {
	createLinks();
}
