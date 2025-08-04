'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';

interface UploadDokumenProps {
  userId: string;
  documentType:
  | 'KTP'
  | 'DocNIDN'
  | 'SertifikasiDosen'
  | 'Passport'
  | 'BPJSKesehatan'
  | 'BPJSKetenagakerjaan';
  label: string;
  existingUrl?: string; // jika sudah ada file sebelumnya
}

export function UploadDokumen({
  userId,
  documentType,
  label,
  existingUrl,
}: UploadDokumenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(existingUrl || '');

  const handleUpload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append('file', file);
    form.append('documentsType', documentType);

    setUploading(true);
    try {
      const res = await fetch(`${BASE_URL}/userinfo/documents/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: form,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || 'Gagal upload');
      }

      toast.success(`${label} berhasil diunggah`);
      setUploadedFileName(file.name);
      setEditMode(false);
      setFile(null);
    } catch (err: any) {
      toast.error(err.message || `Gagal upload ${label}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-between items-center text-sm border-b py-2">
      <span className="text-gray-500 font-medium">{label}:</span>
      {editMode ? (
        <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button
            variant="default"
            disabled={!file || uploading}
            onClick={handleUpload}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {uploadedFileName ? (
            <a
              href={`${process.env.NEXT_PUBLIC_DOMAIN}/${uploadedFileName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              {uploadedFileName.split('/').pop()}
            </a>
          ) : (
            <span className="text-gray-400 italic">Belum ada file</span>
          )}
          <Upload
            className="w-4 h-4 text-blue-500 cursor-pointer"
            onClick={() => setEditMode(true)}
          />
        </div>
      )}
    </div>
  );
}
