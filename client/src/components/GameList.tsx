import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import Link  from "next/link";
import ShowFavButton from "./ShowFavButton";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
export interface Game {
  id: number;
  percentRecommended: number;
  numReviews: number;
  topCriticScore: number;
  tier: string;
  name: string;
  url: string;
  firstReleaseDate: number;
}


type Props = {
  games?: Game[]
  setfavourites?: Dispatch<SetStateAction<Game[]>>

}

const GameList: FunctionComponent<Props> = ({ games, setfavourites }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
      gap={6}
      mt={6}
    >
      {games?.map((game) => (
        <GridItem key={game.id}>
          <Box
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            h="100%"
          >
              <Heading as="h3" size="md" mb={2}>
            <Link href={`/game/${game.id}`}>
                {game.name}
            </Link>
              </Heading>
            <Text mb={2}>Percent Recommended: {game.percentRecommended}%</Text>
            <Text mb={2}>Number of Reviews: {game.numReviews}</Text>
            <Text mb={2}>Top Critic Score: {game.topCriticScore}</Text>
            <Text>Tier: {game.tier}</Text>
            <ShowFavButton game={game} setfavourites={setfavourites!} />
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default GameList;
