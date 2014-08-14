
app.controller('AppCtrl', function($scope, $http, articleListFactory) {
    $scope.articleList = [];
    $scope.loading = true;
    $scope.errorXML = false;
    $scope.predicate = 'maximoNr'; // sorting
    init();

    function init() {
        articleListFactory.getArticleList().success(function(data) {
            $scope.articleList = createObjFromXML(data);
            $scope.loading = false;
        }).error(function() {
            $scope.errorXML = true;
        });
        
        $('#filter-input').focus();
    }

    $scope.showPicture = function($event) {
        $event.preventDefault();
        $.fancybox({
            href: $event.target.src
        });
    };

    $scope.showBarcode = function(barcode, article) {
        $.fancybox({
            title: article,
            content: '<p class="barcode-zoom">*' + barcode + '*</p>'
        });
    };

    function createObjFromXML(data) {
        var list = [];
        var obj = {};

        $(data).find('Row').each(function(key, value) {
            // ignore first rows in xml (thead and 2 blank rows)
            if (key < 3) {
                return;
            }
            obj = {};
            var maximoNr, varugrupp, beskrivning, streckkod, bild, levArtNr;

            // get each value from xml
            $(value).find('Cell').each(function(k) {
                var text = $.trim($(this).find('Data').text());
                if (k === 3) {
                    maximoNr = text;
                    streckkod = maximoNr;
                    bild = maximoNr;
                } else if (k === 4) {
                    beskrivning = text;
                } else if (k === 5) {
                    levArtNr = text;
                } else if (k === 10) {
                    varugrupp = text;
                }
            });

            // create object
            obj = {
                maximoNr: maximoNr,
                levArtNr: levArtNr,
                varugrupp: varugrupp,
                beskrivning: beskrivning,
                streckkod: streckkod,
                bild: bild
            };
            // push object to array
            list.push(obj);
         });

        return list;
    }
});
