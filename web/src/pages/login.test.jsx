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

const doLogin = vi.fn();

const LoginInWrapper = () => (
  <BrowserRouter>
    <AlertProvider>
      <AuthContext.Provider value={{ doLogin }}>
        <Login />
      </AuthContext.Provider>
    </AlertProvider>
  </BrowserRouter>
);

describe("<Login/>", () => {
  beforeEach(() => {
    cleanup();
  });

  test("render successfully", () => {
    // Given

    // When
    render(<LoginInWrapper />);

    // Then
    screen.getByText("Login");
    screen.getByLabelText("Email address");
    screen.getByLabelText("Password");

    expect(document.body).toMatchSnapshot();
  });

  test("happy case", async () => {
    // Given
    render(<LoginInWrapper />);

    // When

    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");

    fireEvent.change(email, { target: { value: "john@example.com" } });
    fireEvent.change(password, { target: { value: "12345678" } });

    fireEvent.submit(screen.getByTestId("login-form"));

    // Then
    await waitFor(() => {
      expect(doLogin).toHaveBeenCalledWith({
        email: "john@example.com",
        password: "12345678",
      });
    });
  });
});
