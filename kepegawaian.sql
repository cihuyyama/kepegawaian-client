-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 05, 2025 at 03:07 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kepegawaian`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota_keluarga`
--

CREATE TABLE `anggota_keluarga` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempat_lahir` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agama` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_kelamin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nik` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pendidikan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hubungan_keluarga` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tunjangan_beras` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tunjangan_keluarga` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `potongan_asuransi` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggungan_pajak` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dokumen_riwayat_pendidikan`
--

CREATE TABLE `dokumen_riwayat_pendidikan` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `riwayat_pendidikan_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `nama_dokumen` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filename` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `originalName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mimetype` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `extension` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `user_ktp_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_doc_nbm_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_passport_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_doc_bpjs_kesehatan_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_doc_bpjs_ketenagakerjaan_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_doc_sertifikasi_dosen_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_doc_nidn_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_photo_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `filename`, `originalName`, `path`, `mimetype`, `size`, `extension`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `user_ktp_id`, `user_doc_nbm_id`, `user_passport_id`, `user_doc_bpjs_kesehatan_id`, `user_doc_bpjs_ketenagakerjaan_id`, `user_doc_sertifikasi_dosen_id`, `user_doc_nidn_id`, `user_photo_id`) VALUES
('cmdd59ase00067kaslv6bq5au', '1753104672732-cv.pdf', 'CV.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753104672732-cv.pdf', 'application/pdf', 202129, '.pdf', NULL, '2025-07-21 13:31:12.734', '2025-07-21 13:31:12.736', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdd5k0uk00087kas7br75p8h', '1753105173054-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753105173054-naufal_rozan_cv_id.pdf', 'application/pdf', 81520, '.pdf', NULL, '2025-07-21 13:39:33.069', '2025-07-21 13:39:33.085', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdd5kmug000a7kas2jrv5ltb', '1753105201574-cv.pdf', 'CV.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753105201574-cv.pdf', 'application/pdf', 202129, '.pdf', NULL, '2025-07-21 13:40:01.577', '2025-07-21 13:40:01.590', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdd64exv00007kc4hh9fdhdc', '1753106124447-cv.pdf', 'CV.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753106124447-cv.pdf', 'application/pdf', 202129, '.pdf', NULL, '2025-07-21 13:55:24.452', '2025-07-21 13:55:24.475', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdfh76lg00007kbktmpzlv7q', '1753245661668-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753245661668-naufal_rozan_cv_id.pdf', 'application/pdf', 81520, '.pdf', NULL, '2025-07-23 04:41:01.731', '2025-07-23 04:41:01.779', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdfwtywp00117k9cl3x9ai7i', '1753271919002-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753271919002-naufal_rozan_cv_id.pdf', 'application/pdf', 81520, '.pdf', NULL, '2025-07-23 11:58:39.089', '2025-07-23 11:58:39.100', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdfx0n8v00137k9cza5ux4b8', '1753272230573-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753272230573-naufal_rozan_cv_id.pdf', 'application/pdf', 81520, '.pdf', NULL, '2025-07-23 12:03:50.576', '2025-07-23 12:03:50.577', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdfy5f7v001c7k9c0k3jrs10', '1753274133065-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753274133065-naufal_rozan_cv_id.pdf', 'application/pdf', 81520, '.pdf', NULL, '2025-07-23 12:35:33.067', '2025-07-23 12:35:33.070', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdfy7xrr001g7k9cxnljbr7i', '1753274250420-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurwahyu.alamsyah@umy.ac.id\\1753274250420-naufal_rozan_cv_id.pdf', 'application/pdf', 81520, '.pdf', NULL, '2025-07-23 12:37:30.423', '2025-07-23 12:37:30.425', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdih4gj200027kx8bacnolmt', '1753426932640-cv.pdf', 'CV.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753426932640-cv.pdf', 'application/pdf', 202129, '.pdf', NULL, '2025-07-25 07:02:13.166', '2025-07-25 07:02:13.166', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdihs2s7000v7kx8qcvfo3gl', '1753428035083-cv.pdf', 'CV.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753428035083-cv.pdf', 'application/pdf', 202129, '.pdf', NULL, '2025-07-25 07:20:35.095', '2025-07-25 07:20:35.095', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdiikkue00127kx8oobcepch', '1753429364857-cv.pdf', 'CV.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753429364857-cv.pdf', 'application/pdf', 202129, '.pdf', NULL, '2025-07-25 07:42:44.870', '2025-07-25 07:42:44.870', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdiipjba001f7kx88o7gwtf7', '1753429596153-cv.pdf', 'CV.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753429596153-cv.pdf', 'application/pdf', 202129, '.pdf', NULL, '2025-07-25 07:46:36.166', '2025-07-25 07:46:36.166', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdiju4p2001s7kx8hx80oiyb', '1753431490104-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753431490104-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-07-25 08:18:10.118', '2025-07-25 08:18:10.118', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdijvxwd000g7k6sw7aiqngv', '1753431574525-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753431574525-naufal_rozan_cv_id.pdf', 'application/pdf', 73733, '.pdf', NULL, '2025-07-25 08:19:34.622', '2025-07-25 08:19:34.622', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdijvyhj000j7k6so2ue22ua', '1753431575371-naufal_rozan_cv_id.pdf', 'NAUFAL ROZAN-CV-ID.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753431575371-naufal_rozan_cv_id.pdf', 'application/pdf', 73733, '.pdf', NULL, '2025-07-25 08:19:35.383', '2025-07-25 08:19:35.383', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdijwiys000m7k6sfwhg7biz', '1753431601912-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753431601912-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-07-25 08:20:01.925', '2025-07-25 08:20:01.925', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdmo5b7z000d7khsmaj6dsy6', '1753680594820-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kepangkatan\\cmctaayda00027khclgu7nm5v\\1753680594820-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-07-28 05:29:54.959', '2025-07-28 05:29:54.959', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdqunnxv00027k9gw66hdndo', '1753933393227-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\jabatan-fungsional\\cmctaayda00027khclgu7nm5v\\1753933393227-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-07-31 03:43:13.611', '2025-07-31 03:43:13.611', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdqv5gk200057k9gmtlch7wg', '1753934223878-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\jabatan-fungsional\\cmctaayda00027khclgu7nm5v\\1753934223878-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-07-31 03:57:03.891', '2025-07-31 03:57:03.891', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtlvzi600047kww6kcapbsg', '1754100063854-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\jabatan-fungsional\\cmctaayda00027khclgu7nm5v\\1754100063854-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 02:01:03.859', '2025-08-02 02:01:03.859', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdto8ahp00017kooi5xrt82v', '1754103997138-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\inpasing\\[object Object]\\1754103997138-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 03:06:37.167', '2025-08-02 03:06:37.167', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtpoeeo00077knwjgrxsiqu', '1754106428397-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\inpasing\\[object Object]\\1754106428397-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 03:47:08.400', '2025-08-02 03:47:08.400', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtq230m00017kochs3w7ivm', '1754107066818-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\inpasing\\[object Object]\\1754107066818-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 03:57:46.822', '2025-08-02 03:57:46.822', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtql5xq000x7kocgbcvm6im', '1754107957068-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\jabatan-struktural\\[object Object]\\1754107957068-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 04:12:37.070', '2025-08-02 04:12:37.070', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtqmgyh000z7kocwyetjgd7', '1754108018006-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\jabatan-struktural\\[object Object]\\1754108018006-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 04:13:38.008', '2025-08-02 04:13:38.008', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtqrbzv00117koc4au0u0an', '1754108244857-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\jabatan-struktural\\[object Object]\\1754108244857-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 04:17:24.859', '2025-08-02 04:17:24.859', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtrinkf00017k9outr5rktr', '1754109519564-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmctaayda00027khclgu7nm5v\\1754109519564-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 04:38:39.568', '2025-08-02 04:38:39.568', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtru43l00037k9oyt1w2b5j', '1754110054207-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\penempatan\\cmctaayda00027khclgu7nm5v\\1754110054207-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 04:47:34.209', '2025-08-02 04:47:34.209', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtrwky000057k9obzg9zdij', '1754110169350-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\penempatan\\cmctaayda00027khclgu7nm5v\\1754110169350-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 04:49:29.353', '2025-08-02 04:49:29.353', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtstoqz00017k7omknh77tm', '1754111713929-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\kendaraan\\cmctaayda00027khclgu7nm5v\\1754111713929-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 05:15:13.931', '2025-08-02 05:15:13.931', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdtvj1yc000m7kew9dfxg9o2', '1754116256640-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\jabatan-fungsional\\cmctaayda00027khclgu7nm5v\\1754116256640-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-02 06:30:56.676', '2025-08-02 06:30:56.676', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwv72p300097kxcou4bnsbv', '1754297117668-andi_zul_300x225.jpg', 'ANDI-ZUL-300x225.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\andizulfikar@unipol.ac.id\\1754297117668-andi_zul_300x225.jpg', 'image/jpeg', 5293, '.jpg', NULL, '2025-08-04 08:44:56.294', '2025-08-04 08:45:17.670', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdwv68ov00077kxc03jk4wjn'),
('cmdwvu4q800127kxcldm71ob1', '1754298172014-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754298172014-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 09:02:52.016', '2025-08-04 09:02:52.016', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwwcb2f00157kxcp3s20mbx', '1754299020037-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754299020037-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 09:17:00.040', '2025-08-04 09:17:00.040', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwwgowm001c7kxc4d3l2qp3', '1754299224596-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754299224596-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 09:20:24.598', '2025-08-04 09:20:24.598', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwwj944001g7kxch25hyr8v', '1754299344096-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754299344096-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 09:22:24.101', '2025-08-04 09:22:24.101', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwwl4e0001o7kxcf653on6k', '1754299431286-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754299431286-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 09:23:51.289', '2025-08-04 09:23:51.289', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwxvyid00017kvwj7isvebp', '1754301616466-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754301616466-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 10:00:16.468', '2025-08-04 10:00:16.468', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwxxc5400087kvwbul2ypbc', '1754301680821-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754301680821-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 10:01:20.824', '2025-08-04 10:01:20.824', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx0kp5q00027kuc8yg1cosx', '1754306130011-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754306130011-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 11:15:30.014', '2025-08-04 11:15:30.014', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx0kwos00047kucxzmsq5gv', '1754306139770-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754306139770-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 11:15:39.772', '2025-08-04 11:15:39.772', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx0l4n000067kuc1n18fo43', '1754306150074-dummy_pdf_2.pdf', 'dummy-pdf_2.pdf', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754306150074-dummy_pdf_2.pdf', 'application/pdf', 7478, '.pdf', NULL, '2025-08-04 11:15:50.076', '2025-08-04 11:15:50.076', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx0pu3p000b7kuco9o7ej1z', '1754306369698-andi_irfan_208x300.jpg', 'ANDI-IRFAN-208x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\AndiIrfan@unipol.ac.id\\1754306369698-andi_irfan_208x300.jpg', 'image/jpeg', 41652, '.jpg', NULL, '2025-08-04 11:19:29.701', '2025-08-04 11:19:29.701', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx0pe9t00097kuco7htuuim'),
('cmdx0sj4o000o7kucjev72szw', '1754306495445-nursakti_214x300.jpg', 'NURSAKTI-214x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nursakti@unipol.ac.id\\1754306495445-nursakti_214x300.jpg', 'image/jpeg', 16006, '.jpg', NULL, '2025-08-04 11:21:35.448', '2025-08-04 11:21:35.448', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx0rxrj000i7kucwtc6af7r'),
('cmdx0tx3x000q7kucsmh4jbkw', '1754306560220-nursakti_214x300.jpg', 'NURSAKTI-214x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdx0pe9t00097kuco7htuuim\\1754306560220-nursakti_214x300.jpg', 'image/jpeg', 16006, '.jpg', NULL, '2025-08-04 11:22:40.222', '2025-08-04 11:22:40.222', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx13hna000x7kucu6b6tzq9', '1754307006739-img_20231003_wa0035.jpg', 'IMG-20231003-WA0035.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\nurulazmy@unipo.ac.id\\1754307006739-img_20231003_wa0035.jpg', 'image/jpeg', 48467, '.jpg', NULL, '2025-08-04 11:30:06.742', '2025-08-04 11:30:06.742', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx12n33000r7kuc5aaznia7'),
('cmdx14ik300107kuclon368fm', '1754307054577-irfandi_258x300.jpg', 'Irfandi-258x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\irfandi@unipo.ac.id\\1754307054577-irfandi_258x300.jpg', 'image/jpeg', 10970, '.jpg', NULL, '2025-08-04 11:30:54.579', '2025-08-04 11:30:54.579', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx14a20000y7kuc2suhkgh4'),
('cmdx164yn00177kucrqsmlvu7', '1754307130269-evi_alfianti_200x300.jpg', 'evi-alfianti-200x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\evialfianti@unipol.ac.id\\1754307130269-evi_alfianti_200x300.jpg', 'image/jpeg', 5521, '.jpg', NULL, '2025-08-04 11:32:10.271', '2025-08-04 11:32:10.271', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx15hzx00157kuc03t25xeu'),
('cmdx1djnu001e7kuc5g0chsnu', '1754307475911-img_20231003_wa0037_203x300.jpg', 'IMG-20231003-WA0037-203x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\humairahannisa@unipol.ac.id\\1754307475911-img_20231003_wa0037_203x300.jpg', 'image/jpeg', 5670, '.jpg', NULL, '2025-08-04 11:37:55.914', '2025-08-04 11:37:55.914', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx1cuqa001c7kuc96zjpnpv'),
('cmdx1f6ej001n7kuccbuu2l2h', '1754307552041-3x4.png', '3x4.png', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\agus@unipol.ac.id\\1754307552041-3x4.png', 'image/png', 351588, '.png', NULL, '2025-08-04 11:39:12.043', '2025-08-04 11:39:12.043', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx1eblv001j7kuckkabq3by'),
('cmdx1ftc6001q7kucsm5h6pt6', '1754307581764-whatsapp_image_2023_11_09_at_09.41.44.jpeg', 'WhatsApp-Image-2023-11-09-at-09.41.44.jpeg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\images\\users\\fitriyanti@unipol.ac.id\\1754307581764-whatsapp_image_2023_11_09_at_09.41.44.jpeg', 'image/jpeg', 12916, '.jpeg', NULL, '2025-08-04 11:39:41.766', '2025-08-04 11:39:41.766', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cmdx1erya001l7kucrsem928x'),
('cmdx2h9gy001y7kuc33edff1r', '1754309328944-img_20231003_wa0037_203x300.jpg', 'IMG-20231003-WA0037-203x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdx0pe9t00097kuco7htuuim\\1754309328944-img_20231003_wa0037_203x300.jpg', 'image/jpeg', 5670, '.jpg', NULL, '2025-08-04 12:08:48.946', '2025-08-04 12:08:48.946', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx2or0n00207kuck0ilpke7', '1754309678277-andi_zul_300x225.jpg', 'ANDI-ZUL-300x225.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdwv68ov00077kxc03jk4wjn\\1754309678277-andi_zul_300x225.jpg', 'image/jpeg', 5293, '.jpg', NULL, '2025-08-04 12:14:38.280', '2025-08-04 12:14:38.280', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx2vdb800227kucwf877f1l', '1754309987107-andi_irfan_208x300.jpg', 'ANDI-IRFAN-208x300.jpg', 'D:\\Project\\JogajCode\\Kepegawaian\\kepegawaian-server\\public\\dokumen\\riwayat-pendidikan\\cmdx0pe9t00097kuco7htuuim\\1754309987107-andi_irfan_208x300.jpg', 'image/jpeg', 41652, '.jpg', NULL, '2025-08-04 12:19:47.109', '2025-08-04 12:19:47.109', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `inpasing`
--

CREATE TABLE `inpasing` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_sk_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kepangkatan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_sk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_sk` datetime(3) DEFAULT NULL,
  `tmt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jabatan_fungsional`
--

CREATE TABLE `jabatan_fungsional` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_sk_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jabatanFungsional` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_sk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_sk` datetime(3) DEFAULT NULL,
  `tmt` datetime(3) DEFAULT NULL,
  `jenis` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `angka_kredit` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jabatan_struktural`
--

CREATE TABLE `jabatan_struktural` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_sk_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `namaJabatan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_sk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `periode_menjabat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sk_pemberhentian` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tmt_pemberhentian` datetime(3) DEFAULT NULL,
  `tunjangan_tetap` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tunjangan_variabel` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kendaraan`
--

CREATE TABLE `kendaraan` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_pemilik` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_kendaraan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `merek` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kepangkatan`
--

CREATE TABLE `kepangkatan` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_sk_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_sk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_sk` datetime(3) DEFAULT NULL,
  `tmt` datetime(3) DEFAULT NULL,
  `tanggal_akhir_kontrak` datetime(3) DEFAULT NULL,
  `jenis_sk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gaji_pokok` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penempatan`
--

CREATE TABLE `penempatan` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dokumen_sk_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_kerja` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_sk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_sk` datetime(3) DEFAULT NULL,
  `tmt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_pendidikan`
--

CREATE TABLE `riwayat_pendidikan` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pendidikan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_institusi` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tahun_lulus` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `riwayat_pendidikan`
--

INSERT INTO `riwayat_pendidikan` (`id`, `user_id`, `pendidikan`, `nama_institusi`, `tahun_lulus`, `createdAt`, `updatedAt`) VALUES
('cmdx0mr9m00087kuchedot0f4', 'cmdwv68ov00077kxc03jk4wjn', 'Magister Komputer	', 'STMIK Handayani Makassar', 2019, '2025-08-04 11:17:06.058', '2025-08-04 11:17:06.058'),
('cmdx0qtut000g7kucvk5jxl3n', 'cmdx0pe9t00097kuco7htuuim', 'Sarjana Komputer	', 'Sekolah Tinggi Manajemen Informatika Komputer Lamappapoleonro Soppeng', 2009, '2025-08-04 11:20:15.948', '2025-08-04 11:20:15.948'),
('cmdx0r810000h7kucujfxvouf', 'cmdx0pe9t00097kuco7htuuim', 'Magister Komputer', 'STMIK Handayani Makassar', 2017, '2025-08-04 11:20:34.404', '2025-08-04 11:20:34.404');

-- --------------------------------------------------------

--
-- Table structure for table `unit_kerja`
--

CREATE TABLE `unit_kerja` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kepalaUnitKerjaId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `unit_kerja`
--

INSERT INTO `unit_kerja` (`id`, `name`, `kepalaUnitKerjaId`, `createdAt`, `updatedAt`) VALUES
('cmdwuow8u00027kxcr0pg9k34', 'Teknik Informatika', 'cmdwv68ov00077kxc03jk4wjn', '2025-08-04 08:30:48.127', '2025-08-04 11:26:36.248'),
('cmdwup0su00037kxco57nhoq7', 'PGSD', 'cmdx12n33000r7kuc5aaznia7', '2025-08-04 08:30:54.030', '2025-08-04 11:32:42.159'),
('cmdwup4pl00047kxc84zilqsa', 'Teknik Sipil', 'cmdx1cuqa001c7kuc96zjpnpv', '2025-08-04 08:30:59.097', '2025-08-04 11:40:58.851');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `img_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `salt`, `username`, `role`, `img_url`, `isActive`, `createdAt`, `updatedAt`) VALUES
('cmdwur1jh00057kxczc189oy1', 'rezkyingki@unipol.ac.id', '52ea69eaecadbd1e64357583e696f4801f47b22d9ff4baff6248a2d74f2865a02218a9dc7641c3af3276a2c430f3ca36b0cc1c77ef45c89d39d63b3f022bc62f', 'c304b2740456d4510567e3c391669388', 'Rezky Ingki', 'admin', NULL, 1, '2025-08-04 08:32:28.302', '2025-08-04 12:24:44.899'),
('cmdwv68ov00077kxc03jk4wjn', 'andizulfikar@unipol.ac.id', '707672104976fc8fba0e91d9b55a2d6c659a558ba9b7ac35b67f840a2cfaab407e51d9f48d81ae69077150faa5e0917b4451b4aa70c3f3c9e13814efd763f8b9', 'bfd93852033b00678036eca85b78b95c', 'Andi Zulkifli Nusri', 'kaprodi', 'api/v1/users/cmdwv68ov00077kxc03jk4wjn/photo', 1, '2025-08-04 08:44:17.038', '2025-08-04 11:41:50.923'),
('cmdx0pe9t00097kuco7htuuim', 'AndiIrfan@unipol.ac.id', 'c38a05fe686e87d60f92a3b5e69f63a54aa65dbe649e4c6d3e21b2e055128ec1b708a38c5f91ea72784c8cd9d2ae8fcf05344bee6dc7e7e9b1d74ac1492d0f5e', '2ab9338ae71dcbef2109965046b92bc8', 'Andi Irfan', 'dosen', 'api/v1/users/cmdx0pe9t00097kuco7htuuim/photo', 1, '2025-08-04 11:19:09.185', '2025-08-04 11:19:29.701'),
('cmdx0rxrj000i7kucwtc6af7r', 'nursakti@unipol.ac.id', 'd0f16f4d9cd4cf0388bc6076201b361e3da1b984ebd87c59ab51c67c3c6d2b28630a139fc83f98ee79bfa245bcf8711f6d2780f86fbcc5483b4e34f3ec193263', 'e52643100a1397a330da58d0830b8567', 'NURSAKTI', 'dosen', 'api/v1/users/cmdx0rxrj000i7kucwtc6af7r/photo', 1, '2025-08-04 11:21:07.759', '2025-08-04 11:21:35.448'),
('cmdx12n33000r7kuc5aaznia7', 'nurulazmy@unipo.ac.id', 'f0c3ea7d9e7c246fa298ba46a751b9d98eb4042ad11b79c05d64798bd60839a4dc801ad23518e0ebda17c4385d2857d93adc371a3c672349cb856f1eac2dc00d', 'c5f01d2ebf3d4d073baf3703aedaabcc', 'NURUL AZMY RUSTAN', 'kaprodi', 'api/v1/users/cmdx12n33000r7kuc5aaznia7/photo', 1, '2025-08-04 11:29:27.135', '2025-08-04 11:30:06.742'),
('cmdx14a20000y7kuc2suhkgh4', 'irfandi@unipo.ac.id', '96b6b29208d29c0596fa40c796e73748d650ae24a3d2b55113f96f08a66326d6916d745f48854e0729cb28ab68716c930613bd8e8bae7735f5ed3ed7484eb0bd', '3cb2d1f60098a3131562cd18e88781ef', 'IRFANDI', 'dosen', 'api/v1/users/cmdx14a20000y7kuc2suhkgh4/photo', 1, '2025-08-04 11:30:43.560', '2025-08-04 11:30:54.579'),
('cmdx15hzx00157kuc03t25xeu', 'evialfianti@unipol.ac.id', '9497837191efd85437de1b1c31533021cccfdef21293fdd14e3eceb96af8973da9bc7c68e181cce31f55f96b6271f8dcb06fe8e1e3bc4e0d85a0d7031bf168df', '742dcb77077b8cf2a11f1624b9c74be5', 'EVI ALFIANTI', 'dosen', 'api/v1/users/cmdx15hzx00157kuc03t25xeu/photo', 1, '2025-08-04 11:31:40.509', '2025-08-04 11:32:10.271'),
('cmdx1cuqa001c7kuc96zjpnpv', 'humairahannisa@unipol.ac.id', 'ea8a232c30e5d1731abf8f7c5fa5118e24430dcecd0ba72c4463cdf61d5adae111f56c1e9f3f5cb59736ebf6fa64180b2fb9d127adf43ca571db18990a90a879', 'f9478348204da6d03c37173269aa3e73', 'HUMAIRAH ANNISA', 'kaprodi', 'api/v1/users/cmdx1cuqa001c7kuc96zjpnpv/photo', 1, '2025-08-04 11:37:23.602', '2025-08-04 11:37:55.914'),
('cmdx1eblv001j7kuckkabq3by', 'agus@unipol.ac.id', '808f2bb0497394a0583d9c3482f4c534ab2a0d4b5020f445fad782d47d523b71902c52c590562ff8ca065e62164fcf12b0d0fbabbb858ae334185b8c907da3f2', '0a9f8a083e142b7a2d8157672cfcbe88', 'AGUS', 'dosen', 'api/v1/users/cmdx1eblv001j7kuckkabq3by/photo', 1, '2025-08-04 11:38:32.131', '2025-08-04 11:39:12.043'),
('cmdx1erya001l7kucrsem928x', 'fitriyanti@unipol.ac.id', 'fcb8260f38b250d9cab03ee568dda0609815bd73105b7acbb3f7ab059befc0d5e07eee499edb3fa4fe89c2d9e074f0bf74370808f1ea7b61e3086bdfb3443167', '50f09146a5122ac3451e3923049408c4', 'FITRIYANTI', 'dosen', 'api/v1/users/cmdx1erya001l7kucrsem928x/photo', 1, '2025-08-04 11:38:53.314', '2025-08-04 11:39:41.766');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NIP` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gelar_depan` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gelar_belakang` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_kelamin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tempat_lahir` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` datetime(3) DEFAULT NULL,
  `Alamat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nbm` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nidn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nidk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nuptk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_scholar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_scopus` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_shinta` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_garuda` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `npwp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nik` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jabatan_struktural` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jabatan_fungsional` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `userId`, `NIP`, `gelar_depan`, `gelar_belakang`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `Alamat`, `Phone`, `nbm`, `nidn`, `nidk`, `nuptk`, `id_scholar`, `id_scopus`, `id_shinta`, `id_garuda`, `npwp`, `nik`, `jabatan_struktural`, `jabatan_fungsional`, `work_email`) VALUES
('cmdwur1ji00067kxcjwrklbld', 'cmdwur1jh00057kxczc189oy1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdwv68ov00087kxcwkvlf898', 'cmdwv68ov00077kxc03jk4wjn', NULL, '', ' S.Kom.,M.Kom', 'L', NULL, NULL, NULL, '08', NULL, '0927048702', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Asisten Ahli', NULL),
('cmdx0pe9t000a7kuci441jwkh', 'cmdx0pe9t00097kuco7htuuim', '1232144324', NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, '0916088402', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Lektor', NULL),
('cmdx0rxrj000j7kucb7biiy3i', 'cmdx0rxrj000i7kucwtc6af7r', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, '0901108504', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Lektor', NULL),
('cmdx12n33000s7kuckspdxv9i', 'cmdx12n33000r7kuc5aaznia7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, '0911019403', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Asisten Ahli', NULL),
('cmdx14a20000z7kucpg3llksk', 'cmdx14a20000y7kuc2suhkgh4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, '0917039402', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Asisten Ahli', NULL),
('cmdx15hzx00167kucdkb2159b', 'cmdx15hzx00157kuc03t25xeu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, '0920049401', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Asisten Ahli', NULL),
('cmdx1cuqa001d7kucqs8elrt9', 'cmdx1cuqa001c7kuc96zjpnpv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, '0927039601', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Asisten Ahli', NULL),
('cmdx1eblv001k7kuczmnk3jzb', 'cmdx1eblv001j7kuckkabq3by', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, '0929077801', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmdx1erya001m7kuc8xopn8sy', 'cmdx1erya001l7kucrsem928x', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '08', NULL, 'FITRIYANTI', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Asisten Ahli', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `_userunitkerja`
--

CREATE TABLE `_userunitkerja` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_userunitkerja`
--

INSERT INTO `_userunitkerja` (`A`, `B`) VALUES
('cmdwuow8u00027kxcr0pg9k34', 'cmdwv68ov00077kxc03jk4wjn'),
('cmdwuow8u00027kxcr0pg9k34', 'cmdx0pe9t00097kuco7htuuim'),
('cmdwuow8u00027kxcr0pg9k34', 'cmdx0rxrj000i7kucwtc6af7r'),
('cmdwup0su00037kxco57nhoq7', 'cmdx12n33000r7kuc5aaznia7'),
('cmdwup0su00037kxco57nhoq7', 'cmdx14a20000y7kuc2suhkgh4'),
('cmdwup0su00037kxco57nhoq7', 'cmdx15hzx00157kuc03t25xeu'),
('cmdwup4pl00047kxc84zilqsa', 'cmdx1cuqa001c7kuc96zjpnpv'),
('cmdwup4pl00047kxc84zilqsa', 'cmdx1eblv001j7kuckkabq3by'),
('cmdwup4pl00047kxc84zilqsa', 'cmdx1erya001l7kucrsem928x');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota_keluarga`
--
ALTER TABLE `anggota_keluarga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anggota_keluarga_user_id_fkey` (`user_id`);

--
-- Indexes for table `dokumen_riwayat_pendidikan`
--
ALTER TABLE `dokumen_riwayat_pendidikan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dokumen_riwayat_pendidikan_dokumen_id_key` (`dokumen_id`),
  ADD KEY `dokumen_riwayat_pendidikan_riwayat_pendidikan_id_fkey` (`riwayat_pendidikan_id`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `File_user_ktp_id_key` (`user_ktp_id`),
  ADD UNIQUE KEY `File_user_doc_nbm_id_key` (`user_doc_nbm_id`),
  ADD UNIQUE KEY `File_user_passport_id_key` (`user_passport_id`),
  ADD UNIQUE KEY `File_user_doc_bpjs_kesehatan_id_key` (`user_doc_bpjs_kesehatan_id`),
  ADD UNIQUE KEY `File_user_doc_bpjs_ketenagakerjaan_id_key` (`user_doc_bpjs_ketenagakerjaan_id`),
  ADD UNIQUE KEY `File_user_doc_sertifikasi_dosen_id_key` (`user_doc_sertifikasi_dosen_id`),
  ADD UNIQUE KEY `File_user_doc_nidn_id_key` (`user_doc_nidn_id`),
  ADD UNIQUE KEY `File_user_photo_id_key` (`user_photo_id`),
  ADD KEY `File_filename_idx` (`filename`),
  ADD KEY `File_createdAt_idx` (`createdAt`);

--
-- Indexes for table `inpasing`
--
ALTER TABLE `inpasing`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inpasing_dokumen_sk_id_key` (`dokumen_sk_id`),
  ADD KEY `inpasing_user_id_fkey` (`user_id`);

--
-- Indexes for table `jabatan_fungsional`
--
ALTER TABLE `jabatan_fungsional`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jabatan_fungsional_dokumen_sk_id_key` (`dokumen_sk_id`),
  ADD KEY `jabatan_fungsional_user_id_fkey` (`user_id`);

--
-- Indexes for table `jabatan_struktural`
--
ALTER TABLE `jabatan_struktural`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jabatan_struktural_dokumen_sk_id_key` (`dokumen_sk_id`),
  ADD KEY `jabatan_struktural_user_id_fkey` (`user_id`);

--
-- Indexes for table `kendaraan`
--
ALTER TABLE `kendaraan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kendaraan_dokumen_id_key` (`dokumen_id`),
  ADD KEY `kendaraan_user_id_fkey` (`user_id`);

--
-- Indexes for table `kepangkatan`
--
ALTER TABLE `kepangkatan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kepangkatan_dokumen_sk_id_key` (`dokumen_sk_id`),
  ADD KEY `kepangkatan_user_id_fkey` (`user_id`);

--
-- Indexes for table `penempatan`
--
ALTER TABLE `penempatan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `penempatan_dokumen_sk_id_key` (`dokumen_sk_id`),
  ADD KEY `penempatan_user_id_fkey` (`user_id`);

--
-- Indexes for table `riwayat_pendidikan`
--
ALTER TABLE `riwayat_pendidikan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `riwayat_pendidikan_user_id_fkey` (`user_id`);

--
-- Indexes for table `unit_kerja`
--
ALTER TABLE `unit_kerja`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unit_kerja_name_key` (`name`),
  ADD UNIQUE KEY `unit_kerja_kepalaUnitKerjaId_key` (`kepalaUnitKerjaId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UserInfo_userId_key` (`userId`);

--
-- Indexes for table `_userunitkerja`
--
ALTER TABLE `_userunitkerja`
  ADD UNIQUE KEY `_UserUnitKerja_AB_unique` (`A`,`B`),
  ADD KEY `_UserUnitKerja_B_index` (`B`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anggota_keluarga`
--
ALTER TABLE `anggota_keluarga`
  ADD CONSTRAINT `anggota_keluarga_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dokumen_riwayat_pendidikan`
--
ALTER TABLE `dokumen_riwayat_pendidikan`
  ADD CONSTRAINT `dokumen_riwayat_pendidikan_dokumen_id_fkey` FOREIGN KEY (`dokumen_id`) REFERENCES `file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dokumen_riwayat_pendidikan_riwayat_pendidikan_id_fkey` FOREIGN KEY (`riwayat_pendidikan_id`) REFERENCES `riwayat_pendidikan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `File_user_doc_bpjs_kesehatan_id_fkey` FOREIGN KEY (`user_doc_bpjs_kesehatan_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `File_user_doc_bpjs_ketenagakerjaan_id_fkey` FOREIGN KEY (`user_doc_bpjs_ketenagakerjaan_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `File_user_doc_nbm_id_fkey` FOREIGN KEY (`user_doc_nbm_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `File_user_doc_nidn_id_fkey` FOREIGN KEY (`user_doc_nidn_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `File_user_doc_sertifikasi_dosen_id_fkey` FOREIGN KEY (`user_doc_sertifikasi_dosen_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `File_user_ktp_id_fkey` FOREIGN KEY (`user_ktp_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `File_user_passport_id_fkey` FOREIGN KEY (`user_passport_id`) REFERENCES `userinfo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `File_user_photo_id_fkey` FOREIGN KEY (`user_photo_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inpasing`
--
ALTER TABLE `inpasing`
  ADD CONSTRAINT `inpasing_dokumen_sk_id_fkey` FOREIGN KEY (`dokumen_sk_id`) REFERENCES `file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inpasing_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jabatan_fungsional`
--
ALTER TABLE `jabatan_fungsional`
  ADD CONSTRAINT `jabatan_fungsional_dokumen_sk_id_fkey` FOREIGN KEY (`dokumen_sk_id`) REFERENCES `file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jabatan_fungsional_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jabatan_struktural`
--
ALTER TABLE `jabatan_struktural`
  ADD CONSTRAINT `jabatan_struktural_dokumen_sk_id_fkey` FOREIGN KEY (`dokumen_sk_id`) REFERENCES `file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jabatan_struktural_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kendaraan`
--
ALTER TABLE `kendaraan`
  ADD CONSTRAINT `kendaraan_dokumen_id_fkey` FOREIGN KEY (`dokumen_id`) REFERENCES `file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kendaraan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kepangkatan`
--
ALTER TABLE `kepangkatan`
  ADD CONSTRAINT `kepangkatan_dokumen_sk_id_fkey` FOREIGN KEY (`dokumen_sk_id`) REFERENCES `file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kepangkatan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penempatan`
--
ALTER TABLE `penempatan`
  ADD CONSTRAINT `penempatan_dokumen_sk_id_fkey` FOREIGN KEY (`dokumen_sk_id`) REFERENCES `file` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penempatan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `riwayat_pendidikan`
--
ALTER TABLE `riwayat_pendidikan`
  ADD CONSTRAINT `riwayat_pendidikan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `unit_kerja`
--
ALTER TABLE `unit_kerja`
  ADD CONSTRAINT `unit_kerja_kepalaUnitKerjaId_fkey` FOREIGN KEY (`kepalaUnitKerjaId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD CONSTRAINT `UserInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_userunitkerja`
--
ALTER TABLE `_userunitkerja`
  ADD CONSTRAINT `_UserUnitKerja_A_fkey` FOREIGN KEY (`A`) REFERENCES `unit_kerja` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_UserUnitKerja_B_fkey` FOREIGN KEY (`B`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
