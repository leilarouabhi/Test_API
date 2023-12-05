var listePers = document.getElementById('listePers');
var inputNom = document.getElementById('nom');
var inputPrenom = document.getElementById('prenom');
var inputMail = document.getElementById('mail');
var inputId = document.getElementById('idPerso');
let msg = document.getElementById("msg");
var divErr = document.getElementById('divErr');
var ajouter = document.getElementById('ajouter');
var comfirmationAjoutPersonne = document.getElementById("comfirmAddPerson");
var modifier = document.getElementById("btnModifier");
var afficher = document.getElementById("btnAfficher");
var form= document.getElementById("formPersonne");
var titre = document.getElementById("titre");
var confirmModifPersonne = document.getElementById("confirmModifBtn");
var annulerBtn = document.getElementById("annuler");


//Action du click sur le bouton ajouter
afficher.addEventListener("click", getAllUserData);
comfirmationAjoutPersonne.addEventListener("click", ajoutePerso);
ajouter.addEventListener("click", afficherAjoutPersoForm);
confirmModifPersonne.addEventListener("click", modifierPerso);
annulerBtn.addEventListener("click", actualiser);


//########################################################## FONCTIONS ###########################################################################
function actualiser() {
  window.location.reload();
} 
/**
 * fonction executé lors click afficher utilisateur
 * @param {*} params 
 */
function getAllUserData(params) {
    console.log("getAllUserData");
    titre.innerHTML = "Liste des utilisateurs"
    get("http://fbrc.esy.es/DWWM22053/Api/api.php/users");
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 
 * @param {URL} urlA 
 */
function get(urlA) {
     console.log("get");
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
  console.log("genererliste");

  // Récupère le tbody existant dans le tableau HTML
  var currentTblBody = document.getElementById("tableId");

  // Supprime tous les enfants du tbody existant
  while (currentTblBody.firstChild) {
      currentTblBody.removeChild(currentTblBody.firstChild);
  }

  for (let i = 0; i < valeur.length; i++) {
      var row = document.createElement("tr");

      for (let j = 0; j < 4; j++) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode(valeur[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
      }

      var newModifierBtn = creerModifierBtn();
      var newSupprimerBtn = creerSuppBtn();
      row.appendChild(newModifierBtn);
      row.appendChild(newSupprimerBtn);
      currentTblBody.appendChild(row);
  }

  // Ajuste le tableau HTML avec le nouveau tbody généré
  document.getElementById("listePers").appendChild(currentTblBody);
  document.getElementById("listePers").setAttribute("border", "2");
}



/////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Affiche le forumlaire lors du premier click sur le boutton"Ajouter une personne"
 *  */   
function afficherAjoutPersoForm(event) {
    event.preventDefault();
    inputNom.value = "";
        inputPrenom.value = "";
        inputMail.value = "";
        inputId.value = "";
    msg.innerHTML = "";
    divErr.innerHTML ="";
    titre.innerHTML = "Ajouter un utilisateur"
    form.classList.add("display");
    form.classList.remove("hide");
    comfirmAddPerson.classList.add("display");
    comfirmAddPerson.classList.remove("hide");
    ajouter.classList.add('hide');
    ajouter.classList.remove('display');
    annulerBtn.classList.add("display");
    annulerBtn.classList.remove("hide");
    confirmModifPersonne.classList.add("hide");
    confirmModifPersonne.classList.remove("display");
    //getAllUserData();
}
/**
 * Ajout d'un utilisateur
 */
function ajoutePerso() {
  
    var nom = inputNom.value;
    var prenom = inputPrenom.value;
    var mail = inputMail.value;
    var id = inputId.value;
    var tabDonnesPerso = [id,nom,prenom,mail]
    //console.log(id + "," + nom + "," + prenom + "," + mail );
    try {
        //Creation perso
        var adherent = creerPerso(id, nom, prenom, mail);
        //console.log(adherent);
        //console.log(adherent.getNom());

        divErr.innerText = "";

        //Conversion format JSON
        var dataJson =
            '{"id": "' +
            id +
            '", "nom":"' +
            nom +
            '", "prenom":"' +
            prenom +
            '", "email":"' +
            mail +
            '"' +
            "}";
        //console.log(dataJson);
        post(
          "http://fbrc.esy.es/DWWM22053/Api/api.php/users",
          dataJson,
          tabDonnesPerso
        );
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

    var perso = new Personne(id, nom, prenom, mail);
    return perso;

}

///////////////////////////////////////////////////////////////////////////////
/**
 * 
 * @param {string} url 
 * @param {string} donnees 
 * @param {array} donnes perso
 */
function post(url, donnees, tabDonnesPerso) {
  
  var requestOptions = {
    method: "POST",
    body: donnees,
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then(function (data) {
      if (data === tabDonnesPerso[0]) {
        console.log("La requête POST a abouti avec la réponse JSON : ", data);
        msg.innerHTML = "Elément ajouté avec succès";
        //Reset tout les cases de l'input lors de l'ajout avec succes
        inputNom.value = "";
        inputPrenom.value = "";
        inputMail.value = "";
        inputId.value = "";
        getAllUserData();
      } else {
        console.error("Ajout impossible");
        throw new Error ("Ajout impossible, identifiant existant")
        
      }
    })
    .catch(function (err) {
      console.error("La requête POST a échoué : ", err);
      divErr.innerText = err.message;
    });
}
//--------------------
async function supprimerPerso(id) {
  let url = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/" +id;
  // var exists = await userExists(userId.value) 
  // if (exists == true) {
      if (!id || !typeof id === "number" || id <= 0) {
        console.error("Merci d'indiquer un chiffre");
        msg.innerHTML = "Merci d'indiquer un chiffre";
      } else {
        console.log(url);
        var urlencoded = new URLSearchParams();

        var requestOptions = {
          method: "DELETE",
          body: urlencoded,
          redirect: "follow",
        };

        fetch(url, requestOptions)
          .then((r) => r.text())
          .then(function (data) {
            if (data == 1) {
              console.log(
                "La requête DELETE a abouti avec la réponse JSON : ",
                data
              );
              msg.innerHTML = "Elément supprimé avec succès";
            getAllUserData();
            } else {
              console.error("Suppression impossible");
              throw new Error ("Suppression impossible")
              
            }
          })
          .catch(function (err) {
            console.error("La requête DELETE a échoué : ", err);
            divErr.innerText = err.message;
          });
      }
      
  // } else console.log("n'entre pas dans la condition")
}

/**
 * Modifier un user
 */
async function modifierPerso() {
    let dataUser = {
        id: inputId.value,
        nom: inputNom.value,
        prenom: inputPrenom.value,
        email: inputMail.value,
    };
    console.log(inputId.value);
    await fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users/" + dataUser.id, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(dataUser),
    })
        .then((r) => r.text())
        .then(function (data) {
            if (data == 1) {
                console.log("La requête PUT a abouti avec la réponse JSON : ", data);
                msg.innerHTML = "Modification effectuée";
                //Reset tout les cases de l'input lors de l'ajout avec succes
                inputNom.value = "";
                inputPrenom.value = "";
                inputMail.value = "";
                inputId.value = "";
                getAllUserData();
            } else {
                console.error("Modification impossible");
                throw new Error ("Modification impossible, identifiant n'existe pas")
            }
        })
        .catch(function (err) {
          console.error("La requête PUT a échoué : ", err);
          divErr.innerText = err.message;
        });
}

// Ajout d'un écouteur pour le bouton "Annuler" (cancelModifBtn)
document.getElementById("cancelModifBtn").addEventListener("click", annulerModification);

// Fonction pour annuler la modification
function annulerModification() {
    form.reset(); // Réinitialise le formulaire
    form.classList.add("hide");
    form.classList.remove("display");
    confirmModifPersonne.classList.add("hide");
    confirmModifPersonne.classList.remove("display");
    ajouter.classList.remove("hide");
    ajouter.classList.add("display");
}

function creerSuppBtn() {
    var button = document.createElement("button");
    button.textContent = "Supprimer";
    button.setAttribute("type", "button");
    button.setAttribute("class", "modifSuppBtn btn btn-danger btn-sm");
    button.setAttribute("onclick", "gererSupprimerBtn(this)");
    return button;
}
function creerModifierBtn() {
    var button = document.createElement("button");
    button.textContent = "Modifier";
    button.setAttribute("type", "button");
    button.setAttribute("class", "modifSuppBtn modifSuppBtn btn btn-warning btn-sm");
    button.setAttribute("onclick", "gererModifierButton(this)");
    return button;
}
/**
 * Pour les bouttons supprimer et modifier , cherche la Valeur de l'ID sur la ligne ou
 * se trouve les bouttons et renvoie un nombre
 * @param {*} button 
 * @returns {Number}
 */
function findIdOfRowBtn(button) {
    var ligne = button.parentNode;
    var idOfRowBtn = parseInt(ligne.firstChild.innerText);
    inputId.value = idOfRowBtn;
    inputNom.value = ligne.childNodes[1].innerText;
    inputPrenom.value = ligne.childNodes[2].innerText;
    inputMail.value = ligne.childNodes[3].innerText;
    return idOfRowBtn;
}

function gererSupprimerBtn(button) {
  msg.innerHTML = "";
  divErr.innerHTML = "";
  form.classList.add("hide");
  form.classList.remove("display");
  ajouter.classList.add("display");
    ajouter.classList.remove("hide");
  idOfRowBtn = findIdOfRowBtn(button);
  console.log(idOfRowBtn);
  
  if(confirm("Merci de confirmer la suppression")) supprimerPerso(idOfRowBtn);
}
function gererModifierButton(button) {
    msg.innerHTML = "";
    divErr.innerHTML = "";
    titre.innerHTML = "Modification utilisateur"
    form.classList.add("display");
    form.classList.remove("hide");
    comfirmationAjoutPersonne.classList.add("hide");
    comfirmationAjoutPersonne.classList.remove("display");
    confirmModifPersonne.classList.add("display");
    confirmModifPersonne.classList.remove("hide");
    ajouter.classList.add("display");
    ajouter.classList.remove("hide");
    annulerBtn.classList.add("display");
    annulerBtn.classList.remove("hide");
    idOfRowBtn = findIdOfRowBtn(button);
    console.log(idOfRowBtn);
    if (typeof idOfRowBtn != "number" || idOfRowBtn < 0) throw new Error("Valeur id de la ligne ou se trouve le boutton incorrecte");
    
}



