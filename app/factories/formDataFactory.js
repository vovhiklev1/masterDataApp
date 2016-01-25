/**
 * @ngdoc service
 * @name app:FormDataFactory
 *
 * @description
 *
 *
 * */
angular.module('myApp')
    .factory('formDataFactory', function ($http,$filter) {

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

        function SendData() {
            var data = {};
            return {
                set: function (obj) {
                    if (obj) {
                        data = obj;
                      //  data.countItems = list.length;
                        console.log('set: ' + data.countItems);
                    }
                    ;
                    // console.log('set: '+ data);
                },
                get: function () {
                    return data;
                },
                correctiveActionList : function (submit) {
                    var correctiveActions = actionListData.get();
                    var actionCount = Object.keys(correctiveActions).length;

                    var arr = [];
                    var create = function (name, values) {
                        if (name) {
                            var obj = {};
                            obj.name = name;
                            obj.values = values;
                            obj.info = false;
                            arr.push(obj);
                            // form.countItems = list.length;
                            //  console.log('create: ' + arr);
                        }
                        ;
                    };
                    angular.forEach(correctiveActions, function (val, key) {
                        // console.log('correctiveActions val------');
                        // console.log(key);
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
                prepareSendObj : function(){
                    var generalFields = fieldsData.getList();
                    var actionList = sendData.correctiveActionList(true);
                    //console.log(generalFields)
                    console.log('5555555555555');
                    angular.forEach(actionList, function (val, key) {
                        // console.log(val)
                        generalFields.push(val);
                    });
                    console.log(generalFields);

                    var jsonObj = {};
                    jsonObj.workflowCreationInformation = {
                        "workflowTypeName": "Incident Report",
                        "name": "Report - 2013.05.09"
                    };
                    jsonObj.workflowStepUpdateInformation = {
                        "stepIdOrName": "Initial Step",
                        "fields": generalFields
                    };

                    var postData = JSON.stringify(jsonObj)
                    return postData
                }
            }
        };
        var sendData = SendData();

        function ActionListData() {
            var list = [{
                company: "CompanyB",
                date: 'Thu Jan 28 2016 21:57:51 GMT+0200 (Финляндия (зима))',
                description: "34",
                name: "3"
            },
                {
                    company: "CompanyA",
                    date: 'Thu Jan 28 2016 21:57:51 GMT+0200 (Финляндия (зима))',
                    description: "1212",
                    name: "6666"
                }
            ];
            // var list = [];
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
                        obj.info = false;
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
                getList: function () {
                    return arr;
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
            sendData: function (postData) {
                var config = {
                    url: "/Home/PanelGoster",
                    dataType: "json",
                    contentType: 'application/json'
                };
                $http.post('', config).then(
                    function (response) {console.log("sendData success  ");
                        // success callback
                        window.open("data:text/json," + encodeURIComponent(postData),
                            "_blank"); // in new tab
                    },
                    function (response) {console.log("sendData err  ");
                        // failure callback
                    }
                );
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
