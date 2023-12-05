    var listePers = document.getElementById('listePers');
    var inputNom = document.getElementById('nom');
    var inputPrenom = document.getElementById('prenom');
    var inputMail = document.getElementById('mail');
    var inputId = document.getElementById('idPerso');
   
    var divErr = document.getElementById('divErr');
    var ajouter =document.getElementById('ajouter');

    
    // Appel fonction "get" recuperation des donnees
    get("http://fbrc.esy.es/DWWM22053/Api/api.php/users")
    
    //Action du click sur le bouton ajouter
    ajouter.addEventListener("click", ajoutePerso);
    
//########################################################## FONCTIONS ###########################################################################

//////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 
     * @param {URL} urlA 
     */
    function get(urlA) {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
      
        fetch(urlA, requestOptions)
        .then((response) => response.json())
        .then(function (data) {
//console.log("La requête GET a abouti avec la réponse JSON : ", data);
//console.table(data.users.records)
            genereListe(data.users.records)
        })
        .catch(function (error) {
            console.log("La requête GET a échoué : ", error);//
        });
    }
//////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 
     * @param {string} valeur 
     */
    function genereListe(valeur) {
    
        var tbl = document.getElementById("listePers");
        var tblBody = document.createElement("tbody");
    
        for (let i = 0; i < valeur.length; i++) {
            // Creation element "tr"
            var row = document.createElement("tr");
        
            for (let j = 0; j < 4; j++) {
                //Creation element "td"
                var cell = document.createElement("td");
                //Ajout du contenu a nos element html
                var cellText = document.createTextNode(
                    valeur[i][j]
                );
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        tbl.setAttribute("border", "2");
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////   
      
    function ajoutePerso() {
        var nom = inputNom.value;
        var prenom = inputPrenom.value;
        var mail = inputMail.value;
        var id = inputId.value;
//console.log(id + "," + nom + "," + prenom + "," + mail );
        try {
            //Creation perso
            var adherent = creerPerso(id, nom, prenom, mail);
//console.log(adherent); 
//console.log(adherent.getNom());    
        
            divErr.innerText = "";
            
            //Conversion format JSON
            var dataJson = '{"id": "' + id + '", "nom":"' + nom + '", "prenom":"' + prenom + '", "email":"' + mail +'"' + '}';
//console.log(dataJson);        
            post("http://fbrc.esy.es/DWWM22053/Api/api.php/users", dataJson);
        
            location.reload()
            
            
        } catch (err) {
            divErr.innerText = err.message;
            console.log(err.message);
        }
    }   

///////////////////////////////////////////////////////////////////////////////
    /**
     * 
     * @param {number} id 
     * @param {string} nom 
     * @param {string} prenom 
     * @param {string} mail 
     * @returns 
     */
    function creerPerso(id, nom, prenom, mail) {
            
        var perso = new Personne (id, nom, prenom, mail) ;
        return perso;

    }

///////////////////////////////////////////////////////////////////////////////
    /**
     * 
     * @param {string} url 
     * @param {string} donnees 
     */
    function post(url, donnees) {
        var requestOptions = {
            method: "POST",
            body: donnees,
            redirect: "follow",
        };
    
        fetch(url, requestOptions)
        .then((response) => response.text())
        .then(function (data) {
            console.log("La requête POST a abouti avec la réponse JSON : ", data);
        })
        .catch(function (error) {
            console.log("La requête POST a échoué : ", error);
        });
    }