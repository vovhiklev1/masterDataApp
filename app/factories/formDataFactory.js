/**
 * @ngdoc service
 * @name app:FormDataFactory
 *
 * @description
 *
 *
 * */
angular.module('myApp')
    .factory('formDataFactory', function ($http) {

        function Tab() {
            var activeTab = activeTab || false;
            var getClass = function (val) {
                if (val == activeTab) {
                    console.log(' formDataFactory activeTab true: ' + activeTab);
                    return true
                } else return false;
            };
            this.setActiveTab = function (id) {
                activeTab = id;
            };
            this.getActiveTab = function (val) {
                return getClass(val);
            };
        };
        var tab = new Tab();

        function ResponseData() {
            var data = {};

            // data.countItems = null;
            return {
                set: function (list) {
                    if (list) {
                        data = list;
                        data.countItems = list.length;
                        console.log('set: ' + data.countItems);
                    }
                    ;
                    // console.log('set: '+ data);
                },
                get: function () {
                    return data;
                }
                // console.log('ResponseData get: '+ data.countItems);
            }
        };
        var responseData = ResponseData();


        function ActionListData() {
            var list = [];
            return {
                set: function (obj) {
                    if (list) {
                        list.push(obj);
                        //list.countItems = list.length;
                        console.log('set actlist : ' + list);
                    }
                    ;
                },
                get: function () {
                    return list;
                },
                remove: function (idx) { //console.log('fact start remove ' + list[idx]);
                    if (list[idx]) {
                        //var i = list.indexOf(idx);
                        list.splice(idx,1);
                       // console.log(idx+ ' : fact id remowed');
                    }
                },
                edit: function (idx,obj) { console.log('fact start edit ' + list[idx]);
                    if (list[idx]) {
                        //var i = list.indexOf(idx);
                        list[idx]=obj;
                        console.log(idx+ ' : fact id edit');
                    }
                }

            }
        };
        var actionListData = ActionListData();


        var Service = {
            navTabs: tab,
            loadList: function (url) {
                return $http.get(url);
            },
            responseDataS: responseData,
            actionListDataS: actionListData
        };

        return Service;
    });
