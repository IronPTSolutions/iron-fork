import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, it, expect, vi, beforeEach } from "vitest";
import Login from "./login";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "../contexts/auth.context";
import { AlertContext } from "../contexts/alert.context";

describe("<Login/>>:", () => {
  const doLogin = vi.fn();

  function Wrapper() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{ doLogin }}>
          <AlertContext.Provider value={{ showAlert: () => {} }}>
            <Login />
          </AlertContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }

  afterEach(cleanup);

  it("should render component", () => {
    render(<Login />, { wrapper: Wrapper });
  });

  it("happy path", async () => {
    render(<Login />, { wrapper: Wrapper });

    const email = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/password/i);

    fireEvent.change(email, { target: { value: "user@domain.com" } });
    fireEvent.change(password, { target: { value: "password123" } });

    const form = screen.getByTestId("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(doLogin).toHaveBeenCalled();
    });
  });
});
