// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Heritage.sol";

contract TestContract is Heritage {
    function getNextDueHeritage() public view returns (uint n) {
        n = _getNextDueHeritage();
    }

    function fufillHeritage(uint id) public {
        _fufillHeritage(id);
    }
}
