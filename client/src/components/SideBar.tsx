import axiosInstance from "@/helpers/axiosInstance";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Game } from "@/types/Game";

const Sidebar = (): JSX.Element | null => {
  const [topGames, setTopGames] = useState<Game[]>([]);

  useEffect(() => {
    const getTopGames = async () => {
      try {
        const { data } = await axiosInstance.get("/games-top");
        setTopGames(data);
      } catch (error) {
        console.log("Error fetching top games:", error);
      }
    };
    getTopGames();
    //eslint-disable-next-line
  }, []);

  if (!topGames.length) {
    return null;
  }

  return (
    <Box ml={{ md: "auto" }} w={{ base: "100%", lg: "30%" }}>
      <Text textAlign="center" m="2" fontSize="3xl" fontWeight="bold">
        Top 10
      </Text>
      <Flex
        overflowX={{ base: "scroll", md: "hidden" }}
        direction={{ base: "row", md: "column" }}
        gap="2"

        align="flex-start"
      >
        {topGames.map((game) => (
          <Box
            key={game.id}
            boxShadow="sm"
            textAlign={{ md: "left", base: "center" }}
            p={2}
            h="100%"
          >
              <Heading as="h2" size="sm" mb={2}>
            <Link href={`/game/${game.id}`}>
                {game.name}
            </Link>
              </Heading>
            <Text mb={1} fontSize="small">
              Percent Recommended: {game.percentRecommended}%
            </Text>
            <Text mb={1} fontSize="small">
              Number of Reviews: {game.numReviews}
            </Text>
            <Text mb={1} fontSize="small">
              Top Critic Score: {game.topCriticScore}
            </Text>
            <Text>Tier: {game.tier}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
