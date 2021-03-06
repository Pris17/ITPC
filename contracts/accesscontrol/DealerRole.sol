// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 < 0.8.4;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'DealerRole' to manage this role - add, remove, check
contract DealerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event DealerAdded(address indexed account);
  event DealerRemoved(address indexed account);

  // Define a struct 'dealers' by inheriting from 'Roles' library, struct Role
  Roles.Role private dealers;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() public {
    _addDealer(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyDealer() {
    require(isDealer(msg.sender));
    _;
  }

  // Define a function 'isDealer' to check this role
  function isDealer(address account) public view returns (bool) {
    return dealers.has(account);
  }

  // Define a function 'addDealer' that adds this role
  function addDealer(address account) public onlyDealer {
    _addDealer(account);
  }

  // Define a function 'renounceDealer' to renounce this role
  function renounceDealer() public {
    _removeDealer(msg.sender);
  }

  // Define an internal function '_addDealer' to add this role, called by 'addDealer'
  function _addDealer(address account) internal {
    dealers.add(account);
    emit DealerAdded(account);
  }

  // Define an internal function '_removeDealer' to remove this role, called by 'renounceDealer'
  function _removeDealer(address account) internal {
    dealers.remove(account);
    emit DealerRemoved(account);
  }
}