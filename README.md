LocalQueue (see also LSQueue for an alternate implementation)
==========

A queue implementation backed by localStorage for providing persistent queue on the browser. Can exchange data between tabs in the browser.

# Usage 

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
The popped item is the original object that was pushed. Returns a null if queue is empty.

## getFront

```
localQueue.getFront()
```
The front item is the original object that was pushed. Returns a null if queue is empty.
Same as pop(), only non-destructive.


## getBack

```
localQueue.getBack()
```
Gets the last item pushed, with deleting from queue.

## getAll

```
localQueue.getAll()
```
Returns an a cloned array of the underlying queue.

## removeAll 

```
localQueue.removeAll()
```
Removes all items from the queue
