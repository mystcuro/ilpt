pragma solidity ^0.8.21;

contract TokenStorage {
    struct Entry {
        bytes32 token;
        uint timestamp;
    }

    Entry[] public entries;

    mapping(bytes32 => bool) private storedTokens;

    event EntryStored(bytes32 token, uint timestamp);

    function storeToken(bytes32 _token) public {
        require(!storedTokens[_token], "Token already exists");

        entries.push(Entry(_token, block.timestamp));
        storedTokens[_token] = true;

        emit EntryStored(_token, block.timestamp);
    }

    function checkToken(bytes32 _token) public view returns (bool) {
        return storedTokens[_token];
    }

    function getEntry(uint index) public view returns (bytes32, uint) {
        require(index < entries.length, "Index out of bounds");
        return (entries[index].token, entries[index].timestamp);
    }

    function getTotalEntries() public view returns (uint) {
        return entries.length;
    }
}
