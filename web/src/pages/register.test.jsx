import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Login from "./login";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "../contexts/alert.context";
import AuthContext from "../contexts/auth.context";
import Register from "./register";
import * as apiService from "../services/api.service";

const RegisterWrapper = () => (
  <BrowserRouter>
    <AlertProvider>
      <Register />
    </AlertProvider>
  </BrowserRouter>
);

describe("<Login/>", () => {
  beforeEach(() => {
    cleanup();

    vi.spyOn(navigator, "geolocation", "get").mockReturnValue({
      getCurrentPosition: vi.fn(),
    });
  });

  test("render successfully", () => {
    // Given

    // When
    render(<RegisterWrapper />);

    // Then
    screen.getByLabelText("Email address");
    screen.getByLabelText("Password");

    expect(document.body).toMatchSnapshot();
  });

  test("happy case", async () => {
    // Given
    vi.spyOn(apiService, "createUser").mockResolvedValue();

    // When
    render(<RegisterWrapper />);
    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");
    const name = screen.getByLabelText("Name");
    const username = screen.getByLabelText("Username");
    const birth = screen.getByLabelText("Birth date");

    fireEvent.change(email, { target: { value: "john@example.com" } });
    fireEvent.change(password, { target: { value: "12345678" } });
    fireEvent.change(name, { target: { value: "John" } });
    fireEvent.change(username, { target: { value: "superjohn" } });
    fireEvent.change(birth, { target: { value: new Date() } });

    fireEvent.submit(screen.getByTestId("register-form"));

    // Then
    await waitFor(() => {
      expect(apiService.createUser).toHaveBeenCalledWith({
        birthDate: "",
        location: {
          type: "Point",
          coordinates: [0, 0],
        },
        email: "john@example.com",
        password: "12345678",
        name: "John",
        username: "superjohn",
      });
    });
  });
});
