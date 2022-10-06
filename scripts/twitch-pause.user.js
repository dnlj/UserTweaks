// ==UserScript==
// @name        Twitch Pauser
// @description Automatically pauses twitch streams.
// @version     1.0.1
// @namespace   dnlj
// @author      dnlj
// @homepage    https://github.com/dnlj/UserTweaks
// @downloadURL https://raw.githubusercontent.com/dnlj/UserTweaks/master/scripts/twitch-pause.user.js
// @updateURL   https://raw.githubusercontent.com/dnlj/UserTweaks/master/scripts/twitch-pause.user.js
// @match       *://*.twitch.tv/*
// @grant       none
// @run-at document-start
// ==/UserScript==

let lastSrc = "";
const obs = new MutationObserver((muts, obs2) => {
	for (const m of muts) {
		for (let i = 0; i < m.addedNodes.length; ++i) {
			const n = m.addedNodes[i];
			if (n.tagName == "VIDEO") {
				n.oncanplay = e => {
					if (n.src == lastSrc) { return; }
					lastSrc = n.src;
					console.log("Twitch Pauser paused video");
					n.pause();
					setTimeout(()=>{
						n.pause();
					}, 250);
				}
			}
		}
	}
})

obs.observe(document.documentElement || document.body, {
	childList: true,
	subtree: true,
});