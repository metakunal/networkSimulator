module.exports = Hub;

var Transceiver = require("./Transceiver");

// name: The name of the hub.
// numberOfPorts: The number of ports the hub should have.
function Hub(name, numberOfPorts) {
  this.name = name;
  this.ports = [];
  var that = this;

  // This function is responsible for handling frames received by the hub.
  //When a frame is received, the function forwards the frame to all ports except the port it was received on, effectively broadcasting the frame to all connected devices.
  function receiveHandler(srcPort, frame) {
    var ports = that.ports;
    for (var i in ports) {
      if (ports[i] !== srcPort) {
        ports[i].transmit(frame);
      }
    }
  }

  //To create and add transceivers to the ports array. Each transceiver represents a port on the hub and is initialized with a name, the receiveHandler function, and a reference to the hub (this).
  for (var i = 0; i < numberOfPorts; i++) {
    this.ports.push(new Transceiver("Port" + i, receiveHandler, this));
  }
}
