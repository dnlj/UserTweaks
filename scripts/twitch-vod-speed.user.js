// ==UserScript==
// @name        Twitch VOD Speed
// @description Adds Speed Slider to VODs
// @version     1.0.1
// @namespace   dnlj
// @author      dnlj
// @homepage    https://github.com/dnlj/UserTweaks
// @downloadURL https://raw.githubusercontent.com/dnlj/UserTweaks/master/scripts/twitch-vod-speed.user.js
// @updateURL   https://raw.githubusercontent.com/dnlj/UserTweaks/master/scripts/twitch-vod-speed.user.js
// @match       *://*.twitch.tv/*/video/*
// @match       *://*.twitch.tv/videos/*
// @grant       none
// @run-at      document-start
// ==/UserScript==


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log;
const rightClass = "player-controls__right-control-group";

//console.log("++ Twitch VOD Speed ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

const setup = () => {
	const right = $("."+ rightClass);
	
	// Setup the slider
	const slider = document.createElement("input");
	slider.type = "range";
	slider.min = 0;
	slider.max = 5;
	slider.value = 1; // TODO: read from actual video
	slider.step = 0.1;
	slider.onchange = () => {}
	slider.addEventListener("change", (e) => {
		label.innerText = slider.value; // TODO: listen to playbackRate changed instead of updating here so that it is always 100% in sync
		$("video").playbackRate = slider.value;
	})
	
	// Setup the label
	const label = document.createElement("span");
	label.innerText = slider.value;
	label.style.width = "2em";
	label.style.textAlign = "center";
	
	// Add them to the controls
	right.prepend(slider, label);
}

const obs = new MutationObserver((muts, obs2) => {
	for (const m of muts) {
		if (m.target.classList && m.target.classList.contains(rightClass))
		{
			// Disconnect and ignore the other mutations. We only should run the
			// setup once.
			setup();
			obs.disconnect();
			return;
		}
	}
})

obs.observe(document.documentElement || document.body, {
	childList: true,
	subtree: true,
});

//console.log("-- Twitch VOD Speed ------------------------------------------------------------");