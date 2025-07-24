/** @param {NS} ns */
export async function main(ns) {
await ns.sleep(ns.args[0])
ns.exec(ns.args[1], "home")
ns.toast("Timer: Executed " + ns.args[1] + " after " + ns.args[0] / 1000 + "s.")
}
