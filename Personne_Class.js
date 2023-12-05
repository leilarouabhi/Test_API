class Personne {
  
    #id=0;
    #nom="";
    #prenom="";
    #mail="";
    

    constructor(id,nom,prenom,mail){
       this.#setId(id); 
       this.#setNom(nom);
       this.#setPrenom(prenom);
       this.#setMail(mail);
    }

//////////////////////////////////// SETTER ///////////////////////////////////

    #setId(id){
        if (/^[0-9]{1,}$/.test(id)===false) throw new Error ("ERR : Le Id doit comporter au moin 1 caractére et seulement des chiffres.")
        else this.#id = id;
    }
    #setNom(nom){
        if(/^[a-zA-Z]{3,}$/.test(nom.trim())===false) throw new Error ("ERR : Le nom doit comporter au moin 3 caractéres et seulement des lettres.")
        else this.#nom = nom;
    }
    #setPrenom(prenom){
        if(/^[a-zA-Z]{3,}$/.test(prenom.trim())===false) throw new Error ("ERR : Le prenom doit comporter au moin 3 caractéres et seulement des lettres.")
        else this.#prenom = prenom;
    }
    #setMail(mail){
        if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(mail.trim())===false) throw new Error ("ERR : Le format E-mail n'est pas correcte.")
        else this.#mail = mail;
    }
    

////////////////////////////// GETTER ////////////////////////////////////
    getId(){
        return this.#id;
    }
    getNom(){
        return this.#nom;
    }
    getPrenom(){
        return this.#prenom;
    }
    getMail(){
        return this.#mail;
    }
    
    
}