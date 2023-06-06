import Image from "next/image";
import Link from "next/link";
import DefaultImage from "../assets/img/default-piece.jpg";

type Props = {
  title: string;
  sku: string;
  slug: string;
  description: string;
  composer: React.ReactNode;
  voicing: React.ReactNode;
};

const PieceRow = ({
  title,
  sku,
  slug,
  description,
  composer,
  voicing,
}: Props) => (
  <div className="mb-4 grid grid-cols-3 gap-4">
    <div className="col-span-2 grid grid-cols-4 gap-4">
      <Link href={slug}>
        <Image
          src={DefaultImage}
          width={100}
          height={100}
          className="w-full"
          alt=""
        />
      </Link>
      <Link href={slug} className="col-span-3">
        <div>{title}</div>
        <div className="text-xs text-gray-400">{sku}</div>
      </Link>
    </div>
    <div>{composer}</div>
    <div>{voicing}</div>
  </div>
);

export default PieceRow;
