/** @param {NS} ns */
export async function main(ns) {
  const target = "nectar-net"
  const monthresh = ns.getServerMaxMoney(target) - (ns.getServerMaxMoney(target) * 0.9);
  const secthresh = ns.getServerMinSecurityLevel(target) + 2;

  while (true) {
    if (ns.getServerSecurityLevel(target) > secthresh) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < monthresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
