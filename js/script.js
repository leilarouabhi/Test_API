let userId = document.getElementById("idUser");
let msg = document.getElementById("msg");
var btnDelete = document.getElementById("deleteBtn");
var btnAdd = document.getElementById("addBtn");
let btnPut = document.getElementById("changeDataBtn")


btnDelete.addEventListener("click", deleteUser);
btnAdd.addEventListener("click", addUser);
btnPut.addEventListener("click", putUser);


// Utilisation de la fonction idExist avec .then() pour obtenir le résultat
/*
idExist(6)
  .then((idExists) => {
    console.log(idExists); // Utilisez la valeur retournée (true ou false)
  })
  .catch((error) => {
    console.error("Error:", error);
  });*/
  
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


//--------------------
async function deleteUser() {
  let url = "http://fbrc.esy.es/DWWM22053/Api/api.php/users/" + userId.value;
  // var exists = await userExists(userId.value) 
  // if (exists == true) {
      if (!userId.value || !typeof userId.value === "number" || userId.value <= 0  ) {
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
                      console.log("La requête DELETE a abouti avec la réponse JSON : ", data);
                  } 
                  else console.error('Suppression impossible');  
              })
              .catch(function (err) {
                  console.error("La requête DELETE a échoué : ", err);
              });
      }
      
  // } else console.log("n'entre pas dans la condition")
}

async function userExists(id){
  var exist = true;
  console.log(id)
  await fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users/" +id, {
      method: "GET"
  })
  .then((response) => {
      if(!response.ok) {
console.log("Le user n'existe pas au niveau de la base"); // test si le user n existe pas
          exist = false;
      }
      else {
console.log("existe"); 
      } 
  })
  .catch (function (err){
      console.error("Erreur : "+err);
  });
console.log(exist);
  return exist;   
}

// ----------- Modier un USER 
async function putUser (){
  let dataUser = {
    id: 1000,
    nom: "loulou",
    prenom: "toutou",
    email: "tloulou@jmenfou.fr",
  };
  console.log(userId.value)
  await fetch("http://fbrc.esy.es/DWWM22053/Api/api.php/users/"+dataUser.id, {
      method: "PUT",
      headers: {
          "Content-type":"application/json"
      },
      body: JSON.stringify(dataUser)
  })
      .then((r) => r.text())
      .then(function (data) {
              
              if (data == 1) {
                  console.log("La requête PUT a abouti avec la réponse JSON : ", data);
              }
              else console.error('Modification impossible') // 
          })
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

