import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 dark:from-green-900 dark:via-black dark:to-green-800">
      <main className="flex-1 flex items-center justify-center">
        <section className="text-center px-4">
          {/* Logo UNIPOL */}
          <Image
            src="/img/unipol.jpeg"
            alt="Logo UNIPOL"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />

          {/* Judul */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-green-700 dark:text-green-300">
            SIM Kepegawaian<br className="hidden md:inline" />
            <span className="text-green-600">Universitas Lamappapoleonro</span>
          </h1>

          {/* Deskripsi */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-4">
            Platform resmi Universitas Lamappapoleonro untuk pengelolaan data
            kepegawaian, absensi, dan cuti secara terintegrasi.
          </p>

          {/* Tombol Masuk */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 border-green-500 px-8 py-3"
              asChild
            >
              <Link href="/login">Masuk</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
