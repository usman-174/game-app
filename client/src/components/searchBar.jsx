import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
function SearchBar({ setQuery }) {
  const [search, setSearch] = useState("");
  const handleClick = () => setQuery(search);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter Game.."
      />
      {/* <InputRightElement>
        {search.length > 2 && <CloseIcon boxSize={"3"}  onClick={()=>{
          setSearch("")
          setQuery("")
        }}/>}
        </InputRightElement> */}
        <InputRightElement>
            <IconButton
              icon={<CloseIcon />}
              variant="unstyled"
              size="sm"
              aria-label="Clear search query"
              onClick={()=>{
                setSearch("")
                setQuery("")
              }}
              display={search.length > 2 ? "block" : "none"}
            />
          </InputRightElement>

      <InputRightElement width="4.5rem">
      
        <Button h="1.75rem" size="md" onClick={handleClick}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
export default SearchBar;
