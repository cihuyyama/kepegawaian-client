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

export interface AbsensiRow {
  tanggal: string;
  masuk: string;
  pulang: string;
}

export interface CutiRow {
  jenis: string;
  mulai: string;
  sampai: string;
  status: string;
}

export interface GajiRow {
  bulan: string;
  pokok: string;
  tunjangan: string;
}
