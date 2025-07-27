/** @param {NS} ns */
export async function main(ns) {
  const parentMap = {};
  parentMap["home"] = null;
  function scan(host) {
    for (const neighbor of ns.scan(host)) {
      if (!(neighbor in parentMap)) {
        parentMap[neighbor] = host;
        scan(neighbor);
      }
    }
  }
  scan("home");
  const target = ns.args[0];
  if (!(target in parentMap)) {
    ns.tprint("That server does not exist!");
    return;
  }
  const path = [];
  let current = target;
  while (current !== null) {
    path.unshift(current);
    current = parentMap[current];
  }
  for (const server of path) {
    ns.tprint(server)
    ns.singularity.connect(server);
  }
}
