/** @param {NS} ns */
export async function main(ns) {
	ns.singularity.purchaseTor()
	let progs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe", "ServerProfiler.exe", "DeepscanV2.exe", "AutoLink.exe"]
	for (let i of progs) { ns.singularity.purchaseProgram(i) }
	ns.toast("Purchased All Programs")
}
