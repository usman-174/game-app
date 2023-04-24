import ShowFavButton from "@/components/ShowFavButton";

import {
    addGameToFavorites,
    getFavoriteGames,
    isGameInFavorites,
} from "@/helpers/manageFavorites";
import { Game } from "@/types/Game";

describe("ShowFavButton", () => {
    const game: Game = {
        id: 1,
        name: "Game 1",
        percentRecommended: 90,
        numReviews: 100,
        topCriticScore: 85,
        tier: "A",
        url: "dwadaw",
        firstReleaseDate: 2013,
    }

    beforeEach(() => {
        // Clear the favorites list before each test
        localStorage.removeItem("favoriteGames");
    });

    it("displays 'Add to favorites' when the game is not in favorites", () => {
        cy.stub(window, "localStorage").returns({
            getItem: () => null,
        });
        cy.mount(<ShowFavButton game={game} setfavourites={() => { }} />);

        cy.contains("Add to favorites").should("exist");
        cy.contains("Remove from favorites").should("not.exist");
    });

    it("displays 'Remove from favorites' when the game is in favorites", () => {
        addGameToFavorites(game);
        cy.mount(<ShowFavButton game={game} setfavourites={() => { }} />);

        cy.contains("Remove from favorites").should("exist");
        cy.contains("Add to favorites").should("not.exist");
    });

    // FUNCTIONS
    it("adds a game to favorites", () => {
        const game = {
            id: 1,
            name: "Game 1",
            percentRecommended: 90,
            numReviews: 100,
            topCriticScore: 85,
            tier: "A",
            url: "dwadaw",
            firstReleaseDate: 2013,
        }
        cy.mount(<ShowFavButton game={game} setfavourites={() => { }} />);

        // Check that the game is not in favorites yet
        expect(isGameInFavorites(game)).to.be.false;

        // Check that the "Add to favorites" button is visible
        cy.get("button")
            .contains("Add to favorites")
            .should("be.visible")
            .should("not.be.disabled");

        // Click the "Add to favorites" button
        cy.get("button").contains("Add to favorites").click();

        cy.window().then((_) => {
            expect(getFavoriteGames()).to.deep.eq(
                [game]
            );
        });

        // Check that the "Remove from favorites" button is visible
        cy.get("button")
            .contains("Remove from favorites")
            .should("be.visible")
            .should("not.be.disabled");
        cy.window().then((_) => {
            expect(getFavoriteGames()).to.deep.eq(
                [game]
            );
        });
    });

    it("removes a game from favorites", () => {
        const game = {
            id: 1,
            name: "Game 1",
            percentRecommended: 90,
            numReviews: 100,
            topCriticScore: 85,
            tier: "A",
            url: "dwadaw",
            firstReleaseDate: 2013,
        }
        cy.mount(<ShowFavButton game={game} setfavourites={() => { }} />);

        // Add the game to favorites
        cy.get("button").contains("Add to favorites").click();
        cy.window().then((_) => {
            // Check that the game is in favorites

            expect(getFavoriteGames()).to.deep.eq(
                [game]
            );
        })

        // Click the "Remove from favorites" button
        cy.get("button").contains("Remove from favorites").click();
        cy.window().then((_) => {
            cy.log(JSON.stringify(getFavoriteGames()))
            // Check that the game has been removed from favorites
            expect(getFavoriteGames().length).to.be.equal(0);


            // // Check that the button text has changed
            cy.get("button").contains("Add to favorites").should("exist");
        });
    });
});