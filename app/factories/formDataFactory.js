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

        /*  function Tab() {
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
         var tab = new Tab();*/

        function SettingsFormData() {
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
        var settingsFormData = SettingsFormData();

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
                        list.splice(idx, 1);
                        // console.log(idx+ ' : fact id remowed');
                    }
                },
                edit: function (idx, obj) {
                    console.log('fact start edit ' + list[idx]);
                    if (list[idx]) {
                        //var i = list.indexOf(idx);
                        list[idx] = obj;
                        console.log(idx + ' : fact id edit');
                    }
                }

            }
        };
        var actionListData = ActionListData();

        function ReportData() {
            var form = [];
            return {
                set: function (item) {
                    if (item) {
                        form.push(item);
                        // form.countItems = list.length;
                        console.log('set: ' + form.length);
                    }
                    ;
                    // console.log('set: '+ data);
                },
                change: function (key, val) {
                    if (val) {
                        form[key] = val;
                        // form.countItems = list.length;
                        console.log('change: ' + form.length);
                    }
                    ;
                    // console.log('set: '+ data);
                },
                get: function () {
                    return form;
                }
                // console.log('ResponseData get: '+ data.countItems);
            }
        };
        var reportData = ReportData();

        function FieldsData() {
            var arr = [];
            /* {"name": "A", "values": "a1"},
             {"name": "B", "values": "b1"}];
             */
            return {
                create: function (name, values) {
                    if (name) {
                        var obj = {};
                        obj.name = name;
                        obj.values = values;
                        obj.info =false;
                        arr.push(obj);
                        // form.countItems = list.length;
                      //  console.log('create: ' + arr);
                    }
                }
                ,
                getData: function (findKey) {
                   // console.log('getData ' + findKey)
                    if (findKey) {
                        angular.forEach(arr, function (key, val) {
                            if (key.name == findKey) {
                                console.log(key.name + ' ' + key.values + ' ' + key.info)
                            }
                        });
                    }
                }
                ,
                setData: function (findKey, newValue, info) {

                    if (findKey) {
                        angular.forEach(arr, function (key, val) {
                            if (key.name == findKey) {
                                key.values = newValue;
                                key.info = info;
                            }
                        });
                    }

                }
            }
        };
        var fieldsData = FieldsData();


        var Service = {
            //  navTabs: tab,
            loadList: function (url) {
                return $http.get(url);
            },
            settingsFormDataS: settingsFormData,
            actionListDataS: actionListData,
            reportDataS: reportData,
            fieldsDataS: fieldsData
        };

        return Service;
    }
)
;
