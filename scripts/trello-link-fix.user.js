// ==UserScript==
// @name        Trello Smart Link Fix
// @description Fixes Trello's "smart" link anti-feature.
// @version     1.0.3
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
			// Un-"smart"-ify links.
			mut.target.className = "";
			mut.target.innerHTML = mut.target.href;
		} else if (mut.target.nodeName == "DIV" && mut.target.innerText.includes("Show more labels")) {
			// Expand the labels list.
			//
			// Trello doesn't want to fix this because it doesn't look good on
			// small laptops... To bad there is no way to easily query the
			// devices media type. And JavaScript doesn't exist so that isn't
			// possible either. Maybe one day we will have that technology.
			//
			// https://community.atlassian.com/t5/Trello-questions/Can-I-show-all-labels-by-default-in-the-quot-Labels-quot-sub/qaq-p/2433715
			const buttons = mut.target.querySelectorAll("button")
			for (const button of buttons) {
				if (button.innerText.includes("Show more labels")) {
					button.click();
					return;
				}
			}
		} else if (mut.target.nodeName == "A" && mut.target.innerText.includes("View all Trello attachments")) {
			// Always show all attached cards. By default it only shows you the
			// first few.
			mut.target.click();
		}
	}
});

mutObs.observe(document.body, {
	subtree: true,
	childList: true,
});
