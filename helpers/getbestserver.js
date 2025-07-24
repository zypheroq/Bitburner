// GetBestServer.js
// Gets the best server for you to hack based on money and hacking skill
// Doesn't take into account opened ports.

export async function main(ns) {
    const allServers = crawlAllServers(ns, "home");
    const player = ns.getPlayer()
    let bestserver = null
    let bestmoney = 0
    let serverlist = []
    ns.print("Discovered servers:")
    for (const server of allServers) {
        serverlist.push(server)
        if (typeof server !== "string") {
            ns.print("Skipping invalid entry '" + server + "'.")
            continue
        }
        let servmaxmon = ns.getServerMaxMoney(server)
        let servskill = ns.getServerRequiredHackingLevel(server)
        if (servmaxmon > 0) {
            ns.print(server + " - " + servskill + " - " + Math.round(servmaxmon))
        }
        if (servskill <= player.skills.hacking && servmaxmon > bestmoney) {
            bestmoney = servmaxmon
            bestserver = server
        }
    }
    ns.tprint("Best server found was " + bestserver + " with " + Math.round(bestmoney) + " maximum money.")
    ns.print(serverlist)
    function crawlAllServers(ns, currentServer, visited = new Set()) {
        visited.add(currentServer)
        const connected = ns.scan(currentServer)

        for (const neighbor of connected) {
            if (!visited.has(neighbor)) {
                crawlAllServers(ns, neighbor, visited)
            }
        }

        return Array.from(visited)
    }
}
