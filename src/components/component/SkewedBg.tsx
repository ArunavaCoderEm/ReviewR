import { itemsProps } from "@/Types/types";
import { FC } from "react";

const SkewedInfiniteScroll: FC = () => {
  const items: itemsProps[] = [
    { id: "1", name: "John Doe", review: "Great service and very responsive!" },
    {
      id: "2",
      name: "Jane Smith",
      review: "Loved the experience, will recommend!",
    },
    {
      id: "3",
      name: "Alice Johnson",
      review: "A reliable platform for all my needs.",
    },
    {
      id: "4",
      name: "Michael Brown",
      review: "Customer support was very helpful.",
    },
    {
      id: "5",
      name: "Emily Davis",
      review: "Quick and easy to use, highly satisfied.",
    },
    {
      id: "6",
      name: "Robert Wilson",
      review: "Affordable and efficient solutions.",
    },
    {
      id: "7",
      name: "Sophia Martinez",
      review: "Exceeded my expectations, fantastic!",
    },
    {
      id: "8",
      name: "Daniel Garcia",
      review: "Smooth process and great results!",
    },
  ];

  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      <div
        className="relative w-full max-w-screen-lg overflow-hidden"
        style={{
          maskComposite: "intersect",
          maskImage: `
          linear-gradient(to right,  transparent, black 5rem),
          linear-gradient(to left,   transparent, black 5rem),
          linear-gradient(to bottom, transparent, black 5rem),
          linear-gradient(to top,    transparent, black 5rem)
        `,
        }}
      >
        <div className="mx-auto opacity-45 grid h-[350px] w-[400px] animate-skew-scroll grid-cols-1 gap-5 sm:w-[600px] sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-100 px-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl dark:border-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 flex-none text-teal-500"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div className="flex flex-col items-center justify-start">
                <p className="text-teal-600 text-sm">{item.name}</p>
                <p className="text-gray-600">{item.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkewedInfiniteScroll;
