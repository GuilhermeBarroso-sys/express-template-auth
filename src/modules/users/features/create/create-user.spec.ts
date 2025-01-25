import request from "supertest";
import { app } from "../../../../app";
import { PrismaClient } from "@prisma/client";

describe("Create User Feature", () => {
  const prisma = new PrismaClient();

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("test@example.com");
    expect(response.body.user.name).toBe("Test User");
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("token");
  });

  it("should not create a user with existing email", async () => {
    await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    const response = await request(app).post("/users").send({
      email: "test@example.com",
      password: "password456",
      name: "Another User",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual([{ message: "Email already in use" }]);
  });

  it("should validate required fields", async () => {
    const response = await request(app).post("/users").send({
      email: "invalid-email",
      password: "123",
      name: "",
    });

    expect(response.status).toBe(400);
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message.length).toBeGreaterThan(0);
    expect(response.body.message[0]).toHaveProperty("message");
  });
});
