const { MongoMemoryServer } = require("mongodb-memory-server");
const { insertData, fetchAllData } = require("../server"); // Ensure correct path to server.js

// Mock MongoClient and its methods (connect, db, insertMany, find, and close)
jest.mock('mongodb', () => {
    const original = jest.requireActual('mongodb');
    
    // Create a mock for MongoClient that simulates its behavior
    const MongoClientMock = jest.fn().mockImplementation(() => {
        return {
            connect: jest.fn().mockResolvedValue(true),  // Simulate successful connection
            db: jest.fn().mockReturnValue({
                collection: jest.fn().mockReturnValue({
                    insertMany: jest.fn().mockResolvedValue({ insertedCount: 3, insertedIds: {} }),
                    find: jest.fn().mockReturnValue({
                        toArray: jest.fn().mockResolvedValue([
                            { name: "Margherita", ingredients: ["tomato", "mozzarella", "basil"], price: 8.99 },
                            { name: "Pepperoni", ingredients: ["tomato", "mozzarella", "pepperoni"], price: 9.99 },
                            { name: "Veggie Supreme", ingredients: ["tomato", "bell peppers", "onion", "olives"], price: 10.49 }
                        ]),
                    }),
                }),
            }),
            close: jest.fn().mockResolvedValue(true),  // Mock the close method
        };
    });

    // Return the mocked MongoClient, while preserving the original MongoDB methods
    return {
        ...original,
        MongoClient: MongoClientMock,
    };
});

describe("MongoDB Operations", () => {
    let mongoServer;
    let uri;

    beforeAll(async () => {
        // Set up MongoDB Memory Server for testing
        mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();  // Use the in-memory database URI
    });

    afterAll(async () => {
        await mongoServer.stop(); // Stop the in-memory server after tests
    });

    beforeEach(() => {
        // Reset mock data before each test
        jest.clearAllMocks();
    });

    test("insertData should insert documents into pizzaMenu", async () => {
        const { MongoClient } = require('mongodb');  // Ensure MongoClient is imported here
        const client = new MongoClient(uri);  // MongoClient should now work as a constructor

        // Run insertData function
        await insertData();

        // Verify insertMany was called with the correct arguments
        const collection = client.db().collection();
        expect(collection.insertMany).toHaveBeenCalledWith([
            { name: "Margherita", ingredients: ["tomato", "mozzarella", "basil"], price: 8.99 },
            { name: "Pepperoni", ingredients: ["tomato", "mozzarella", "pepperoni"], price: 9.99 },
            { name: "Veggie Supreme", ingredients: ["tomato", "bell peppers", "onion", "olives"], price: 10.49 }
        ]);

        // Verify that client.close() was called
        expect(client.close).toHaveBeenCalled();
    });

    test("fetchAllData should retrieve documents from pizzaMenu", async () => {
        const { MongoClient } = require('mongodb');  // Ensure MongoClient is imported here
        const client = new MongoClient(uri);  // MongoClient should now work as a constructor

        // Run fetchAllData function
        const data = await fetchAllData();

        // Verify the correct data was returned
        expect(data).toEqual([
            { name: "Margherita", ingredients: ["tomato", "mozzarella", "basil"], price: 8.99 },
            { name: "Pepperoni", ingredients: ["tomato", "mozzarella", "pepperoni"], price: 9.99 },
            { name: "Veggie Supreme", ingredients: ["tomato", "bell peppers", "onion", "olives"], price: 10.49 }
        ]);

        // Verify that client.close() was called
        expect(client.close).toHaveBeenCalled
