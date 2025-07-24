/** @param {NS} ns */
export async function main(ns) {
	function formatNumber(num) {
		if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'b';
		if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'm';
		if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
		return num.toString();
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
	while (true) {
		samples.push(ns.getServerMoneyAvailable("home"));
		if(samples.length >= 60) {
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

		hackText = document.querySelector(".MuiTypography-root.MuiTypography-body1.css-jtr2np")
		moneyText = document.querySelector(".MuiTypography-root.MuiTypography-body1.css-1wj6ynj")
		expGain = formatNumber(Math.floor(ns.getTotalScriptExpGain()))
	  income = Math.floor(avgIncomePerSecond)
		hackText.textContent = "Hack " + expGain + "/s "
		if(income > 0) { moneyText.innerHTML = "Money $" + formatNumber(income) + "/s&nbsp;" }
		karmastat = ns.heart.break()
		bars = [...document.querySelectorAll('tr')].filter(row =>
			row.querySelector('th.css-wv5f3v-cellNone > span.MuiLinearProgress-root')
		);
		if (bars.length < 6) return;
		charismaBarRow = bars[5];

		oldKarmaRow = document.getElementById('karma-row');
		if (oldKarmaRow) oldKarmaRow.remove();

		formattedKarma = (karmastat < 0 ? '-' : '') + formatNumber(Math.abs(karmastat));

		p = document.createElement('p');
		p.textContent = `Karma ${formattedKarma}`;
		p.style.color = '#991919'
		p.style.fontFamily = 'JetBrainsMono, "Courier New", monospace';
		p.style.fontWeight = '600';
		p.style.fontSize = '1rem';
		p.style.lineHeight = '1.43';
		p.style.margin = '0px 0 0 0';

		newRow = document.createElement('tr');
		newRow.id = 'karma-row';
		newRow.style.border = 'none';

		newCell = document.createElement('td');
		newCell.colSpan = charismaBarRow.children.length;
		newCell.style.border = 'none';
		newCell.style.padding = '0px 0px';
		newCell.appendChild(p);

		newRow.appendChild(newCell);
		charismaBarRow.parentNode.insertBefore(newRow, charismaBarRow.nextSibling);


		await ns.sleep(500)
	}
}
