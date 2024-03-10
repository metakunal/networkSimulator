A simple CLI based networking simulation program in JavaScript.

1. Network Components:
   - The program defines several classes representing different network components:
     - Host: Represents network hosts (e.g., computers).
     - Transceiver: Represents communication interfaces.
     - Frame: Represents data frames for communication.
     - Hub: Represents network hubs.
     - Switch: Represents network switches.
     - SignalPath: Represents pathways for signal transmission.
2. Functionality:

   - Host class: It represents network hosts with methods to transmit data frames.
   - Transceiver class: It represents communication interfaces with methods to transmit and receive frames.
   - Hub class: It represents network hubs, forwarding frames received on one port to all other ports.
   - Switch class: It represents network switches, forwarding frames based on destination MAC addresses and maintaining a MAC address table.
   - SignalPath class: It represents pathways for signal transmission, allowing attachment of transceivers and transmitting frames between them.

3. Demo Functions:

   - The program contains demo functions (Demo1 and Demo2) that demonstrate the functionality of the network components.
   - These demo functions create instances of hosts, hubs, switches, and signal paths and demonstrate data transmission between them using frames.

4. Overall Program Flow:
   - The program simulates a small network environment where hosts communicate with each other through hubs and switches.
   - Frames are generated and transmitted between hosts, with switches and hubs facilitating the transmission based on their behavior.
   - The demo functions showcase different network scenarios, illustrating how data flows through the network components.

In summary, the program simulates networking behavior using JavaScript classes representing various network components. It demonstrates data transmission between hosts through hubs and switches, showcasing the functionality of the simulated network environment.

# How to setup?

There are two demo functions in main.js:

- Demo1() - Shows basic Layer 2 communication between two hosts.

  ![image](https://github.com/metakunal/networkSimulator/assets/34987239/81c1b2d5-7533-43fc-b5ad-beafdb92435e)

- Demo2() - Adds more virtual network hardware to hosts.

![image](https://github.com/metakunal/networkSimulator/assets/34987239/e844c202-308c-4377-bc4b-0fc2935aca5f)

To run this project, use the following command:
```console
node main.js
```
# Future Scope
Currently there is only very basic Layer 1 and Layer 2 networking functionality. We plan on implementing Layer 3 and Layer 4 support soon and would like to eventually create a GUI
