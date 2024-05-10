module.exports = Host;

var Transceiver = require("./Transceiver");
var Frame = require("./Frame");

function Host(name, macAddress) {
  this.name = name;
  this.macAddress = macAddress;
  //A new Transceiver object is created as this.port, representing the network port of the host. The Transceiver constructor takes three parameters: name of the port, a callback function for handling received frames, and a reference to the current host (this).
  this.port = new Transceiver("Port0", receiveHandler, this);
  //A local variable that is used to capture the this context, ensuring its availability inside nested functions.
  var that = this;

  //Checks if the destination MAC address of the received frame matches the MAC address of the host.
  //Logs whether the host has received the frame or if it was dropped because it was not intended for this host.
  function receiveHandler(srcPort, frame) {
    if (frame.destMac === that.macAddress) {
      console.log(that.name + " has received the frame");
    } else {
      console.log(that.name + " dropped frame - not intended recipient");
    }
  }
}

//destMac (destination MAC address) and payload (data payload to be transmitted).
//Inside this method, a new Frame object is created with the provided destination MAC address, the MAC address of the host (this.macAddress), and the payload.
//The transmit method of the host's port (this.port) is then called with the created frame as an argument to initiate the transmission.
Host.prototype.transmitLayer2 = function (destMac, payload) {
  var frame = new Frame(destMac, this.macAddress, payload);
  this.port.transmit(frame);
};
