import { UserDocument } from "./utils/documents";

export interface Pegawai {
  
  nip: string;
  nama: string;
  gelarDepan?: string;
  gelarBelakang?: string;
  jenisKelamin: string;
  agama: string;
  golonganDarah?: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  noHandphone: string;
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

  // Dokumen-dokumen
  dokKtp?: UserDocument | null;
  dokPassport?: UserDocument | null;
  dokBpjsKesehatan?: UserDocument | null;
  dokBpjsTenagakerja?: UserDocument | null;
  dokSertifikasiDosen?: UserDocument | null;
  dokNidn?: UserDocument | null;

  imgUrl: string;
}

export interface KepangkatanRow {
  id: string;
  kepangkatan: string;
  noSK: string;
  tglSK: string;
  tmt: string;
  tglAkhirKontrak: string;
  jenisSK: string;
  gajiPokok: string|number;
  docId?: string;
  originalName?: string;
  dokumenSK?: string;
  mulaiMasaKerja: boolean;
}



export interface AnggotaKeluargaRow {
  id: string;
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
  /** ID dokumen yang dikirim backend */
  id: string;
  namaDokumen: string;
  url: string;    // tidak digunakan langsung untuk download
}

export interface RiwayatPendidikanRow {
  id: string;           // pendidikanId
  userId: string;
  pendidikan: string;
  namaInstitusi: string;
  tahunLulus: string;
  dokumen: DokumenRow[];
}

export interface JabatanFungsionalRow {
  id: string;
  jabatanFungsional: string;
  noSK: string;
  tglSK: string;     
  tmt: string;     
  jenis: string;    
  angkaKredit: number | string;
  originalName?: string;   
  dokumenSK?: string;     
}

export interface InpasingRow {
  id: string;
  kepangkatan: string;
  noSK: string;
  tglSK: string;    // misal format 'YYYY-MM-DD' atau 'DD MMMM YYYY'
  tmt: string;      // tanggal mulai tugas
  originalName?: string;  
  dokumenSK?: string; // URL atau path ke file SK
}

export interface JabatanStrukturalRow {
  id: string;
  jabatanStruktural: string;
  sk: string;
  periodeMenjabat: string;      // misal '2021–2024'
  skPemberhentian?: string;     // optional, jika sudah ada SK pemberhentian
  tmtPemberhentian?: string;    // optional
  tunjanganTetap: number | string;
  tunjanganVariable: number | string;
  originalName?: string; 
  dokumenSK?: string;           // URL atau path file SK
}

export interface PenempatanRow {
  id: string;
  unitKerja: string;
  noSK: string;
  tglSK: string;       // e.g. 'DD MMMM YYYY'
  tmt: string;      
  originalName?: string;    
  dokumenSK?: string;  // URL atau path file SK
}

export interface KendaraanRow {
  id: string;
  namaPemilik: string;
  noKendaraan: string;
  merek: string;
  jenis: string;
  originalName?: string;
  dokumen?: string;  // URL/path ke dokumen kendaraan
}




