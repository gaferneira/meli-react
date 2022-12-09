// Note that jest must be explicitly imported
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SelectCountry } from "../../../src/ui";
import { vi } from "vitest";

test("When country is selected, in calls the onSelectCountry callback", async () => {
  //GIVEN
  const onSelectCountry = vi.fn();
  render(<SelectCountry onSelectCountry={onSelectCountry} />);
  // WHEN
  await userEvent.click(screen.getByRole("button", { name: /colombia/i }));
  //THEN
  expect(onSelectCountry).toHaveBeenCalled();
});
