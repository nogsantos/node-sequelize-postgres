 /*JQUERY-Form*/
!function ($) {
    "user strict";
    var modal = $('#ajax-modal');
    /*
     * Menu
     */
    var menuLinkPrincipal = {
        bgcolor: "#3F51B5",
        icon: "+",
        id: "gButton"
    };
    var menuLinkFormulario = {
        id: "btTodoForm",
        bgcolor: "#00ACEE",
        color: "#fffff",
        icon: "<i class='fa fa-pencil'></i>",
        title: "Cadastrar nova tarefa"
    };
    var menuLinkPaginaInicial = {
        url: "/home",
        bgcolor: "#263238",
        color: "white",
        icon: "<i class='fa fa-home'></i>",
        title: "Voltar para página inicial"
    };
    var links = [menuLinkPrincipal, menuLinkFormulario, menuLinkPaginaInicial];
    $('#todo_menu').kc_fab(links);
    /*
     * Chamada do formulario
     */
    $('#btTodoForm').on('mousedown', function (event) {
        $('body').modalmanager('loading');
        modal.load('todo/form', '',
                function () {
                    modal.modal();
                }
        );
    });
    /*
     */
    modal.on('mousedown','.bt-close', function () {
        location.reload();
    });
    /*
     */
    var save = true;
    modal.on('mousedown', '#btSalvar', function () {
        if(save){
            var title = $('#todo_title');
            var id = $('#userId');
            if(title.val()){
                $.post('todo/p',
                {
                    title : title.val(),
                    user_id : id.val()
                },function (data) {
                    var html = '<div class="panel panel-success">'+
                               '<div class="panel-heading">'+
                               '<h3 class="panel-title">'+data.message+'</h3></div>'+
                               '<div class="panel-body">'+
                               '<p>Identificador: '+data.id+'</p><p>Titulo: '+data.title+'</p>'+
                               '</div></div>';
                    $('.retorno').html(html);
                }).fail(function(data) {
                    $('.retorno').html('<div class="alert alert-danger">Erro: ['+data.status+'] '+data.statusText+': '+data.responseJSON+'</div>');
                }).always(function() {
                    $('.retorno').removeClass("hidden").fadeIn("slow");
                    save = false;
                });
            }
        }else{
            $('.retorno').html('<div class="alert alert-warning">Edite o campo antes de salvar.</div>');
        }
    });
    /*
     */
    modal.on('keydown', '#todo_title', function(){
        $('.retorno').addClass("hidden").fadeOut("slow");
        save = true;
    });
}(jQuery);
