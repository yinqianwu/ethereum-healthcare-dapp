pragma solidity ^0.4.0;

contract auditEntry  {
    // the application that created this audit entry
    address public owner;

    // the building that patient just entered
    string public building;

    // the account (e.g. user) that enter the building 
    address public visitor;

    // when this event occurred 
    uint public timeStamp;

    /* this runs when the contract is executed */
    function auditEntry(string _building, address _visitor, uint _timeStamp) public {
        owner = msg.sender;
        building = _building;
        visitor = _visitor;
        timeStamp = _timeStamp;
    }
}
