/*
A queue implemented on top of local storage
Supports the following methods
#push
#pop
#getAll()
#removeAll()
*/
_.LocalQueue = function(key) {
    if (!key) return null;
    //Init
    var exports = {};
    var DELIMITER = String.fromCharCode(31);
    // var cachedQueueString = getFromLocalStorage(key);
    var queueArr = [];
    init();
    //methods
    function init() {
        queueArr = stringToArray(getFromLocalStorage(key));
    }

    function arrayToString(arr) {}

    function stringToArray(s) {
        var parseArr = [];
        if (s && s != null) {
            var items = s.split(DELIMITER);
            items.forEach(function(item) {
                try {
                    var parsedItem = JSON.parse(item);
                    parseArr.push(parsedItem);
                } catch (err) {
                    console.error(err);
                }
            });
        }
        return parseArr;
    }

    function getFromLocalStorage(key) {
        var storageItem = window.localStorage.getItem(key);
        if (storageItem == null) {
            window.localStorage.setItem(key, "");
            return "";
        }
        return storageItem;
    }
    exports.push = function(item) {
        queueArr.push(item);
        try {
            var queueString = getFromLocalStorage(key);
            if (queueString == "") queueString += JSON.stringify(item);
            else queueString += DELIMITER + JSON.stringify(item);
            window.localStorage.setItem(key, queueString);
        } catch (err) {
            queueArr.pop();
            return false;
        }
        return true;
    }
    exports.pop = function() {
        try {
            var queueString = getFromLocalStorage(key);
            var firstDelimiterIndex = queueString.indexOf(DELIMITER);
            if (firstDelimiterIndex > -1) {
                // var firstItemString =  queueString.substr(0,firstDelimiterIndex); 
                queueString = queueString.substr(firstDelimiterIndex + 1)
                window.localStorage.setItem(key, queueString);
                // JSON.parse(firstItemString);
                return queueArr.pop();
            } else return null;
        } catch (err) {
            return null;
        }
        return null;
    }
    exports.getAll = function() {
        return queueArr.slice();
    }
    exports.removeAll = function() {
        var all = queueArr.slice();
        queueArr = [];
        window.localStorage.setItem(key, "");
        return all;
    }
    return exports;
}
