LocalQueue
==========

A queue implementation backed by window.localStorage for providing persistent queue on the browser.

# Usage 
=====

## Initialize

```
var localQueue = new LocalQueue("myLocalQueue");
```

This creates a queue which is stored in localStorage by the key that is provided. During init it recovers the data in localStorage and reconstructs the queue if something was stored earlier. 

## Methods 

## Push 

```
localQueue.push(item)
```
item is converted to json and stored. 

## Pop

```
localQueue.pop()
```
the popped item is the original object that was pushed 

## getAll

```
localQueue.getAll()
```
Returns an a cloned array of the underlying queue.

## removeAll 

```
localQueue.removeAll(item)
```
Removes all items from the queue


#Note:

This queue is meant ot be used as a singleton. Do not instantiate multiple 