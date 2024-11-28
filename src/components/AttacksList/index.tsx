import { AttackType } from "@/types";

interface AttacksListProps {
  attacks: AttackType[];
  handleAttackClick: (attack: AttackType) => void;
}

const AttacksList = ({ attacks, handleAttackClick }: AttacksListProps) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Attacks:</h3>
      <ul className="list-disc pl-5">
        {attacks.map((attack, index) => (
          <li
            key={index}
            className="cursor-pointer hover:underline"
            data-cy="attack-item"
            onClick={() => handleAttackClick(attack)}
          >
            <strong>{attack.name}</strong> - {attack.damage} of damage
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttacksList;
