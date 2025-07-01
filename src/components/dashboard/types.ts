export interface Pegawai {
  nama: string;
  nip: string;
  jabatan: string;
  golongan: string;
  unit: string;
  status: string;
  email: string;
  foto: string;
}


export interface KepangkatanRow {
  kepangkatan: string;
  noSK: string;
  tglSK: string;
  tmt: string;
  tglAkhirKontrak: string;
  jenisSK: string;
  gajiPokok: string | number;
  dokumenSK?: string;
  mulaiMasaKerja: boolean;    // true = checkbox tercentang
}


export interface AnggotaKeluargaRow {
  nama: string;
  tempatLahir: string;
  agama: string;
  jenisKelamin: string;
  nik: string;
  pendidikan: string;
  hubunganKeluarga: string;
  tunjanganBeras: string | number;
  tunjanganKeluarga: string | number;
  potonganAsuransi: string | number;
  tanggunganPajak: string | number;
}

export interface DokumenRow {
  namaDokumen: string;
  url: string;      // URL/file path untuk download
}

export interface RiwayatPendidikanRow {
  pendidikan: string;
  namaInstitusi: string;
  tahunLulus: string;      // misal '2023'
  dokumen: DokumenRow[];   // daftar dokumen terkait ijazah, transkrip, dsb.
}

export interface JabatanFungsionalRow {
  jabatanFungsional: string;
  noSK: string;
  tglSK: string;      // format 'YYYY-MM-DD' atau sesuai kebutuhan
  tmt: string;        // Tanggal Mulai Tugas
  jenis: string;      // misal 'Kenaikan Pangkat', 'Penyesuaian Angka Kredit', dsb.
  angkaKredit: number | string;
  dokumenSK?: string; // URL/file path ke dokumen SK
}

export interface InpasingRow {
  kepangkatan: string;
  noSK: string;
  tglSK: string;    // misal format 'YYYY-MM-DD' atau 'DD MMMM YYYY'
  tmt: string;      // tanggal mulai tugas
  dokumenSK?: string; // URL atau path ke file SK
}



