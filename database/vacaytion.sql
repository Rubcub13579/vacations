CREATE DATABASE  IF NOT EXISTS `vacaytion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacaytion`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: vacaytion
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `vacationId` int NOT NULL,
  `userId` int NOT NULL,
  KEY `vacationId_idx` (`vacationId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `roleId_idx` (`roleId`),
  CONSTRAINT `roleId` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'Bart','Simpson','bart@gmail.com','dfbec8e4e0fa3f5033eaa09380590be246469360efe2ef82337cd02712c30c885b8c2d8c4e8becf6cf8a598b75650bffe7a0ab1a3632e1d91d414415dafe2aac',1),(10,'Lisa','Simpson','lisa@gmail.com','dfbec8e4e0fa3f5033eaa09380590be246469360efe2ef82337cd02712c30c885b8c2d8c4e8becf6cf8a598b75650bffe7a0ab1a3632e1d91d414415dafe2aac',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` nvarchar(50) NOT NULL,
  `description` nvarchar(1000) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` nvarchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (4,'Bali, Indonesia','A tropical paradise known for its beaches, temples, and lush rice terraces.','2025-06-15','2025-06-25',2450.00,'d475d531-4395-45ac-9a17-9ef455088234.jpg'),(5,'Paris, France','Romantic city with iconic landmarks like the Eiffel Tower, cafes, and art museums.','2025-05-10','2025-05-17',3200.00,'d7919e68-75d6-4975-9bf1-1c4a6d01585e.jpg'),(6,'Kyoto, Japan','Historic city filled with shrines, geisha districts, and cherry blossoms.','2025-04-01','2025-04-10',3800.00,'e4910ad4-4d2d-48fc-a628-91ff07268e09.jpg'),(7,'Reykjavik, Iceland','Northern lights, geothermal spas, and dramatic volcanic landscapes.','2025-11-01','2025-11-08',4100.00,'af9cf7bf-e042-4598-a72a-789e691eb819.jpg'),(8,'Cape Town, South Africa','Scenic coastline, Table Mountain, and diverse wildlife experiences.','2025-09-12','2025-09-22',3000.00,'e264a4a9-db8b-493a-b8b3-4f787c6a1646.jpg'),(9,'Rome, Italy','Ancient ruins, renaissance art, and delicious Italian cuisine.','2025-05-20','2025-05-28',2900.00,'8c327cce-f156-4f77-98ac-aadb1822bddc.jpg'),(10,'Banff, Canada','Stunning turquoise lakes, mountain trails, and outdoor adventure.','2025-07-05','2025-07-12',2700.00,'f9ddb188-f395-403c-be32-11e25b01f720.jpg'),(11,'Phuket, Thailand','Sunny beaches, island tours, and vibrant street markets.','2025-03-10','2025-03-18',1800.00,'1b19168c-633e-421c-a0ea-67a522e99ae2.jpg'),(12,'Barcelona, Spain','Gaudi architecture, Mediterranean beaches, and a lively cultural scene.','2025-06-01','2025-06-08',2600.00,'8ab911b8-17b1-424f-a389-57f937589ae8.jpg'),(13,'Santorini, Greece','White-washed houses, sunsets over the Aegean Sea, and volcanic beaches.','2025-08-15','2025-08-22',3100.00,'91e438bf-9841-4663-adfe-198282d25bb9.jpg'),(14,'Machu Picchu, Peru','Explore the ancient Incan citadel high in the Andes.','2025-07-20','2025-07-28',3500.00,'32fc265b-d033-4bfc-aa3f-9cd6e0707643.jpg'),(15,'Queenstown, New Zealand','Adventure capital with bungee jumping, skiing, and stunning landscapes.','2025-12-01','2025-12-10',4700.00,'0d6df385-deb5-45f1-82b1-448bee1d3cf7.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-30 17:17:11
