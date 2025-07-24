// GetAllServers.js
// Creates an array of every server using a recursive search and prints it to the terminal
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

    ns.tprint("All servers found:");
    ns.tprint(visited);
}
