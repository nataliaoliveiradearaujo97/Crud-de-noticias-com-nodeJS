module.exports.formulario_inclusao_noticia = function(app, req, res){
    res.render("admin/form_add_noticia", {validacao: {}, noticia: {}});
}

module.exports.noticias_salvar = function(app, req, res){
    var noticia = req.body;

        //validações do form
        req.assert('titulo', 'Título é obrigatorio').notEmpty();
        req.assert('resumo', 'Resumo é obrigatorio').notEmpty();
        req.assert('resumo', 'Resumo deve contrer entre 10 e 10 caracteres').len(10, 100);
        req.assert('autor', 'Author é obrigatorio').notEmpty();
        req.assert('data_noticia', 'Data é obrigatorio').notEmpty().isDate({format: 'YYYY-MM-DD'});
        req.assert('noticia', 'Notícia é obrigatorio').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.render("admin/form_add_noticia", {validacao: erros, noticia: noticia});
            return;
        }

        var connection = app.config.dbConnection();
        var noticiasModel = new app.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, function(error, result){
            res.redirect("/noticias");
        });
}