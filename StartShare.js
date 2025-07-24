/** @param {NS} ns */
export async function main(ns) {
	let threads = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam("share.js")) - 15
	ns.run("share.js", threads)
	ns.toast("Ran share.js with " + threads + " threads. Self-Destructing.")
}
