import Link from "next/link";
import ProductsTable from "@/components/tabledata";

export default function Home() {
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold">Next.js 14 Laravel 11 CRUD with Upload and Pagination <br/>(Create, Read, Update and Delete) Mysql | TailwindCSS DaisyUI</h1>
      </div>    
      <div className="overflow-x-auto">
          <div className="mb-2 w-full text-right">
            <Link
              href="/product/create"
              className="btn btn-primary">
              Add New Product
            </Link>
          </div>
          <ProductsTable/>
      </div>  
    </div>
  );
}
