/** @param {NS} ns */
export async function main(ns) {
	let shockRecovered = [];
	let syncCompleted = [];
	let homicidesStarted = [];
	let statTrained = [];
	let work

	while (true) {
		const sleeves = ns.sleeve.getNumSleeves();
		while (shockRecovered.length < sleeves) {
			shockRecovered.push(false);
			syncCompleted.push(false);
			homicidesStarted.push(false);
			statTrained.push(false);
		}

		for (let i = 0; i < sleeves; i++) {
			const sleeve = ns.sleeve.getSleeve(i);
			const stats = sleeve.skills;

			if (sleeve.shock > 0) { // recover shock
				ns.sleeve.setToShockRecovery(i);
				if (!shockRecovered[i]) {
					ns.toast(`Sleeve ${i} started Shock Recovery`, "info");
					shockRecovered[i] = true;
				}
			}
			else if ( // train if below 50 in combat
				stats.strength < 50 ||
				stats.defense < 50 ||
				stats.dexterity < 50 ||
				stats.agility < 50
			) { // pick a stat to train
				let gym = "Powerhouse Gym";
				if (stats.strength < 50) {
					ns.sleeve.setToGymWorkout(i, gym, "Strength");
				} else if (stats.defense < 50) {
					ns.sleeve.setToGymWorkout(i, gym, "Defense");
				} else if (stats.dexterity < 50) {
					ns.sleeve.setToGymWorkout(i, gym, "Dexterity");
				} else if (stats.agility < 50) {
					ns.sleeve.setToGymWorkout(i, gym, "Agility");
				}
				if (!statTrained[i]) {
					ns.toast(`Sleeve ${i} started training combat stats`, "info");
					statTrained[i] = true;
				}
			}
			else if (ns.heart.break() > -54000) { // get karma to gang level
				ns.sleeve.setToCommitCrime(i, "Homicide");
				if (!homicidesStarted[i]) {
					ns.toast(`Sleeve ${i} started committing Homicide`, "info");
					homicidesStarted[i] = true;
				}
			} else if (sleeve.sync < 95) { // get sync to 95
				ns.sleeve.setToSynchronize(i);
				if (!syncCompleted[i]) {
					ns.toast(`Sleeve ${i} started Synchronization`, "info");
					syncCompleted[i] = true;
				}
			} else {

				const playerWork = ns.singularity.getCurrentWork();
				if (playerWork !== null) { // if player working
					work = playerWork;
					if (work.type === "FACTION") {
						ns.sleeve.setToFactionWork(i, work.factionName, work.factionWorkType);
					} else if (work.type === "COMPANY") {
						ns.sleeve.setToCompanyWork(i, work.companyName);
					} else if (work.type === "CLASS") {
						if (work.location.includes("Gym")) {
							ns.sleeve.travel(i, "Sector-12");
							ns.sleeve.setToGymWorkout(i, "Powerhouse Gym", work.classType);
						} else if (
							work.location.includes("University") ||
							work.location.includes("ZB")
						) {
							ns.sleeve.travel(i, "Volhaven");
							ns.sleeve.setToUniversityCourse(i, "ZB Institute of Technology", work.classType);
						}
					} else { // if player work can't be sleeve
						ns.sleeve.travel(i, "Volhaven");
						ns.sleeve.setToUniversityCourse(i, "ZB Institute of Technology", "Algorithms");
					}
				} else { // if player not working
					ns.sleeve.travel(i, "Volhaven");
					ns.sleeve.setToUniversityCourse(i, "ZB Institute of Technology", "Algorithms");
				}
			}
		}
		await ns.sleep(1000);
	}
}
