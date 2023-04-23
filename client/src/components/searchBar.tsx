import {
  Button,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { useState } from "react";
type Props = {
  setQuery : (x:string)=>{}
}
function SearchBar({ setQuery }:Props) {
  const [search, setSearch] = useState<string>("");
  const handleClick = () => setQuery(search);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter Game.."
      />

      <InputRightElement width="4.5rem">
      
        <Button h="1.75rem" size="md" onClick={handleClick}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
export default SearchBar;
