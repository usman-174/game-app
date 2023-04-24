
import GameList, { Game } from "@/components/GameList";

describe("GameList", () => {
    it("displays game information correctly", () => {
        const games: Game[] = [
            {
                id: 1,
                name: "Game 1",
                percentRecommended: 90,
                numReviews: 100,
                topCriticScore: 85,
                tier: "A",
                url: "dwadaw",
                firstReleaseDate: 2013,
            },
            {
                id: 2,
                name: "Game 2",
                percentRecommended: 80,
                numReviews: 50,
                topCriticScore: 90,
                tier: "B",
                url: "dwad2d2aaw",
                firstReleaseDate: 2011,
            },
        ];

        cy.mount(<GameList games={ games } />);

        cy.get("h3").should("have.length", 2).eq(0).should("have.text", "Game 1");
        cy.get("h3").eq(1).should("have.text", "Game 2");

        cy.get("p")
            .eq(0)
            .should("have.text", "Percent Recommended: 90%");
        cy.get("p").eq(1).should("have.text", "Number of Reviews: 100");
        cy.get("p").eq(2).should("have.text", "Top Critic Score: 85");
        cy.get("p").eq(3).should("have.text", "Tier: A");

    })
})
