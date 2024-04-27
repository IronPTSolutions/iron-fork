import { beforeEach, describe, expect, test } from "vitest";
import AuthenticatedPage from "./authenticated-page";
import { cleanup, render, screen } from "@testing-library/react";
import AuthContext from "../contexts/auth.context";
import { BrowserRouter } from "react-router-dom";

const MyAuthenticatedPage = ({ user }) => (
  <AuthContext.Provider value={{ user }}>
    <BrowserRouter>
      <AuthenticatedPage>
        <div>Hello!</div>
      </AuthenticatedPage>
    </BrowserRouter>
  </AuthContext.Provider>
);

describe("AuthenticatedPage", () => {
  beforeEach(cleanup);

  test("user logged, OK", () => {
    render(<MyAuthenticatedPage user={{ name: "John" }} />);

    expect(screen.getByText("Hello!")).toBeTruthy();
  });

  test("user not logged, KO", () => {
    render(<MyAuthenticatedPage user={null} />);

    expect(screen.queryByText("Hello!")).toBeFalsy();
  });

  test("user loading", () => {
    render(<MyAuthenticatedPage />);

    expect(screen.queryByText("Loading...")).toBeTruthy();
    expect(screen.queryByText("Hello!")).toBeFalsy();
  });
});
