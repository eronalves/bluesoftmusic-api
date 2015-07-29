var mongoose = require('mongoose');
mongoose.connect('mongodb://ealves:bluesoft@ds027483.mongolab.com:27483/bluesoft');

var Banda = require('./app/models/banda');

var express    = require('express');
var app        = express();         
var bodyParser = require('body-parser');
var cors = require('cors');
var async = require('async');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;        

var router = express.Router();            

router.use(function(req, res, next){
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Bem-vindo a api da Bluesoft Music!' });   
});

router.route('/bandas')
    .post(function(req, res){
        var bandaObj = new Banda();
        bandaObj.nome = req.body.nome;
        bandaObj.descricao = req.body.descricao;
        bandaObj.urlInformacoes = req.body.urlInformacoes;
        bandaObj.idYoutube = req.body.idYoutube;
        bandaObj.fotos = req.body.fotos;
    
        bandaObj.save(function(err){
            if(err)
                res.send(err);
            
            res.json({message: 'Banda inserida!'});
        });
    })

    .get(function(req, res){
        Banda.find(function(err, bandas){
            if(err)
                res.send(err);
            
            res.json(bandas);
        });

    })

    .delete(function(req, res){
        Banda.remove({
            _id: req.params.banda_id 
        }, function(err, banda){
            if(err)
                res.send(err);
            
            res.json({message: 'Banda deletada!'});
        });
    
    });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);