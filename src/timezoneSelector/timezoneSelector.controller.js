(function() {
    'use strict';

    angular.module('pctDate.timezoneSelector.controller', [
        'pctDate.utils.tzId',
        'pctDate.utils.jsTzDetect',
        'pctDate.utils.tzId.parseTzId'
        ])
        .controller('_pctTimezoneSelectorDirectiveController', controller);


    controller.$inject = ['$scope', 'getTzList', 'filterTzByRegion', 'jsTzDetect', 'parseTzId'];

    /**
     * @ngdoc controller
     * @name _pctTimezoneSelectorDirectiveController
     * **note** about the name: The underscore and the
     * weird long and too detaily name are deliberated.
     * First of all this is a private controller and should
     * not be used alone.
     * It main purpose is to server pctTimezoneSelector directive.
     * And so that's why we don't want to pollute the global
     * Angular name space, and this our way to try not to.
     *
     *
     * @description
     * This controller concentrates little to none logic for
     * the pctTimezoneSelector directive
     *
     *
     *
     * **Note** about controllerAs and Scope.
     * We are using as much as we can the controllerAs syntax for
     * every View-Model attributes (check out the this.attrs in the controllers
     * body). But, since we need to support Angular 1.2.*, then we need
     * to bind ngModel the isolated Scope of the directive to achieve
     * two way data binding.
     *
     */
    function controller($scope, getTzList, filterTzByRegion, jstz, parseTzId) {


        //Use js timezone detect javascript library to auto detect the current
        //user's timezone.
        var autodetectedTz = parseTzId(jstz.determine().name());

        //Use that auto detected Time Zone as the default
        //(already selected) option in the time zone selection directive
        this.selectedRegion = autodetectedTz.region;
        $scope.ngModel = autodetectedTz.id;

        this.tzRegionList = getTzList().regionList;

        var tzList = getTzList().tzList;

        this.getTzListForRegion = filterTzByRegion(tzList);
    }

}) ();