let userId = document.getElementById("idUser")
let url = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/"+ userId,
    data = "";
fetch(url, {method : "PUT"});