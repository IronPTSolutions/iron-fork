import { describe, expect, test, vi } from "vitest";
import { createUser, login, logout } from "./api.service";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
    create: vi.fn().mockReturnThis(),
    interceptors: {
      request: {
        use: vi.fn(),
        eject: vi.fn(),
      },
      response: {
        use: vi.fn(),
        eject: vi.fn(),
      },
    },
  },
}));

describe("API service", () => {
  describe("login", () => {
    test("happy case", async () => {
      // Given
      const loginData = {
        email: "john@example.com",
        password: "123456",
      };

      vi.spyOn(axios, "post").mockResolvedValue({
        data: { accessToken: "my super token" },
      });

      // When
      await login(loginData);

      // Then
      expect(axios.post).toHaveBeenCalledWith("/login", loginData);
      expect(localStorage.getItem("token")).toBe("my super token");
    });
  });

  describe("logout", () => {
    test("happy case", async () => {
      // Given
      localStorage.setItem("token", "LALALA");

      // When
      logout();

      // Then
      expect(localStorage.getItem("token")).toBe(null);
    });
  });

  describe("createUser", () => {
    test("happy case", async () => {
      // Given
      const userData = {
        name: "John",
        email: "john@example.com",
      };

      // When
      await createUser(userData);

      // Then
      expect(axios.post).toHaveBeenCalledWith("/users", userData);
    });
  });
});
