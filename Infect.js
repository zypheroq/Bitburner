// Infecticide.js
// Cracks and nukes all servers it can, then adds a file of your choice (filename), then runs it
export async function main(ns) {
	const filename = "xp/weaken.js"
	const servers = ["home", "n00dles", "foodnstuff", "zer0", "phantasy", "sigma-cosmetics", "nectar-net", "CSEC", "neo-net", "computek", "crush-fitness", "summit-uni", "silver-helix", "the-hub", "zb-institute", "lexo-corp", "galactic-cyber", "rho-construction", "global-pharm", "syscore", "alpha-ent", "millenium-fitness", "aerocorp", "unitalife", "defcomm", "zb-def", "univ-energy", "snap-fitness", "omnia", "solaris", "zeus-med", "taiyang-digital", "microdyne", "vitalife", "omnitek", "b-and-a", "The-Cave", ".", "blade", "megacorp", "fulcrumassets", "powerhouse-fitness", "nova-med", "titan-labs", "run4theh111z", "helios", "deltaone", "icarus", "infocomm", "applied-energetics", "fulcrumtech", "kuai-gong", "stormtech", "4sigma", "nwo", "clarkinc", "ecorp", "johnson-ortho", "rothman-uni", "avmnite-02h", "catalyst", "aevum-police", "omega-net", "netlink", "I.I.I.I", "joesguns", "max-hardware", "hong-fang-tea", "harakiri-sushi", "iron-gym", "darkweb"]
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
	ns.toast("Ran!")
}
