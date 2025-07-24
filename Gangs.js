/** @param {NS} ns */
export async function main(ns) {
	ns.gang.setTerritoryWarfare(false) // finds territory ticks
	ns.print(ns.tFormat(Date.now()))
	let power = ns.gang.getOtherGangInformation().Tetrads.power
	ns.toast("Now running checks for territory ticks", "warning")
	while (ns.gang.getOtherGangInformation().Tetrads.power === power) {
		await ns.sleep(50)
	}
	ns.toast("Found Tick!", "warning")
	let distanceToTick = 20
	while (true) {
		let gang = ns.gang.getGangInformation()
		let equipment = [
			"Baseball Bat",
			"Katana",
			"Glock 18C",
			"P90C",
			"Steyr AUG",
			"AK-47",
			"M15A10 Assault Rifle",
			"AWM Sniper Rifle",
			"Bulletproof Vest",
			"Full Body Armor",
			"Liquid Body Armor",
			"Graphene Plating Armor",
			"Ford Flex V20",
			"ATX1070 Superbike",
			"Mercedes-Benz S9001",
			"White Ferrari"
		]

		let player = ns.getPlayer()
		let members = ns.gang.getMemberNames()

		// find a power tick
		if (ns.gang.getBonusTime() >= 5000) {
			ns.toast("Bonus Time Active, Ticks Cancelled", "warning")
		} else if (distanceToTick <= 1) {
			for (let i of members) { ns.gang.setMemberTask(i, "Territory Warfare") }
			distanceToTick = 19
			await ns.sleep(1000)
			for (let i of members) { ns.gang.setMemberTask(i, "Idle") }
		} else {
			distanceToTick -= 1

			// enable clash check
		}
		if (ns.gang.getChanceToWinClash("Speakers for the Dead") < 0.8) {
			ns.gang.setTerritoryWarfare(false);
		} else {
			ns.gang.setTerritoryWarfare(true);
		}

		if (gang.respect > ns.gang.respectForNextRecruit()) { // attempt to get new members
			ns.gang.recruitMember("mem" + members.length)
			ns.toast("Recruited new member mem" + members.length, "warning")
			ns.gang.setMemberTask("mem" + members.length, "Train Combat")
		}
		for (let i = 0; i < members.length; i++) {
			let member = members[i];
			let memberInfo = ns.gang.getMemberInformation(member);
			let ascensionResult = ns.gang.getAscensionResult(member);

			// ascension checks
			if (ascensionResult && ascensionResult.def > memberInfo.def_asc_mult * 2) {
				ns.gang.ascendMember(member);
				ns.toast("Ascended member " + member + ".", "warning", 5000);
				ns.gang.setMemberTask(member, "Train Combat");
				continue;
			}

			// task assignment
			if (memberInfo.def < 500) {
				ns.gang.setMemberTask(member, "Train Combat");
			} else if (members.length < 12) {
				ns.gang.setMemberTask(member, "Terrorism");
			} else if (memberInfo.def < 8000) {
				ns.gang.setMemberTask(member, "Train Combat")
			} else if (gang.respect < 1000000000) { // 1 billion
				ns.gang.setMemberTask(member, "Terrorism")
			} else {
				ns.gang.setMemberTask(member, "Human Trafficking")
			}
		}




		for (let eq = 0; eq < equipment.length; eq++) { // loop through equipment
			for (let m = 0; m < members.length; m++) { // loop through members
				let ownedEquip = ns.gang.getMemberInformation(members[m]).upgrades || []
				if (
					!ownedEquip.includes(equipment[eq]) &&
					ns.gang.getEquipmentCost(equipment[eq]) < player.money
				) {
					ns.gang.purchaseEquipment(members[m], equipment[eq]);
					if (ownedEquip.includes(equipment[eq])) { ns.toast("Purchased equipment " + equipment[eq] + " for member " + members[m], "warning"); }
				}
			}
		}
		await ns.sleep(1000) // check every 1s
	}
}
