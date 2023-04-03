-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: iot
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cososudung`
--

DROP TABLE IF EXISTS `cososudung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cososudung` (
  `ID_cososudung` int NOT NULL AUTO_INCREMENT,
  `DiaDiem` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_cososudung`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cososudung`
--

LOCK TABLES `cososudung` WRITE;
/*!40000 ALTER TABLE `cososudung` DISABLE KEYS */;
INSERT INTO `cososudung` VALUES (1,'PTIT');
/*!40000 ALTER TABLE `cososudung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoangrac`
--

DROP TABLE IF EXISTS `khoangrac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khoangrac` (
  `ID_khoangrac` int NOT NULL AUTO_INCREMENT,
  `ID_Thungrac` int NOT NULL,
  `SoLanDo` int NOT NULL,
  `TenNhan` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_khoangrac`),
  KEY `ID_Thungrac` (`ID_Thungrac`),
  CONSTRAINT `khoangrac_ibfk_1` FOREIGN KEY (`ID_Thungrac`) REFERENCES `thungrac` (`ID_thungrac`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoangrac`
--

LOCK TABLES `khoangrac` WRITE;
/*!40000 ALTER TABLE `khoangrac` DISABLE KEYS */;
INSERT INTO `khoangrac` VALUES (1,1,1,'box_cardboard_paper'),(2,1,0,'glass_metal_plastic'),(3,1,0,'organic'),(4,1,0,'other');
/*!40000 ALTER TABLE `khoangrac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ractrongkhoang`
--

DROP TABLE IF EXISTS `ractrongkhoang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ractrongkhoang` (
  `ID_ractrongkhoang` int NOT NULL AUTO_INCREMENT,
  `ID_khoangrac` int NOT NULL,
  `AnhRac` varchar(255) NOT NULL,
  `NgayRacVao` date NOT NULL,
  `KhoiLuong` float NOT NULL,
  PRIMARY KEY (`ID_ractrongkhoang`),
  KEY `ID_khoangrac` (`ID_khoangrac`),
  CONSTRAINT `ractrongkhoang_ibfk_1` FOREIGN KEY (`ID_khoangrac`) REFERENCES `khoangrac` (`ID_khoangrac`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ractrongkhoang`
--

LOCK TABLES `ractrongkhoang` WRITE;
/*!40000 ALTER TABLE `ractrongkhoang` DISABLE KEYS */;
INSERT INTO `ractrongkhoang` VALUES (1,1,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper575.jpg\"','2022-11-01',10),(2,1,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper576.jpg\"','2022-11-02',10),(3,1,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-03',20),(4,2,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-02',5),(5,3,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-01',10),(6,2,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-09',10),(7,4,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-10',20),(8,1,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-01',10),(9,3,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-02',40),(10,4,'\"D:\\PTIT\\IoT\\project\\static\\images\\paper577.jpg\"','2022-11-03',15);
/*!40000 ALTER TABLE `ractrongkhoang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thungrac`
--

DROP TABLE IF EXISTS `thungrac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thungrac` (
  `ID_thungrac` int NOT NULL AUTO_INCREMENT,
  `ID_cososudung` int NOT NULL,
  `ViTriThungRac` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_thungrac`),
  KEY `ID_cososudung` (`ID_cososudung`),
  CONSTRAINT `thungrac_ibfk_1` FOREIGN KEY (`ID_cososudung`) REFERENCES `cososudung` (`ID_cososudung`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thungrac`
--

LOCK TABLES `thungrac` WRITE;
/*!40000 ALTER TABLE `thungrac` DISABLE KEYS */;
INSERT INTO `thungrac` VALUES (1,1,'Cong Truong'),(2,1,'Canteen'),(3,1,'A3');
/*!40000 ALTER TABLE `thungrac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID_users` int NOT NULL AUTO_INCREMENT,
  `accounts` varchar(255) NOT NULL,
  `passwords` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_users`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hau','hau'),(2,'huy','huy'),(3,'hieu','hieu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-17  0:43:40
