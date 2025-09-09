const currentLang = localStorage.getItem("lang") || "en";
const langBtn = document.getElementById("nav-lang-btn");

async function getTranslation(lang) {
	let translationUrl = "./translations/en.json";
	if (lang === "hu") {
		translationUrl = "./translations/hu.json";
	}
	try {
		const response = await fetch(translationUrl);
		if (!response.ok) throw new Error("Failed to load translation");
		const translation = await response.json();
		return translation;
	} catch (error) {
		console.error("Error loading translation:", error);
		return null;
	}
}

document.addEventListener("DOMContentLoaded", async function () {
	const translation = await getTranslation(currentLang);
	if (translation) {
		loadTranslations(translation);
	}
	console.log(currentLang);
});

function loadTranslations(translation) {
	// Navigation
	document.getElementById("nav-home").textContent = translation.nav.home;
	document.getElementById("nav-education").textContent =
		translation.nav.education;
	document.getElementById("nav-experience").textContent =
		translation.nav.experience;
	document.getElementById("nav-skills").textContent = translation.nav.skills;
	document.getElementById("nav-lang-btn").textContent = translation.nav.langBtn;

	// Header
	const nameHeader = document.getElementById("header-name");
	if (nameHeader) nameHeader.textContent = translation.header.name;

	// Introduction
	document.getElementById("introduction").textContent =
		translation.introduction;

	// Education section
	document.getElementById("education").textContent =
		translation.education.title;

	document.getElementById("education-1-title").textContent =
		translation.education.list[0].degree;
	document.getElementById("education-1-institution").textContent =
		translation.education.list[0].institution;
	document.getElementById("education-2-title").textContent =
		translation.education.list[1].degree;
	document.getElementById("education-2-institution").textContent =
		translation.education.list[1].institution;
	document.getElementById("education-3-title").textContent =
		translation.education.list[2].degree;
	document.getElementById("education-3-institution").textContent =
		translation.education.list[2].institution;

	// Experience section
	document.getElementById("experience").textContent =
		translation.experience.title;
	const expCards = document.querySelectorAll(
		"#experience ~ .container-fluid .card"
	);
	if (expCards && translation.experience.list) {
		translation.experience.list.forEach((item, idx) => {
			const card = expCards[idx];
			if (!card) return;
			const title = card.querySelector(".card-title");
			const subtitle = card.querySelector(".card-subtitle");
			const institution = card.querySelector("p.text-center");
			if (title) title.textContent = item.role;
			if (subtitle) subtitle.textContent = item.period;
			if (institution && item.institution)
				institution.textContent = item.institution;
			// List items
			const details = card.querySelectorAll(
				"ul.list-group-flush .list-group-item"
			);
			if (details && item.details) {
				item.details.forEach((detail, i) => {
					if (details[i]) details[i].textContent = detail;
				});
			}
		});
	}

	// Skills section
	document.getElementById("skills").textContent = translation.skills.title;
	const skillCards = document.querySelectorAll(
		"#skills ~ .container .card-text.text-center"
	);
	if (skillCards && translation.skills.list) {
		translation.skills.list.forEach((skill, idx) => {
			if (skillCards[idx]) skillCards[idx].textContent = skill;
		});
	}

	// Footer
	const copyright = document.querySelector("footer span.text-body-secondary");
	if (copyright) copyright.textContent = translation.footer.copyright;
}

langBtn.addEventListener("click", async () => {
	const currentLang = localStorage.getItem("lang") || "en";

	const newLang = currentLang === "en" ? "hu" : "en";

	const translation = await getTranslation(newLang);
	if (translation) {
		loadTranslations(translation);
		localStorage.setItem("lang", newLang);
		langBtn.textContent = newLang === "en" ? "Magyar" : "English";
		return;
	}
});
