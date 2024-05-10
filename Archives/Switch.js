module.exports = Switch;

var Transceiver = require("./Transceiver");

// name: The name of the switch.
// numberOfPorts: The number of ports the switch should have.
function Switch(name, numberOfPorts) {
  this.name = name;
  this.ports = [];
  //A hash table to store the MAC addresses learned by the switch and the port they were received on.
  this.camTable = {};
  var that = this;

  //function is responsible for handling frames received by the switch.
  //When a frame is received, the function updates the CAM table with the MAC address of the sender (if necessary) and forwards the frame to the appropriate port based on the destination MAC address.
  function receiveHandler(srcPort, frame) {
    var ports = that.ports;
    var camTable = that.camTable;
    for (var i in ports) {
      if (ports[i] === srcPort) {
        if (camTable[frame.srcMac] !== i) {
          if (camTable[frame.srcMac] === undefined) {
            console.log(
              that.name + " CAM table entry added " + frame.srcMac + "=" + i
            );
          } else {
            console.log(
              that.name + " CAM table entry changed " + frame.srcMac + "=" + i
            );
          }
          camTable[frame.srcMac] = i;
        }
      }
    }

    if (camTable[frame.destMac] !== undefined) {
      console.log(
        that.name +
          " CAM table entry found " +
          frame.destMac +
          "=" +
          camTable[frame.destMac]
      );
      ports[camTable[frame.destMac]].transmit(frame);
    } else {
      for (var i in ports) {
        if (ports[i] !== srcPort) {
          ports[i].transmit(frame);
        }
      }
    }
  }

  // Inside a loop, the constructor creates and adds transceivers to the ports array. Each transceiver represents a port on the switch and is initialized with a name, the receiveHandler function, and a reference to the switch (this).
  for (var i = 0; i < numberOfPorts; i++) {
    this.ports.push(new Transceiver("Port" + i, receiveHandler, this));
  }
}
