/** @param {NS} ns */
export async function main(ns) {
	let augs = ns.singularity.getAugmentationsFromFaction("Slum Snakes")
	for (let i of augs) {
		ns.singularity.purchaseAugmentation("Slum Snakes", i)
	}
	while(ns.getServerMoneyAvailable("home") > ns.singularity.getAugmentationPrice("NeuroFlux Governor")) {
	ns.singularity.purchaseAugmentation("Sector-12", "NeuroFlux Governor")
 }
 ns.singularity.installAugmentations("helpers/start.js")
 }
