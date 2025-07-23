// src/utils/documents.ts
import { BASE_URL } from '@/constant/BaseURL';

export type DocumentType =
  | 'KTP'
  | 'DocNBM'
  | 'DocNIDN'
  | 'SertifikasiDosen'
  | 'Passport'
  | 'BPJSKesehatan'
  | 'BPJSKetenagakerjaan';

export interface UserDocument {
  url: string;         // endpoint stream
  originalName: string;
  filename: string;
  type: DocumentType;
}

/**
 * Membangun info dokumen dari object API (bisa null).
 */
export const buildDoc = (
  userId: string,
  type: DocumentType,
  raw: any
): UserDocument | null => {
  if (!raw) return null;
  return {
    url: `${BASE_URL}/userinfo/documents/${userId}/${type}`,
    originalName: raw.originalName ?? raw.filename ?? type,
    filename: raw.filename ?? type,
    type
  };
};
