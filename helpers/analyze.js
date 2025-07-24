// Analyze.js
// Analyzes a server remotely with more info than analyze
export async function main(ns) {
	function ramBar(used, total, length = 20) {
		if (total === 0) {
			const bar = "[" + "-".repeat(length) + "]"
			return `${bar}  Max is 0`
		}

		const percent = used / total

		let bar = ""
		const percentStr = (percent * 100).toFixed(1).padStart(5, " ") + "%"

		if (percent < 0) {
			const left = Math.floor((length - 2) / 2)
			const right = length - left - 2
			bar = "[" + "-".repeat(left) + ":(" + "-".repeat(right) + "]"
		} else {
			const filledLength = Math.round(length * percent)
			const emptyLength = length - filledLength
			bar = "[" + "|".repeat(filledLength) + "-".repeat(emptyLength) + "]"
		}

		return `${bar} ${percentStr}`

	}
	let portTools = 0
	if (ns.fileExists("BruteSSH.exe", "home")) {
		portTools++
	}
	if (ns.fileExists("FTPCrack.exe", "home")) {
		portTools++
	}
	if (ns.fileExists("relaySMTP.exe", "home")) {
		portTools++
	}
	if (ns.fileExists("HTTPWorm.exe", "home")) {
		portTools++
	}
	if (ns.fileExists("SQLInject.exe", "home")) {
		portTools++
	}
	let server = ns.args[0]
	let player = ns.getPlayer()
	if (ns.args[0] == undefined) {
		ns.toast("Hostname required!", "error", 5000)
	} else {
		ns.tprint("Server name: " + server)
		ns.tprint("-----------------------------------------------------------------------------------------------------------------------")
		ns.tprint("RAM: [" + Math.ceil(ns.getServerUsedRam(server)) + "/" + ns.getServerMaxRam(server) + "] (" + Math.floor(ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) + " unused)")
		ns.tprint(ramBar(ns.getServerUsedRam(server), ns.getServerMaxRam(server), 20) + " to full")
		ns.tprint("-----------------------------------------------------------------------------------------------------------------------")
		ns.tprint("Money: [" + Math.ceil(ns.getServerMoneyAvailable(server)) + "/" + ns.getServerMaxMoney(server) + "] (" + Math.floor(ns.getServerMaxMoney(server) - ns.getServerMoneyAvailable(server)) + " space)")
		ns.tprint(ramBar(ns.getServerMoneyAvailable(server), ns.getServerMaxMoney(server), 20) + " to max")
		ns.tprint(ns.tFormat(ns.getGrowTime(server)) + " to Grow")
		ns.tprint("-----------------------------------------------------------------------------------------------------------------------")
		ns.tprint("Security: [" + Math.floor(ns.getServerSecurityLevel(server)) + "/" + ns.getServerMinSecurityLevel(server) + "] (" + Math.floor(ns.getServerSecurityLevel(server) - ns.getServerMinSecurityLevel(server)) + " above minimum)")
		ns.tprint(ramBar(ns.getServerMinSecurityLevel(server), ns.getServerSecurityLevel(server), 20) + " to minimum")
		ns.tprint(ns.tFormat(ns.getWeakenTime(server)) + " to Weaken")
		ns.tprint("-----------------------------------------------------------------------------------------------------------------------")
		ns.tprint(ns.getServerRequiredHackingLevel(server) + " required Hacking Skill (player has " + player.skills.hacking + ")")
		ns.tprint(ns.getServerNumPortsRequired(server) + " ports required to NUKE (player has " + portTools + ")")
		ns.tprint((ns.hackAnalyzeChance(server) * 100) + "% chance to hack server")
		ns.tprint(ns.tFormat(ns.getHackTime(server)) + " to Hack")
		ns.tprint("-----------------------------------------------------------------------------------------------------------------------")
		ns.tprint("Nearby Servers: " + ns.scan(server))
	}

}
