/*
 * LocalQueue
 * A queue implemented on top of local storage
 *
 * Copyright 2014, loneranger
 * Licensed under the MIT license
 * Supports the following methods:
 * #push()
 * #pop()
 * #getFront()
 * #getBack()
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
        var storageItem = localStorage.getItem(key);
        if (!storageItem || storageItem == null) {
            localStorage.setItem(key, "");
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
            localStorage.setItem(key, queueString);
        } catch (err) {
            return false;
        }
        return true;
    }
    /*
    Push an array of items into the queue
    This operation is transactional. Either all the array items get pushed or none get pushed.
    */
    exports.pushAll = function(itemArr) {
        try {
            if(Object.prototype.toString.call(itemArr) === '[object Array]') {
                var queueString = getFromLocalStorage(key);
                var tempQueueString = "";
                for(var i=0; i<itemArr.length; i++){
                    var item = itemArr[i];
                    if (tempQueueString == "") tempQueueString += JSON.stringify(item);
                    else tempQueueString += DELIMITER + JSON.stringify(item);
                }
                if (queueString == "") queueString += tempQueueString;
                else queueString += DELIMITER + tempQueueString;
                localStorage.setItem(key, queueString);
            } else return false;
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
                localStorage.setItem(key, queueString);
                return JSON.parse(firstItemString);
            } else if (queueString.length > 0) {
                localStorage.setItem(key, "");
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
        reads the last pushed item, without delete from queue
     */
    exports.getBack = function() {
    try {
        var queueString = getFromLocalStorage(key);
        var lastDelimiterIndex = queueString.lastIndexOf(DELIMITER);
        if (lastDelimiterIndex > -1) {
            var lastItemString = queueString.substr(lastDelimiterIndex+1);
            return JSON.parse(lastItemString);
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
        localStorage.setItem(key, "");
        return stringToArray(queueString);
    }
    return exports;
}
