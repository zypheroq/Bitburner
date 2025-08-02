/** @param {NS} ns */
export async function main(ns) {
	function formatNumber(num) {
		if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'b';
		if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'm';
		if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
		return num.toString();
	}

	function calculateSkill(exp, mult = 1) {
		const val = Math.floor(mult * (32 * Math.log(exp + 534.6) - 200));
		return Math.max(1, val);
	}

	function calculateExp(skill, mult = 1) {
		const s = Math.floor(skill);
		let value = Math.exp((s / mult + 200) / 32) - 534.6;
		return Math.max(0, value);
	}

	function calculateSkillProgress(exp, mult = 1) {
		const currSkill = calculateSkill(exp, mult);
		const nextSkill = currSkill + 1;

		const baseExp = calculateExp(currSkill, mult);
		const nextExp = calculateExp(nextSkill, mult);

		const progress = ((exp - baseExp) / (nextExp - baseExp)) * 100;
		return Math.min(Math.max(progress, 0), 100);
	}

	let avgIncomePerSecond
	let samples = []
	let hackText
	let moneyText
	let expGain
	let income
	let karmastat
	let oldKarmaRow
	let bars
	let newRow
	let newCell
	let formattedKarma
	let charismaBarRow
	let p
	let intText
	let intPercent
	let player

	while (true) {
		player = ns.getPlayer()

		samples.push(ns.getServerMoneyAvailable("home"));
		if (samples.length >= 60) {
			samples.shift()
		}
		if (samples.length > 1) {
			let totalIncome = 0;
			for (let i = 1; i < samples.length; i++) {
				totalIncome += samples[i] - samples[i - 1];
			}
			let avgIncomePerSample = totalIncome / (samples.length - 1);
			avgIncomePerSecond = avgIncomePerSample * 2; // since samples every 0.5s
		}

		hackText = eval('document.querySelector(".MuiTypography-root.MuiTypography-body1.css-jtr2np")')
		expGain = formatNumber(Math.floor(ns.getTotalScriptExpGain()))
		hackText.textContent = "Hack " + expGain + "/s "

		moneyText = eval('document.querySelector(".MuiTypography-root.MuiTypography-body1.css-1wj6ynj")')
		income = Math.floor(avgIncomePerSecond)
		if (income > 0) { moneyText.innerHTML = "Money $" + formatNumber(income) + "/s&nbsp;" }

		intText = eval('document.querySelector(".MuiTypography-root.MuiTypography-body1.css-1kt61tv")')
		intPercent = Math.floor(calculateSkillProgress(player.exp.intelligence))
		intText.innerHTML = "Int " + intPercent + "%&nbsp;"

		karmastat = ns.heart.break()
		bars = [...eval('document.querySelectorAll("tr")')].filter(row =>
			eval('row.querySelector("th.css-wv5f3v-cellNone > span.MuiLinearProgress-root")')
		);
		if (bars.length < 7) return;
		charismaBarRow = bars[6];

		oldKarmaRow = eval('document.getElementById("karma-row")');
		if (oldKarmaRow) oldKarmaRow.remove();

		formattedKarma = (karmastat < 0 ? '-' : '') + formatNumber(Math.abs(karmastat));

		p = eval('document.createElement("p")');
		p.textContent = `Karma ${formattedKarma}`;
		p.style.color = '#aa2a2a'
		p.style.fontFamily = 'JetBrainsMono, "Courier New", monospace';
		p.style.fontWeight = '400';
		p.style.fontSize = '1rem';
		p.style.lineHeight = '1.5';
		p.style.margin = '0px';

		newRow = eval('document.createElement("tr")');
		newRow.id = 'karma-row';
		newRow.style.border = 'none';

		newCell = eval('document.createElement("td")');
		newCell.colSpan = charismaBarRow.children.length;
		newCell.style.border = 'none';
		newCell.style.padding = '0px 0px';
		newCell.appendChild(p);

		newRow.appendChild(newCell);
		charismaBarRow.parentNode.insertBefore(newRow, charismaBarRow.nextSibling);

		await ns.sleep(500)
	}
}
