import Link from "next/link";

type Props = {
  totalPages: number;
  page?: number;
  prefix?: string;
};

type Page = {
  number: string;
  path: string;
};

const Pagination = ({ totalPages, page = 1, prefix = "/catalogue" }: Props) => {
  const slugs = Array.from({ length: totalPages }, (_, index) => index);
  const paths =
    slugs.map(
      (s) =>
        ({
          number: `${s + 1}`,
          path: s == 0 ? prefix : `${prefix}/${s + 1}`,
        } as Page)
    ) || [];

  return (
    <div className="flex space-x-1">
      {paths.map((p) =>
        p.number === `${page}` ? (
          <div key={p.path} className="p-2 bg-orange-500 text-white">
            {p.number}
          </div>
        ) : (
          <Link
            className="p-2 hover:bg-orange-500 hover:text-white"
            key={p.path}
            href={p.path}
          >
            {p.number}
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
