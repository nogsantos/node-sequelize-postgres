/*Angular-grid*/
(function (angular) {
    "user strict";
    var $app = angular.module('todo', ['ngSanitize', 'ngMaterial', 'ngAnimate', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.exporter', 'ui.grid.cellNav', 'ui.grid.validate']);
    $app.controller('TodoGridController', ['$scope', 'i18nService', '$http', 'uiGridConstants', function ($scope, i18nService, $http, uiGridConstants) {
            $scope.alertaErro = true;
            $scope.alertaEdicao = true;
            $scope.alertaExclusao = true;
            i18nService.setCurrentLang('pt-br');
            /*
             * Configurações
             */
            $scope.gridOptions = {
                enableCellEditOnFocus: true,
                multiSelect: true,
                noUnselect: true,
                enableRowSelection: true,
                enableFiltering: true,
                showGridFooter: true,
                enableGridMenu: true,
                exporterCsvFilename: 'todo.csv',
                exporterPdfDefaultStyle: {fontSize: 9},
                exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
                exporterPdfTableHeaderStyle: {
                    fontSize: 10,
                    bold: true,
                    italics: true,
                    color: 'red'
                },
                exporterPdfHeader: {
                    text: "Tarefas",
                    style: 'headerStyle'
                },
                exporterPdfFooter: function (currentPage, pageCount) {
                    return {
                        text: currentPage.toString() + ' de ' + pageCount.toString(),
                        style: 'footerStyle'
                    };
                },
                exporterPdfCustomFormatter: function (docDefinition) {
                    docDefinition.styles.headerStyle = {fontSize: 22, bold: true};
                    docDefinition.styles.footerStyle = {fontSize: 10, bold: true};
                    return docDefinition;
                },
                exporterPdfOrientation: 'landscape',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 500,
                exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
                exporterFieldCallback: function( grid, row, col, input ) {
                    return input;
                },
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                }
            };
            /*
             * Definição das colunas
             */
            $scope.gridOptions.columnDefs = [
                {name: 'id', displayName: 'Código', type: 'number', enableCellEdit: false},
                {name: 'title', displayName: 'Descrição', enableCellEditOnFocus:false, validators: {minLength: 1, maxLength: 255, required: true}, cellTemplate: 'ui-grid/cellTitleValidator', cellTooltip:
                    function( row, col ) {
                        return row.entity.title;
                    }
                },
                {name: 'complete', enableCellEditOnFocus:false, displayName: 'Tarefa completa', cellFilter: 'mapComplete', type: 'boolean'},
                {name: 'createdAt', displayName: 'Data da criação', type: 'date', cellFilter: 'date:"dd/MM/yyyy hh:mm"', enableCellEdit: false},
                {name: 'updatedAt', displayName: 'Data da atualização', type: 'date', cellFilter: 'date:"dd/MM/yyyy hh:mm"', enableCellEdit: false}
            ];
            $scope.valoresEditados = "";
            $scope.gridOptions.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;
                /*
                 * Método chamado após a edição do texto.
                 */
                gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                    if (newValue !== oldValue) {
                        switch (colDef.name) {
                            case 'title':
                                if(newValue.length > 0 && newValue.length <= 255){
                                    $scope.alertaEdicao = false;
                                    $scope.alertaExclusao = true;
                                    $scope.alertaErro = true;
                                    $scope.valoresExcluidos = "";
                                    $http.put('todo/' + rowEntity.id, {title: newValue})
                                        .success(function () {
                                            $scope.valoresEditados = '<table class="table"><thead><tr><th>Código</th><th>Coluna</th><th>Valor antigo</th><th>Valor novo</th></tr></thead><tbody><tr><td>' + rowEntity.id + '</td><td>' + colDef.displayName + '</td><td>' + oldValue + '</td><td>' + newValue + '</td></tr></tbody></table>';
                                        }).error(function () {
                                            $scope.valoresEditados = 'Erro na aplicação';
                                        });
                                }else{
                                    $scope.alertaErro = false;
                                    $scope.alertaEdicao = true;
                                    $scope.alertaExclusao = true;
                                    $scope.erros = '<div class="panel-body">Erro ao editar o campo <b>'+colDef.displayName+'</b> ['+newValue.length+' caracteres] mínimo de 1 máximo de 255.</div>';
                                }
                                break;
                            case 'complete':
                                $http.put('todo/' + rowEntity.id, {complete: newValue});
                                break;
                        }
                        $scope.$apply();
                        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                    }
                });
            };
            /*
             * Registros
             */
            $http.get('todo/all').success(function (data) {
                    $scope.gridOptions.data = data;
                }
            );
            /*
             * Excluir registros.
             */
            var $aExclude = [];
            $scope.valoresExcluidos = "";
            $scope.alertConfirm = true;
            $scope.excluir = function () {
                var rowCol = $scope.gridApi.selection.getSelectedRows();
                if (rowCol.length > 0) {
                    $scope.valoresEditados = "";
                    $scope.alertaEdicao = true;
                    $scope.alertaErro = true;
                    $scope.alertaExclusao = false;
                    $scope.valoresExcluidos = "";
                    $scope.valoresExcluidos = '<table class="table table-hover"><thead><tr><th>Código</th><th>Descrição</th></tr></thead><tbody>';
                    angular.forEach(rowCol, function(value, key){
                        $scope.valoresExcluidos += '<tr><td>'+value.id+'</td><td>'+value.title+'</td></tr>';
                        $aExclude.push([value.id]);
                    });
                    $scope.valoresExcluidos += '</tbody></table>';
                }
            };
            /*
             * Confirma a exclusão dos registros.
             */
            $scope.confirmarExclusao = function () {
                if($aExclude.length > 0){
                    angular.forEach($aExclude, function(value, key){
                        $http.delete('todo/'+value);
                    });
                    location.reload();
                }
            };
            /*
             * Cancela a exclusão dos registros.
             */
            $scope.cancelarExclusao = function () {
                location.reload();
            };
            /*
             */
            $scope.closePanell = function(){
                $scope.alertaErro = true;
                $scope.alertaEdicao = true;
                $scope.alertaExclusao = true;
            };
        }])
            .filter('mapComplete', function () {
                return function (input) {
                    var msg = "";
                    switch (input) {
                        case true:
                            msg = "Sim";
                            break;
                        case false:
                            msg = "Não";
                            break;
                        default:
                            msg = "unknown";
                            break;
                    }
                    return msg;
                };
            });
})(window.angular);
