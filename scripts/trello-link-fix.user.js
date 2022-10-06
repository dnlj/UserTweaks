// ==UserScript==
// @name        Trello Smart Link Fix
// @description Fixes Trello's "smart" link anti-feature.
// @version     1.0.1
// @namespace   dnlj
// @author      dnlj
// @homepage    https://github.com/dnlj/UserTweaks
// @downloadURL https://raw.githubusercontent.com/dnlj/UserTweaks/master/scripts/trello-link-fix.user.js
// @updateURL   https://raw.githubusercontent.com/dnlj/UserTweaks/master/scripts/trello-link-fix.user.js
// @match       *://*.trello.com/*
// @grant       none
// ==/UserScript==

const mutObs = new MutationObserver((muts, obs) => {
	for (const mut of muts) {
		if (mut.target.className == "atlaskit-smart-link") {
			mut.target.className = "";
			mut.target.innerHTML = mut.target.href;
		}
	}
});

mutObs.observe(document.body, {
	subtree: true,
	childList: true,
});
