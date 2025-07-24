export async function main(ns) {
    let money = ns.getServerMoneyAvailable("home")
    function getbestbuy() { // defines the function
        const ramOptions = [ // lists all the values for servers
            { ram: 2, cost: ns.getPurchasedServerCost(2) },
            { ram: 4, cost: ns.getPurchasedServerCost(4) },
            { ram: 8, cost: ns.getPurchasedServerCost(8) },
            { ram: 16, cost: ns.getPurchasedServerCost(16) },
            { ram: 32, cost: ns.getPurchasedServerCost(32) },
            { ram: 64, cost: ns.getPurchasedServerCost(64) },
            { ram: 128, cost: ns.getPurchasedServerCost(128) },
            { ram: 256, cost: ns.getPurchasedServerCost(256) },
            { ram: 512, cost: ns.getPurchasedServerCost(512) },
            { ram: 1024, cost: ns.getPurchasedServerCost(1024) },
            { ram: 2048, cost: ns.getPurchasedServerCost(2048) },
            { ram: 4096, cost: ns.getPurchasedServerCost(4096) },
            { ram: 8192, cost: ns.getPurchasedServerCost(8192) },
            { ram: 16384, cost: ns.getPurchasedServerCost(16384) },
            { ram: 32768, cost: ns.getPurchasedServerCost(32768) },
            { ram: 65536, cost: ns.getPurchasedServerCost(65536) },
            { ram: 131072, cost: ns.getPurchasedServerCost(131072) },
            { ram: 262144, cost: ns.getPurchasedServerCost(262144) },
            { ram: 524288, cost: ns.getPurchasedServerCost(524288) },
            { ram: 1048576, cost: ns.getPurchasedServerCost(1048576) }
        ];

        // sorts the RAM options by cost in ascending order in case devs add more later
        ramOptions.sort((a, b) => a.cost - b.cost);
        // initialize bestbuy
        let bestbuy = null;

        // go through the sorted RAM options
        for (let i = 0; i < ramOptions.length; i++) {
            if (money >= ramOptions[i].cost) {
                bestbuy = ramOptions[i].ram;
            } else {
                break; // no need to check further
            }
        }

        return bestbuy !== null ? bestbuy : 0;
    }
    ns.tprint("The largest server you can currently buy has " + getbestbuy() + " GB of RAM.")
}
