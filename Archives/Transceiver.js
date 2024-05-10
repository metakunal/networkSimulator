module.exports = Transceiver;

var SignalPath = require("./SignalPath");

// name: The name of the transceiver.
// receiverFunction: A callback function to handle received frames.
// owner: The owner of the transceiver, typically a networking device.
function Transceiver(name, receiverFunction, owner) {
  this.name = name;
  this.owner = owner;
  this.isAttached = false; // A boolean indicating whether the transceiver is attached to a signal path.
  this.signalPath = null; //The signal path to which the transceiver is attached.
  this.transmitQueue = []; //An array to store frames queued for transmission.
  this.receiveQueue = []; //An array to store frames queued for reception.
  var that = this;

  //Outputs debug messages to the console, indicating the state of transmission or reception.
  function debugOutput(message) {
    var prefix = "";
    if (that.owner !== "undefined" && that.owner !== null) {
      if (typeof that.owner.name === "string") {
        prefix = that.owner.name + ":";
      }
    }
    console.log("[ ]" + prefix + message);
  }

  // Processes frames queued for transmission and sends them through the attached signal path.
  function processTransmitQueue() {
    if (that.transmitQueue.length === 0) {
      return;
    }
    var frame = that.transmitQueue.shift();
    if (that.isAttached) {
      debugOutput(that.name + " has sent [" + frame + "]");
      that.signalPath.transmit(that, frame);
    } else {
      debugOutput(that.name + " failed to send [" + frame + "]");
    }
  }

  // Processes frames queued for reception and calls the receiverFunction callback.
  function processReceiveQueue() {
    if (that.receiveQueue.length === 0) {
      return;
    }
    var frame = that.receiveQueue.shift();
    debugOutput(that.name + " has received [" + frame + "]");
    if (typeof receiverFunction === "function") {
      receiverFunction(that, frame);
    }
  }

  setInterval(processTransmitQueue, 50);
  setInterval(processReceiveQueue, 50);
}

//Attaches the transceiver to a signal path. If the transceiver is not already attached and the provided signalPath is an instance of the SignalPath class, it attaches the transceiver to the signal path.
Transceiver.prototype.attach = function (signalPath) {
  if (!this.isAttached && signalPath instanceof SignalPath) {
    signalPath.attach(this);
    this.signalPath = signalPath;
    this.isAttached = true;
  }
};

//Detaches the transceiver from the currently attached signal path.
Transceiver.prototype.detach = function () {
  if (this.isAttached) {
    this.signalPath.detach(this);
    this.isAttached = false;
    this.signalPath = null;
  }
};

// Queues a frame for transmission.
Transceiver.prototype.transmit = function (frame) {
  this.transmitQueue.push(frame);
};

//Queues a frame for reception.
Transceiver.prototype.receive = function (frame) {
  this.receiveQueue.push(frame);
};
