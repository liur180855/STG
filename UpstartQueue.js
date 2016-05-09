/********************************************************************************
 * Overview:   	
 *				        
 * Created:     Feb.22, 2016
 * Creator:     Stephanie Zeng
 ********************************************************************************/
 
////////////////////////////////////////////////////////////////
// Constructor
////////////////////////////////////////////////////////////////
/**
 * Creates an instance of a queue.
 *
 * @constructor
 */
var UpstartQueue = function () {
    // Assign our variables
    this.queue = [];
    this.isQueueEmpty = true;
}

/**
 * Retrieves the first element of queue.
 *
 * @return {element}.
 */
UpstartQueue.prototype.dequeue = function () {
	if (this.queue.length==0){
		return;
	}
	var first_element = this.queue[0]
	this.queue.shift();
	if (this.queue.length==0){
		this.isQueueEmpty = true;
	}
	return first_element;
}

/**
 * Insert to last of queue.
 *
 * @param {element}.
 */
UpstartQueue.prototype.enqueue = function (last_element) {
	this.queue.push(last_element);
	if (this.isQueueEmpty==true){
		this.isQueueEmpty = false;
	}
	return true;
}

/**
 * check if queue is empty.
 *
 * @return {boolean} true if isQueueEmpty.
 */
UpstartQueue.prototype.f_isQueueEmpty = function () {
	return this.isQueueEmpty;
}