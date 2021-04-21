class functions {
    getCurrentDate() {
        var d = new Date();
        var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var fullDate = date + " " + hours;
        return fullDate
    }
    // Pour ajouter une fonction :
    // nomDeLaFonction(arg) {}
    // Pour l'utiliser :
    // functions.nomDeLaFonction(arg)
}

module.exports = new functions()