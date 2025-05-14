// Components
import { InvoiceMain } from "@/app/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 ">
      <Link href="/invoice" className="px-2 py-1 rounded-lg bg-blue-50">
        To Invoice
      </Link>
    </main>
  );
}
