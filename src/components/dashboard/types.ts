export interface Pegawai {
  nip: string;
  nama: string;
  gelarDepan?: string;
  gelarBelakang?: string;
  jenisKelamin: string;
  agama: string;
  golonganDarah?: string;
  tempatLahir: string;
  tanggalLahir: string;       // misal 'DD MMMM YYYY'
  alamat: string;
  noHandphone: string;
  nbm?: string;
  nidn?: string;
  nidk?: string;
  nuptk?: string;
  idScholar?: string;
  idScopus?: string;
  idShinta?: string;
  idGaruda?: string;
  npwp?: string;
  emailPribadi: string;
  emailUniversitas: string;
  nikKependudukan: string;
  jabatanStruktural?: string;
  jabatanFungsional?: string;
  dokKtp?: string;
  dokNbm?: string;
  dokPassport?: string;
  dokBpjsKesehatan?: string;
  dokBpjsTenagakerja?: string;
  dokSertifikasiDosen?: string;
  dokNidn?: string;
  imgUrl: string;
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

export interface JabatanStrukturalRow {
  jabatanStruktural: string;
  sk: string;
  periodeMenjabat: string;      // misal '2021–2024'
  skPemberhentian?: string;     // optional, jika sudah ada SK pemberhentian
  tmtPemberhentian?: string;    // optional
  tunjanganTetap: number | string;
  tunjanganVariable: number | string;
  dokumenSK?: string;           // URL atau path file SK
}

export interface PenempatanRow {
  unitKerja: string;
  noSK: string;
  tglSK: string;       // e.g. 'DD MMMM YYYY'
  tmt: string;         // tanggal mulai tugas
  dokumenSK?: string;  // URL atau path file SK
}

export interface KendaraanRow {
  namaPemilik: string;
  noKendaraan: string;
  merek: string;
  jenis: string;
  dokumen?: string;  // URL/path ke dokumen kendaraan
}




