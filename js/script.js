let userId = document.getElementById("idUser");

var btnSubmit = document.getElementById("submitBtn");
var btnAdd = document.getElementById("addBtn");


btnSubmit.addEventListener("click", deleteUser);
btnAdd.addEventListener("click", addUser);
/*
function deleteUser() {
let currentSelectedUserId = userId.value,
    isUserCorrect = verifyInputId(currentSelectedUserId);
    if (isUserCorrect) {
        fetch(url, { method: "DELETE" })
          .then((res) => res.json())
          .then((res) => alert(JSON.stringify(res)))
          .catch((error) => alert("Erreur : " + error));
    } 
   
}*/



// Utilisation de la fonction idExist avec .then() pour obtenir le résultat
idExist(6)
  .then((idExists) => {
    console.log(idExists); // Utilisez la valeur retournée (true ou false)
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  
function idExist(id) {
  return new Promise((resolve, reject) => {
    let url = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/";
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        let nbrOfUsers = data.users.records.length;
        for (let i = 0; i < nbrOfUsers; i++) {
          if (id === data.users.records[i][0]) {
            resolve(true);
            return;
          }
        }
        resolve(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(false); // Rejette la promesse en cas d'erreur
      });
  });
}
/**
 *Verifie si l'id dans l'input(submitBtn) est un nombre correct 
 Si il l'est cela retourne "true" si incorrect return Une error
 * @param {Booleen} inputedId
 * @returns {Booleen} 
 */
function verifyInputId(inputedId) {
    if (!inputedId || !typeof inputedId === "number" || inputedId < 0  ) {
        throw new Error("Merci d'indiquer un chiffre");
    } else return true;
}
/*
(async () => {
  const idExists = await idExist(6);
  console.log(idExists); // Utilisez la valeur retournée (true ou false)
})();

async function idExist(id) {
    let url = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/";
    console.log(url);
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    try {
        const response = await fetch(url, requestOptions)
            .then((r) => r.json())
            .then(function (data) {
                console.log(data);
                let nbrOfUsers = data.users.records.length;
                console.log(nbrOfUsers);
                for (let i = 0; i < nbrOfUsers; i++) {
                    if (id === data.users.records[i][0]) {
                        console.log(data.users.records[i][0]);
                        return true;
                    }
                }
                throw new Error("errreuuuuuuur");
            });  
    } catch (error) { console.error("Error:", error); }
}
/*
if (reponse) return true
else return false    */


/* .then((donnee) => {for (let records of donnee) {
          console.log(records);
      }*/
// })




/**
 * Supprime l'user avec la valeur dans l'input(idUser) qui est verifié
 */
function deleteUser() {
    let url = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/" + userId.value;
    if (verifyInputId(userId.value)) {
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
                // console.log("La requête DELETE a abouti avec la réponse JSON : ", data);
                if (data === 1) success(data);
                else throw new Error('User non trouvé')
            })
            .catch(function (err) {
                console.log("La requête DELETE a échoué : ", err);
                //     fonctError(error);
            });
    }
}
/**
 * affiche une alerte 
 */
function success(info) {
    console.log(info);
    alert("Vous avez supprimé l'ID user " + userId.value);
}
function fonctError(err) {

}
////////////////////////////////////
//    Ajout d'un user
////////////////////////////////////

function addUser() {
    let url = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/";
    let data = {
        id: 1,
        nom: "Michel",
        prenom: "Sardou",
        email: "totosardou@test.tt"
    };
    alert(JSON.stringify(data));
    post(url, JSON.stringify(data), retourAjout, erreur);
}


function post(urlA, donnees, fonctSuccess, fonctError) {
    var requestOptions = {
        method: "POST",
        body: donnees,
        redirect: "follow",
    };

    fetch(urlA, requestOptions)
        .then((response) => response.text())
        .then(function (data) {
            console.log("La requête POST a abouti avec la réponse JSON : ", data);
            fonctSuccess(data);
        })
        .catch(function (error) {
            console.log("La requête POST a échoué : ", error);
            fonctError(error);
        });
}
function retourAjout(reponse) {
    alert("Ajout OK : " + reponse);
    // Liste des voitures
    get(url, retourAjax, erreur);
}

function erreur(reponse) {
    alert("Erreur");
}