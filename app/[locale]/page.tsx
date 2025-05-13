// Components
import { InvoiceMain } from "@/app/components";
import Link from "next/link";

export default function Home() {
  return (
    <main className="py-10 ">
      <Link href="/invoice">Invoice</Link>
    </main>
  );
}
