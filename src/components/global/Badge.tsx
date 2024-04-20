type Props = {
  status: string;
};

export const Badge: React.FC<Props> = ({ status }: Props) => {
  let badgeColor: string;

  switch (status) {
    case "PENDING":
      badgeColor = "bg-purple-500";
      break;
    case "VALIDATED":
      badgeColor = "bg-green-500";
      break;
    case "CANCELED":
      badgeColor = "bg-gray-500";
      break;
    default:
      badgeColor = "bg-gray-500";
  }

  return <div className={`badge px-4 py-3.5 text-maravilhas-white-100 ${badgeColor}`}>{status}</div>;
};
