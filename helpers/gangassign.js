/** @param {NS} ns */
export async function main(ns) {
	ns.scriptKill("gangs.js", "home")
	ns.scriptKill("helpers/timer.js", "home")
	let members = ns.gang.getMemberNames()
	for (let i = 0; i < members.length; i++) {
		let member = members[i];
		ns.gang.setMemberTask(member, ns.args[0])
	}
	ns.exec("helpers/timer.js", "home", 1, ns.args[1] * 1000, "gangs.js")
	ns.toast("Assigned members to " + ns.args[0] + " for " + ns.args[1] + "s.", "success", 5000)
}
