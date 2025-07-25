pragma solidity ^0.8.21;

contract TokenStorage {
    struct Entry {
        string token;
        uint timestamp;
    }

    Entry[] public entries;

    event EntryStored(string token, uint timestamp);

    function storeToken(string memory _token) public {
        entries.push(Entry(_token, block.timestamp));
        emit EntryStored(_token, block.timestamp);
    }

    function getEntry(uint index) public view returns (string memory, uint) {
        require(index < entries.length, "Index out of bounds");
        return (entries[index].token, entries[index].timestamp);
    }

    function getTotalEntries() public view returns (uint) {
        return entries.length;
    }
}