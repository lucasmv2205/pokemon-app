import { render, screen, fireEvent } from "@testing-library/react";
import AttacksList from "@/components/AttacksList";
import { AttackType } from "@/types";

describe("AttacksList Component", () => {
  const mockAttacks: AttackType[] = [
    {
      name: "Thunder Shock",
      damage: "30",
      cost: ["Electric"],
      convertedEnergyCost: 1,
      text: "May cause paralysis.",
    },
    {
      name: "Iron Tail",
      damage: "50",
      cost: ["Metal"],
      convertedEnergyCost: 2,
      text: "Has a chance to deal critical damage.",
    },
  ];

  const mockHandleAttackClick = jest.fn();

  it("should render the attacks list with the correct data", () => {
    render(
      <AttacksList
        attacks={mockAttacks}
        handleAttackClick={mockHandleAttackClick}
      />
    );

    expect(screen.getByText(/Attacks/)).toBeInTheDocument();
    expect(screen.getByText(mockAttacks[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockAttacks[1].name)).toBeInTheDocument();
    expect(screen.getByText(/30 of damage/)).toBeInTheDocument();
    expect(screen.getByText(/50 of damage/)).toBeInTheDocument();
  });

  it("should call handleAttackClick when an attack is clicked", () => {
    render(
      <AttacksList
        attacks={mockAttacks}
        handleAttackClick={mockHandleAttackClick}
      />
    );

    const firstItem = screen.getByText(mockAttacks[0].name);

    fireEvent.click(firstItem);

    expect(mockHandleAttackClick).toHaveBeenCalledTimes(1);
    expect(mockHandleAttackClick).toHaveBeenCalledWith(mockAttacks[0]);
  });

  it("should not break if no attacks are provided", () => {
    render(
      <AttacksList attacks={[]} handleAttackClick={mockHandleAttackClick} />
    );

    expect(screen.queryByText(/of damage/)).not.toBeInTheDocument();
  });
});
