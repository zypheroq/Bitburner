// Infecticide.js
// Cracks and nukes all servers it can, then adds a file of your choice (filename), then runs it
export async function main(ns) {
	const visited = [];
	function scanServers(host) {
		const neighbors = ns.scan(host);
		for (const neighbor of neighbors) {
			if (!visited.includes(neighbor)) {
				visited.push(neighbor);
				scanServers(neighbor);
			}
		}
	}

	visited.push("home");
	scanServers("home");

	const filename = "hacking.js"
	const servers = visited

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
