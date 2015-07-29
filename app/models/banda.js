var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BandaSchema = new Schema({
    nome: String,
    descricao: String,
    urlInformacoes: String,
    idYoutube: String,
    fotos: [{ caminho: String }]
});

module.exports = mongoose.model('Banda', BandaSchema);

