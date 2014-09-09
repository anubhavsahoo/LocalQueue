/*
 * LocalQueue
 * A queue implemented on top of local storage
 *
 * Copyright 2014, loneranger
 * Licensed under the MIT license
 * Supports the following methods:
 * #push
 * #pop
 * #getAll()
 * #removeAll()
 */
LocalQueue = function(key) {
    if (!key) return null;
    //Init
    var exports = {};
    var DELIMITER = String.fromCharCode(31);
    //methods
    function getFromLocalStorage(key) {
        var storageItem = window.localStorage.getItem(key);
        if (!storageItem || storageItem == null) {
            window.localStorage.setItem(key, "");
            return "";
        }
        return storageItem;
    }

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
    /*
    Push an item into the queue
    */
    exports.push = function(item) {
        try {
            var queueString = getFromLocalStorage(key);
            if (queueString == "") queueString += JSON.stringify(item);
            else queueString += DELIMITER + JSON.stringify(item);
            window.localStorage.setItem(key, queueString);
        } catch (err) {
            return false;
        }
        return true;
    }
    /*
    Pop an item from the queue
    */
    exports.pop = function() {
        try {
            var queueString = getFromLocalStorage(key);
            var firstDelimiterIndex = queueString.indexOf(DELIMITER);
            if (firstDelimiterIndex > -1) {
                var firstItemString = queueString.substr(0, firstDelimiterIndex);
                queueString = queueString.substr(firstDelimiterIndex + 1);
                window.localStorage.setItem(key, queueString);
                return JSON.parse(firstItemString);
            } else if (queueString.length > 0) {
                window.localStorage.setItem(key, "");
                return JSON.parse(queueString);
            } else return null;
        } catch (err) {
            return null;
        }
        return null;
    }
    /*
       same as Pop, only non-destructive (read-only)
    */
    exports.getFront = function() {
        try {
            var queueString = getFromLocalStorage(key);
            var firstDelimiterIndex = queueString.indexOf(DELIMITER);
            if (firstDelimiterIndex > -1) {
                var firstItemString = queueString.substr(0, firstDelimiterIndex);
                return JSON.parse(firstItemString);
            } else if (queueString.length > 0) {
                return JSON.parse(queueString);
            } else return null;
        } catch (err) {
            return null;
        }
        return null;
    }

    /*
    Get all items
    */
    exports.getAll = function() {
        return stringToArray(getFromLocalStorage(key));
    }
    /*
    Remove all Items
    */
    exports.removeAll = function() {
        var queueString = getFromLocalStorage(key);
        window.localStorage.setItem(key, "");
        return stringToArray(queueString);
    }
    return exports;
}
