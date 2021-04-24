const globals = require("./globals");
const jwt = require("jsonwebtoken");
const { ObjectID } = require("bson");

class tools {
  getCurrentDate() {
    var d = new Date();
    var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date + " " + hours;
    return fullDate;
  }

  async decryptJwt(token) {
    return await jwt.verify(token, globals.JWT_KEY, (err, decoded) => {
      return decoded;
      // return undefine si le token est faux
    });
  }

  getObjectIdFromTxt(txt) {
    try {
      return ObjectID(txt);
    } catch (error) {
      return null;
    }
  }
  // Pour ajouter une fonction :
  // nomDeLaFonction(arg) {}
  // Pour l'utiliser :
  // functions.nomDeLaFonction(arg)
}

module.exports = new tools();
