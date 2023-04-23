const request = require("supertest");
const { app } = require("../app");
const prisma = require("../prisma");

describe("GET /games", () => {
  afterAll(async () => {
    // Clean up the database after all tests have finished
    await prisma.$disconnect();
  });

  it("should return a list of all games in the database", async () => {
    // Make a GET request to the /games route
    const response = await request(app).get("/api/all-games");

    // Expect the status code to be 200
    expect(response.statusCode).toBe(200);

    // Expect the response body to be an array of games
    expect(response.body).toBeInstanceOf(Array);

    // Expect each item in the response body to have the necessary properties
    response.body.forEach((game) => {
      expect(game).toHaveProperty("id");
      expect(game).toHaveProperty("name");
      expect(game).toHaveProperty("percentRecommended");
      expect(game).toHaveProperty("tier");
    });
  });
});

describe("GET /game/:id", () => {
  // afterEach(async () => {
  //   // Clean up the database after each test
  //   await prisma.game.deleteMany();
  // }); //It will clean database if ran

  it("should return the game with the specified ID", async () => {
    // Create a game in the database to test with
    const createdGame = await prisma.game.create({
      data: {
        percentRecommended: 100,
        numReviews: 53,
        topCriticScore: 89.3529411764706,
        tier: "Mighty",
        name: "Slay The Spire",
        firstReleaseDate: 2017,
        url: "https://opencritic.com/game/7207/slay-the-spire",
      },
    });

    // Make a GET request to the route for the created game
    const response = await request(app).get(`/api/game/${createdGame.id}`);

    // Expect the status code to be 200
    expect(response.statusCode).toBe(200);

    // Expect the response body to have the same properties as the created game
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Slay The Spire");
  });

  it("should return an error if the ID is not an integer", async () => {
    // Make a GET request to the /games/:id route with a non-integer ID
    const response = await request(app).get("/api/game/abc");

    // Expect the status code to be 400
    expect(response.statusCode).toBe(400);

    // Expect the response body to have a message property
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid game ID");
  });

  it("should return an error if the game is not found", async () => {
    // Make a GET request to the /games/:id route with a non-existent ID
    const response = await request(app).get("/api/game/9999");

    // Expect the status code to be 500
    expect(response.statusCode).toBe(404);

    // Expect the response body to have a message property
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Game not found");
  });

  it("should return an empty array if no games match the search query", async () => {
    // Mock the findMany method to return an empty array
    jest.spyOn(prisma.game, "findMany").mockResolvedValue([]);

    // Make a GET request to the /game route with a search query
    const response = await request(app).get("/api/games?q=xxxx");

    // Expect the status code to be 200
    expect(response.statusCode).toBe(200);

    // Expect the response body to be an empty array
    expect(response.body).toEqual([]);
  });
});

describe("POST /games", () => {
  test("should create a new game", async () => {
    const newGame = {
      percentRecommended: 90,
      numReviews: 100,
      topCriticScore: 95,
      tier: "AAA",
      name: "New Game",
      firstReleaseDate: 2022,
      url: "https://example.com/new-game",
    };

    // Make a POST request to the /games route with the new game data
    const response = await request(app).post("/api/add-game").send(newGame);

    // Expect the status code to be 200
    expect(response.statusCode).toBe(200);

    // Expect the response body to match the new game data
    expect(response.body).toMatchObject(newGame);
  });


});
