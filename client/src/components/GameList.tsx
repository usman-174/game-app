import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { Link } from "@chakra-ui/next-js";
import ShowFavButton from "./ShowFavButton";
import { Game } from "@/types/Game";
import { Dispatch, SetStateAction } from "react";
type Props = {
  games: Game[]
  setfavourites: Dispatch<SetStateAction<Game[]>>

  }

const GameList = ({ games, setfavourites }: Props) => {
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
            <Link href={`/game/${game.id}`}>
              <Heading as="h3" size="md" mb={2}>
                {game.name}
              </Heading>
            </Link>
            <Text mb={2}>Percent Recommended: {game.percentRecommended}%</Text>
            <Text mb={2}>Number of Reviews: {game.numReviews}</Text>
            <Text mb={2}>Top Critic Score: {game.topCriticScore}</Text>
            <Text>Tier: {game.tier}</Text>
            <ShowFavButton game={game} setfavourites={setfavourites} />
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default GameList;
