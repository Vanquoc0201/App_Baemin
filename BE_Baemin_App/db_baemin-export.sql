/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Deliveries`;
CREATE TABLE `Deliveries` (
  `deliveryId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `status` enum('pending','shipping','delivered','failed','cancelled') NOT NULL DEFAULT 'pending',
  `shipperName` varchar(100) DEFAULT NULL,
  `shipTime` timestamp NULL DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`deliveryId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `Deliveries_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Foods`;
CREATE TABLE `Foods` (
  `foodId` int NOT NULL AUTO_INCREMENT,
  `foodName` varchar(100) DEFAULT NULL,
  `foodPrice` float DEFAULT NULL,
  `foodDescription` varchar(255) DEFAULT NULL,
  `foodImage` varchar(100) DEFAULT NULL,
  `foodStock` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`foodId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `Foods_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `OrderItems`;
CREATE TABLE `OrderItems` (
  `orderItemId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `foodId` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `unitPrice` float DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderItemId`),
  KEY `orderId` (`orderId`),
  KEY `foodId` (`foodId`),
  CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`orderId`),
  CONSTRAINT `OrderItems_ibfk_2` FOREIGN KEY (`foodId`) REFERENCES `Foods` (`foodId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalPrice` float NOT NULL DEFAULT '0',
  `status` enum('pending','paid','shipping','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Categories` (`categoryId`, `categoryName`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Đồ ăn nhanh', 0, 0, NULL, '2025-05-26 08:46:49', '2025-05-26 08:46:49');
INSERT INTO `Categories` (`categoryId`, `categoryName`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 'Thức uống', 0, 0, NULL, '2025-05-26 08:46:49', '2025-05-26 08:46:49');
INSERT INTO `Categories` (`categoryId`, `categoryName`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(3, 'Món chay', 0, 0, NULL, '2025-05-26 08:46:49', '2025-05-26 08:46:49');
INSERT INTO `Categories` (`categoryId`, `categoryName`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 'Đồ ngọt', 0, 0, NULL, '2025-05-26 08:46:49', '2025-05-26 08:46:49');
INSERT INTO `Categories` (`categoryId`, `categoryName`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(5, 'Món ăn vặt', 0, 0, NULL, '2025-05-26 08:46:49', '2025-05-26 08:46:49');
INSERT INTO `Deliveries` (`deliveryId`, `orderId`, `address`, `status`, `shipperName`, `shipTime`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 2, NULL, 'delivered', NULL, NULL, 0, 0, NULL, '2025-05-26 10:49:27', '2025-05-27 10:49:08');
INSERT INTO `Deliveries` (`deliveryId`, `orderId`, `address`, `status`, `shipperName`, `shipTime`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 3, '13/5 Đông Hưng Thuận 19', 'shipping', 'Võ Văn Quốc', NULL, 0, 0, NULL, '2025-05-26 11:00:40', '2025-05-27 11:18:58');
INSERT INTO `Deliveries` (`deliveryId`, `orderId`, `address`, `status`, `shipperName`, `shipTime`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(3, 4, '926 Nguyễn Văn Quá', 'pending', 'Nguyễn Văn A', NULL, 0, 0, NULL, '2025-05-27 11:47:40', '2025-05-27 11:47:40');
INSERT INTO `Deliveries` (`deliveryId`, `orderId`, `address`, `status`, `shipperName`, `shipTime`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 5, '927 phường đông hưng thuận quận 12', 'pending', 'Võ Văn B', NULL, 0, 0, NULL, '2025-05-27 11:52:08', '2025-05-27 11:52:08');
INSERT INTO `Deliveries` (`deliveryId`, `orderId`, `address`, `status`, `shipperName`, `shipTime`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(5, 6, '13/5 Đông Hưng Thuận 19', 'pending', 'Nguyễn Văn Shipper', NULL, 0, 0, NULL, '2025-05-28 09:49:04', '2025-05-28 09:49:04'),
(6, 7, '13/5 Đông Hưng Thuận 19', 'pending', 'Nguyễn Văn Shipper', NULL, 0, 0, NULL, '2025-05-28 09:49:16', '2025-05-28 09:49:16'),
(7, 8, '13/5 Đông Hưng Thuận 19', 'pending', 'Nguyễn Văn Shipper', NULL, 0, 0, NULL, '2025-05-28 09:50:22', '2025-05-28 09:50:22'),
(8, 9, '13/5 đông hưng thuận 19', 'pending', 'nguyễn văn a', NULL, 0, 0, NULL, '2025-05-28 09:57:31', '2025-05-28 09:57:31');
INSERT INTO `Foods` (`foodId`, `foodName`, `foodPrice`, `foodDescription`, `foodImage`, `foodStock`, `categoryId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Bánh mì thịt nướng', 25000, 'Bánh mì thịt nướng kèm rau và nước sốt đặc biệt', 'https://res.cloudinary.com/dadvwo1ur/image/upload/v1748249843/images/hoxk5uckjh3qsfmiblu3.jpg', 100, 1, 0, 0, NULL, '2025-05-26 08:57:25', '2025-05-26 08:57:25');
INSERT INTO `Foods` (`foodId`, `foodName`, `foodPrice`, `foodDescription`, `foodImage`, `foodStock`, `categoryId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 'Gà rán', 33000, 'Gà rán nóng hổi giòn ngon ', 'https://res.cloudinary.com/dadvwo1ur/image/upload/v1748325238/images/h523jj86bawvwfh9fffw.jpg', 50, 1, 0, 0, NULL, '2025-05-27 05:53:59', '2025-05-27 05:53:59');
INSERT INTO `Foods` (`foodId`, `foodName`, `foodPrice`, `foodDescription`, `foodImage`, `foodStock`, `categoryId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 'Trà Sữa Phúc Long', 40000, 'Trà sữa nhà làm ngon chuẩn vị mời quý khách thưởng thức', 'https://res.cloudinary.com/dadvwo1ur/image/upload/v1748340854/images/oc9aawoj2cnysk1r9ztm.jpg', 75, 2, 0, 0, NULL, '2025-05-27 10:14:15', '2025-05-27 10:14:15');
INSERT INTO `OrderItems` (`orderItemId`, `orderId`, `foodId`, `quantity`, `unitPrice`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, 25000, 0, 0, NULL, '2025-05-26 09:53:48', '2025-05-26 09:53:48');
INSERT INTO `OrderItems` (`orderItemId`, `orderId`, `foodId`, `quantity`, `unitPrice`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 2, 1, 5, 25000, 0, 0, NULL, '2025-05-26 10:49:27', '2025-05-26 10:49:27');
INSERT INTO `OrderItems` (`orderItemId`, `orderId`, `foodId`, `quantity`, `unitPrice`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(3, 3, 1, 3, 25000, 0, 0, NULL, '2025-05-26 11:00:40', '2025-05-26 11:00:40');
INSERT INTO `OrderItems` (`orderItemId`, `orderId`, `foodId`, `quantity`, `unitPrice`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 4, 2, 3, 33000, 0, 0, NULL, '2025-05-27 11:47:40', '2025-05-27 11:47:40'),
(5, 5, 4, 2, 40000, 0, 0, NULL, '2025-05-27 11:52:08', '2025-05-27 11:52:08'),
(6, 6, 2, 5, 33000, 0, 0, NULL, '2025-05-28 09:49:04', '2025-05-28 09:49:04'),
(7, 7, 2, 5, 33000, 0, 0, NULL, '2025-05-28 09:49:16', '2025-05-28 09:49:16'),
(8, 8, 2, 5, 33000, 0, 0, NULL, '2025-05-28 09:50:22', '2025-05-28 09:50:22'),
(9, 9, 4, 3, 40000, 0, 0, NULL, '2025-05-28 09:57:31', '2025-05-28 09:57:31');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 50000, 'pending', 0, 0, NULL, '2025-05-26 09:53:48', '2025-05-26 09:53:48');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 1, 125000, 'pending', 0, 0, NULL, '2025-05-26 10:49:27', '2025-05-26 10:49:27');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(3, 1, 75000, 'pending', 0, 0, NULL, '2025-05-26 11:00:40', '2025-05-26 11:00:40');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(4, 1, 99000, 'pending', 0, 0, NULL, '2025-05-27 11:47:40', '2025-05-27 11:47:40');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(5, 1, 80000, 'pending', 0, 0, NULL, '2025-05-27 11:52:08', '2025-05-27 11:52:08');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(6, 1, 165000, 'pending', 0, 0, NULL, '2025-05-28 09:49:04', '2025-05-28 09:49:04');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(7, 1, 165000, 'pending', 0, 0, NULL, '2025-05-28 09:49:16', '2025-05-28 09:49:16');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(8, 1, 165000, 'pending', 0, 0, NULL, '2025-05-28 09:50:22', '2025-05-28 09:50:22');
INSERT INTO `Orders` (`orderId`, `userId`, `totalPrice`, `status`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(9, 1, 120000, 'pending', 0, 0, NULL, '2025-05-28 09:57:31', '2025-05-28 09:57:31');
INSERT INTO `Users` (`userId`, `name`, `email`, `password`, `address`, `phone`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Võ Văn Quốc', 'vovanquoc0201@gmail.com', '$2b$10$JtXiBbyvJaNo3J0.bfoq/uDlzwixQb44uMdQF3qNQ21AwOOFS4SLO', '13/5 Đông Hưng Thuận 19', '0342701549', 0, 0, NULL, '2025-05-26 07:24:38', '2025-05-26 07:24:38');
INSERT INTO `Users` (`userId`, `name`, `email`, `password`, `address`, `phone`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 'Võ Văn Quốc', 'vanquoc020106@gmail.com', '$2b$10$yKkX3cSd1Fs8bptfRqB.t.unYb24KGSb1ikjzoegTtqHPIE83uk3.', '13/5 Nguyễn Văn Quá', '0342701549', 0, 0, NULL, '2025-05-27 06:15:09', '2025-05-27 06:15:09');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;