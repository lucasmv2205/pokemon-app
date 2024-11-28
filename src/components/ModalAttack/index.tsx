import { AttackType } from "@/types";

interface ModalAttackProps {
  attack: AttackType;
  handleCloseModal: () => void;
}

export const ModalAttack = ({ attack, handleCloseModal }: ModalAttackProps) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-4">{attack.name}</h2>
        <p className="mb-2">
          <strong>Damage:</strong> {attack.damage || "N/A"}
        </p>
        <p className="mb-2">
          <strong>Cost:</strong> {attack.cost ? attack.cost.join(", ") : "N/A"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {attack.text || "No description available."}
        </p>
      </div>
    </div>
  );
};
