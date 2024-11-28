import { AttackType } from "@/types";
import { useTranslation } from "react-i18next";

interface AttacksListProps {
  attacks: AttackType[];
  handleAttackClick: (attack: AttackType) => void;
}

const AttacksList = ({ attacks, handleAttackClick }: AttacksListProps) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">{t("pokemon.attacks")}:</h3>
      <ul className="list-disc pl-5">
        {attacks.map((attack, index) => (
          <li
            key={index}
            className="cursor-pointer hover:underline"
            data-cy="attack-item"
            onClick={() => handleAttackClick(attack)}
          >
            <strong>{attack.name}</strong> - {attack.damage} {t("of")}{" "}
            {t("pokemon.damage")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttacksList;
