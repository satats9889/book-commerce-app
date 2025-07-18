import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookType } from "../type/type";

type purchaseDetailBookProps = {
    purchaseDetailBook: BookType
}

const PurchaseDetailBook = ({purchaseDetailBook}: purchaseDetailBookProps ) => {
  return (
    <Link
      href={`/book/`}
      className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
    >
      <Image
        priority
        src={purchaseDetailBook.thumbnail.url}
        alt={purchaseDetailBook.title}
        width={450}
        height={350}
        className="rounded-t-md"
      />
      <div className="px-4 py-4 bg-slate-100 rounded-b-md">
        <h2 className="text-lg font-semibold">{purchaseDetailBook.title}</h2>
        {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
        <p className="mt-2 text-md text-slate-700">値段：{purchaseDetailBook.price}円</p>
      </div>
    </Link>
  );
};

export default PurchaseDetailBook;