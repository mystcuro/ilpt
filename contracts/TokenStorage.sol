pragma solidity ^0.8.21;

contract TokenStorage {
    struct Entry {
        string token;
        uint timestamp;
    }

    Entry[] public entries;

    mapping(string => bool) private storedTokens;

    event EntryStored(string token, uint timestamp);

    function storeToken(string memory _token) public {
        require(!storedTokens[_token], "Token already exists");

        entries.push(Entry(_token, block.timestamp));
        storedTokens[_token] = true;

        emit EntryStored(_token, block.timestamp);
    }

    function checkToken(string memory _token) public view returns (bool) {
        return storedTokens[_token];
    }

    function getEntry(uint index) public view returns (string memory, uint) {
        require(index < entries.length, "Index out of bounds");
        return (entries[index].token, entries[index].timestamp);
    }

    function getTotalEntries() public view returns (uint) {
        return entries.length;
    }
}
