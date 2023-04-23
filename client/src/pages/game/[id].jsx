import axiosInstance from "@/helpers/axiosInstance";
import {
  addGameToFavorites,
  isGameInFavorites,
  removeGameFromFavorites,
} from "@/helpers/manageFavorites";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback ,useState,useEffect} from "react";


const Game = ({ game }) => {
  const router = useRouter();
  const [exist, setexist] = useState(() => isGameInFavorites(game));

  const handleRemoveFromFavorites = useCallback(() => {
    removeGameFromFavorites(game);
    setexist(isGameInFavorites(game));
  }, [game]);

  const handleAddToFavorites = useCallback(() => {
    addGameToFavorites(game);
    setexist(isGameInFavorites(game));
  }, [game]);

  useEffect(() => {
    setexist(isGameInFavorites(game));
  }, [game]);
  return (
    <div>
      {" "}
      <Box m="5">
        <Button
          leftIcon={<ArrowBackIcon />}
          size="sm"
          onClick={router.back}
        ></Button>
        {game ? (
          <Box
            maxW="lg"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            m="4"
          >
            <Flex justify="space-between" p="4">
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="xl">
                  {game.name}
                </Text>
                <Text fontSize="md">
                  Released on{" "}
                  {new Date(game.firstReleaseDate).toLocaleDateString()}
                </Text>
              </Flex>
              <Text fontSize="lg" textAlign="right">
                CriticScore : <b>{game.topCriticScore.toFixed(1)}</b>
              </Text>
            </Flex>

            <Box p="6">
              <Flex justify="space-between" mb="2">
                <Text fontWeight="bold">Tier:</Text>
                <Text>{game.tier}</Text>
              </Flex>

              <Flex justify="space-between" mb="2">
                <Text fontWeight="bold">Percent Recommended:</Text>
                <Text>{game.percentRecommended}%</Text>
              </Flex>

              <Flex justify="space-between" mb="2">
                <Text fontWeight="bold">Number of Reviews:</Text>
                <Text>{game.numReviews}</Text>
              </Flex>

              <Link
                href={game.url}
                color="blue.500"
                isExternal
                fontWeight="bold"
                textAlign="right"
              >
                Read more on OpenCritic
              </Link>
              <br />
              {exist ? (
                <Button
                  onClick={handleRemoveFromFavorites}
                  mt={2}
                  size="xs"
                  colorScheme="red"
                >
                  Remove from favorite
                </Button>
              ) : (
                <Button
                  onClick={handleAddToFavorites}
                  mt={2}
                  size="xs"
                  colorScheme="blue"
                >
                  Add to favorite
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <h1>GAME Not FOUND</h1>
        )}
      </Box>
    </div>
  );
};

export default Game;

export async function getServerSideProps(context) {
  const { id } = context.query;
  try {
    const response = await axiosInstance.get(`/game/${id}`);
    const game = response.data;
    return {
      props: { game },
    };
  } catch (error) {
    return {
      props: { game: null },
    };
  }
}
