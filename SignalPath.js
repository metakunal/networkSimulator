module.exports = SignalPath;

function SignalPath() {
  //initializes an empty array transceivers to store transceivers connected to the signal path.
  this.transceivers = [];
}

//to add a transceiver to the signal path. It takes a transceiver object as a parameter and adds it to the transceivers array.
SignalPath.prototype.attach = function (transceiver) {
  this.transceivers.push(transceiver);
};

//removes a transceiver from the signal path. It iterates over the transceivers array, finds the transceiver object that matches the provided transceiver, and removes it from the array using the splice() method.
SignalPath.prototype.detach = function (transceiver) {
  for (var i in this.transceivers) {
    if (this.transceivers[i] === transceiver) {
      this.transceivers.splice(i, 1);
      break;
    }
  }
};

//transmits a frame along the signal path, excluding the source transceiver.
//Parameters: sourceTransceiver -> the transceiver from which the frame originated. frame-> frame to be transmitted
//It iterates over the transceivers array and calls the receive() method on each transceiver except the sourceTransceiver, passing the frame as an argument.
//The receive method pushes the frame into the receiveQueue
SignalPath.prototype.transmit = function (sourceTransceiver, frame) {
  for (var i in this.transceivers) {
    if (this.transceivers[i] !== sourceTransceiver) {
      this.transceivers[i].receive(frame);
    }
  }
};
