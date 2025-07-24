// Infecticide.js
// Cracks and nukes all servers it can, then adds a file of your choice (filename), then runs it
export async function main(ns) {
	const filename = "hacking.js"
	const servers = ["home","n00dles","foodnstuff","nectar-net","max-hardware","silver-helix","computek","summit-uni","rho-construction","alpha-ent","galactic-cyber","deltaone","icarus","univ-energy","global-pharm","omnia","defcomm","taiyang-digital","titan-labs","helios","4sigma","nwo","fulcrumassets","clarkinc","powerhouse-fitness","The-Cave",".","b-and-a","zb-def","applied-energetics","vitalife","solaris","millenium-fitness","CSEC","neo-net","avmnite-02h","sigma-cosmetics","zer0","phantasy","the-hub","rothman-uni","zb-institute","lexo-corp","snap-fitness","netlink","catalyst","crush-fitness","syscore","aevum-police","aerocorp","unitalife","zeus-med","infocomm","microdyne","run4theh111z","fulcrumtech","stormtech","omnitek","kuai-gong","blade","ecorp","megacorp","nova-med","omega-net","johnson-ortho","I.I.I.I","joesguns","hong-fang-tea","harakiri-sushi","iron-gym"]
	ns.print(ns.scan())
	for (var num = 0; num < (servers.length); num++) {
		var servername = servers[num]
		for (let i = 0; i < servers.length; i++) {
			const server = servers[i];
			let openPorts = 0;

			if (ns.fileExists("BruteSSH.exe", "home")) {
				ns.brutessh(server);
				openPorts++;
			}

			if (ns.fileExists("FTPCrack.exe", "home")) {
				ns.ftpcrack(server);
				openPorts++;
			}

			if (ns.fileExists("relaySMTP.exe", "home")) {
				ns.relaysmtp(server);
				openPorts++;
			}

			if (ns.fileExists("HTTPWorm.exe", "home")) {
				ns.httpworm(server);
				openPorts++;
			}

			if (ns.fileExists("SQLInject.exe", "home")) {
				ns.sqlinject(server);
				openPorts++;
			}

			const requiredPorts = ns.getServerNumPortsRequired(server);
			const hasAccess = ns.hasRootAccess(server);

			if (!hasAccess) {
				if (openPorts >= requiredPorts) {
					ns.nuke(server);
				}
			}
		}
		var ram = (ns.getServerMaxRam(servername) - ns.getServerUsedRam(servername))
		let threads = Math.floor(ram / ns.getScriptRam(filename));
		ns.scp(filename, servername, "home")
		if (threads >= 1) {
			ns.exec(filename, servername, threads);
		}
	}
	ns.toast("Ran!", "success")
}
