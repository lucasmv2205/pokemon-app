import { render, screen, fireEvent } from "@testing-library/react";
import { AttackType } from "@/types";
import { ModalAttack } from "@/components/ModalAttack";

const handleCloseModal = jest.fn();

const mockAttack: AttackType = {
  name: "Flamethrower",
  cost: ["Fire", "Colorless"],
  convertedEnergyCost: 3,
  damage: "90",
  text: "A powerful fire attack that burns the enemy.",
};

describe("ModalAttack", () => {
  it("renders the attack details correctly", () => {
    render(
      <ModalAttack attack={mockAttack} handleCloseModal={handleCloseModal} />
    );

    expect(screen.getByText("Flamethrower")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("Fire, Colorless")).toBeInTheDocument();
    expect(
      screen.getByText("A powerful fire attack that burns the enemy.")
    ).toBeInTheDocument();
  });

  it("calls handleCloseModal when the close button is clicked", () => {
    render(
      <ModalAttack attack={mockAttack} handleCloseModal={handleCloseModal} />
    );

    const closeButton = screen.getByLabelText("Close modal");

    fireEvent.click(closeButton);

    expect(handleCloseModal).toHaveBeenCalledTimes(1);
  });
});
