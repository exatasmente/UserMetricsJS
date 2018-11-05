"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Metrics = function Metrics(page, date, user) {
    _classCallCheck(this, Metrics);

    this.page = page;
    this.timeSpent = 0;
    this.date = date;
    this.user = user;
    this.metaData = null;
};

var UserMetrics = function () {
    /**
     * 
     * @param {string} serverUrl url to server side api database ex : http://
     */
    function UserMetrics(serverUrl) {
        _classCallCheck(this, UserMetrics);

        this.startTime = null;
        this.endTime = null;
        this.metrics = null;
        if (serverUrl) {
            this.serverUrl = serverUrl;
        } else {
            console.error("Invalid serverUrl param");
        }
    }
    /**
     * 
     * @param {string} page actual page name ex : Page1 
     * @param {Object} user user object ex : {userName: "user", id : 1 ,...}
     */


    _createClass(UserMetrics, [{
        key: "startMetrics",
        value: function startMetrics(page, user) {
            this.startTime = new Date();
            this.metrics = new Metrics(page, new Date(), user);
        }

        /**
         * 
         * @param {Object} metaData meta data to be send ex:  {question : 1, dificulty : 2, isCorrect : false}
         */

    }, {
        key: "stopMetrics",
        value: function stopMetrics(metaData) {
            this.endTime = new Date();
            this.metrics.timeSpent = this.endTime - this.startTime;
            this.metrics.metaData = metaData;
        }
        /**
         *  
         * @returns {Promise}
         */

    }, {
        key: "postMetrics",
        value: function postMetrics() {
            var _this = this;

            var promise = new Promise(function (resolve, reject) {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST", _this.serverUrl, false);
                xmlHttp.send(_this.metrics);
                var data = JSON.parse(xmlHttp.responseText);

                if (data.status == 200) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });

            return promise;
        }
    }]);

    return UserMetrics;
}();

UserMetrics.prototype = new UserMetrics();