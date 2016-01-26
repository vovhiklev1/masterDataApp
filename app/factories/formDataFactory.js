/**
 * @ngdoc service
 * @name app:FormDataFactory
 *
 * @description
 *
 *
 * */
angular.module('myApp')
    .factory('formDataFactory', function ($http, $filter) {

        function SettingsFormData() {
            var data = {};
            return {
                set: function (list) {


                    if (list) {
                        data = list;
                       // data.countItems = list.length;
                    }
                    ;
                },
                get: function () {
                    return data;
                }
            }
        };
        var settingsFormData = SettingsFormData();

        function SendData() {
            var data = {};
            return {
                set: function (obj) {
                    if (obj) {
                        data = obj;
                        //console.log('set: ' + data.countItems);
                    }
                    ;
                },
                get: function () {
                    return data;
                },
                correctiveActionList: function (submit) {
                    var correctiveActions = actionListData.get();
                    var actionCount = Object.keys(correctiveActions).length;
                    var arr = [];
                    var create = function (name, values) {
                        if (name) {
                            var obj = {};
                            var tempArr = [];
                            obj.name = name;
                            if (submit) {
                                tempArr.push(values)
                                obj.values = tempArr;
                            } else {
                                obj.values = values;
                            }
                            if (!submit) {
                                obj.info = false;
                            }
                            arr.push(obj);
                        }
                        ;
                    };
                    angular.forEach(correctiveActions, function (val, key) {
                        var idxStr = '';
                        if (actionCount > 0) {
                            key += 1;
                            idxStr = ' (' + key + ')';
                        }
                        var date = submit ? $filter('dateISOFilter')(val.date) : $filter('dateFilter')(val.date);
                        create("Description of Corrective Action" + idxStr, val.description, true);
                        create("Action Taken By (name)" + idxStr, val.name, true);
                        create("Company" + idxStr, val.company, true);
                        create("Date" + idxStr, date, true);
                    });
                    return arr
                },
                prepareSendObj: function () {
                    var generalFields = fieldsData.getListForSend();
                    var actionList = sendData.correctiveActionList(true);
                    angular.forEach(actionList, function (val, key) {
                        generalFields.push(val);
                    });
                    var jsonObj = {};
                    jsonObj.workflowCreationInformation = {
                        "workflowTypeName": "Incident Report",
                        "name": "Report - " + $filter('date')(new Date(), 'yyyy.MM.dd')  //2013.05.09
                    };
                    jsonObj.workflowStepUpdateInformation = {
                        "stepIdOrName": "Initial Step",
                        "fields": generalFields
                    };
                    var postData = angular.toJson(jsonObj);
                    return postData
                }
            }
        };
        var sendData = SendData();

        function ActionListData() {

            var list = [];
            return {
                set: function (obj) {
                    if (list) {
                        list.push(obj);
                        //console.log('set actlist : ' + list);
                    }
                    ;
                },
                get: function () {
                    return list;
                },
                remove: function (idx) {
                    if (list[idx]) {
                        list.splice(idx, 1);
                    }
                },
                edit: function (idx, obj) {
                    if (list[idx]) {
                        list[idx] = obj;
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
                        // console.log('set: ' + form.length);
                    }
                    ;
                },
                change: function (key, val) {
                    if (val) {
                        form[key] = val;
                        // console.log('change: ' + form.length);
                    }
                    ;
                },
                get: function () {
                    return form;
                }
            }
        };
        var reportData = ReportData();

        function FieldsData() {
            var arr = [];
            return {
                create: function (name, values) {
                    if (name) {
                        var obj = {};
                        obj.name = name;
                        obj.values = values;
                        obj.info = false;
                        arr.push(obj);
                    }
                }
                ,
                getData: function (findKey) {
                    var result = '';
                    if (findKey) {
                        angular.forEach(arr, function (key, val) {
                            if (key.name == findKey) {
                                result = key.values;
                            }
                        });
                    }
                    return result
                }
                ,
                getList: function () {
                    return arr;
                },
                getListForSend: function () {
                    var result = [];
                    angular.forEach(arr, function (val, key) {
                        var obj = {};
                        var tempArr = [];
                        obj.name = val.name;
                        tempArr.push(val.values);
                        obj.values = tempArr;
                        result.push(obj);
                    });
                    return result;
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
            loadList: function (url) {
                return $http.get(url);
            },
            sendData: function (postData) {
                /*  var config = {
                 url: "/Home/PanelGoster",
                 dataType: "json",
                 contentType: 'application/json'
                 };*/
                window.open("data:text/json," + encodeURIComponent(postData),
                    "_blank");
                /*  $http.post('', config).then(
                 function (response) {
                 // success callback
                 },
                 function (response) {
                 // failure callback
                 }
                 );*/
            },
            settingsFormDataS: settingsFormData,
            actionListDataS: actionListData,
            reportDataS: reportData,
            fieldsDataS: fieldsData,
            sendDataS: sendData
        };

        return Service;
    }
)
;
