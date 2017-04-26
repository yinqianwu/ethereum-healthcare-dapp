pragma solidity ^0.4.2;

contract Prescription {

	address public owner;

	event PrescriptionAccessed(address indexed from);

	function Prescription() {
		owner = msg.sender;
	}

	function logAccess(address _from) {
		if(msg.sender != owner) {
			throw;
		}
		PrescriptionAccessed(_from);
	}
}
