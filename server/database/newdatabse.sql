/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : newdatabase

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 22/09/2022 22:34:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES (11, '南京', 'nanjing', '1');
INSERT INTO `city` VALUES (12, '苏州', 'suzhou', '1');
INSERT INTO `city` VALUES (21, '杭州', 'hangzhou', '2');
INSERT INTO `city` VALUES (22, '温州', 'wenzhou', '2');

-- ----------------------------
-- Table structure for hotwords
-- ----------------------------
DROP TABLE IF EXISTS `hotwords`;
CREATE TABLE `hotwords`  (
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotwords
-- ----------------------------
INSERT INTO `hotwords` VALUES ('iPhone', '2000');
INSERT INTO `hotwords` VALUES ('手机', '8000');
INSERT INTO `hotwords` VALUES ('键盘', '2560');
INSERT INTO `hotwords` VALUES ('耳机', '5000');
INSERT INTO `hotwords` VALUES ('运动鞋', '10000');
INSERT INTO `hotwords` VALUES ('李宁', '7100');
INSERT INTO `hotwords` VALUES ('安踏', '7100');
INSERT INTO `hotwords` VALUES ('无线耳机', '6000');
INSERT INTO `hotwords` VALUES ('抽纸', '3600');
INSERT INTO `hotwords` VALUES ('洗衣液', '4800');
INSERT INTO `hotwords` VALUES ('游戏键盘', '5000');
INSERT INTO `hotwords` VALUES ('零食', '2600');
INSERT INTO `hotwords` VALUES ('nike', '2300');

-- ----------------------------
-- Table structure for mapsales
-- ----------------------------
DROP TABLE IF EXISTS `mapsales`;
CREATE TABLE `mapsales`  (
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lng` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mapsales
-- ----------------------------
INSERT INTO `mapsales` VALUES ('山东', '117.000923', '36.675807', '2000');
INSERT INTO `mapsales` VALUES ('河北', '114.502461', '38.045474', '1000');
INSERT INTO `mapsales` VALUES ('安徽', '117.283042', '31.86119', '3000');
INSERT INTO `mapsales` VALUES ('陕西', '108.948024', '34.263161', '3000');
INSERT INTO `mapsales` VALUES ('江苏', '118.767413', '32.041544', '5000');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `linkUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `openType` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isOfAdmin` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, 21, '菜单管理', '/setting/menu', '1', 'MenuUnfoldOutlined', '1');
INSERT INTO `menu` VALUES (21, -1, '系统设置', '/setting', '2', 'SettingOutlined', '1');
INSERT INTO `menu` VALUES (33, 21, '用户管理', '/setting/user', '1', 'UserSwitchOutlined', '1');
INSERT INTO `menu` VALUES (54, -1, '业务设置', '/business/product', '1', 'BugOutlined', '2');
INSERT INTO `menu` VALUES (55, 54, '业务概览', '/business/overview', '1', 'EyeTwoTone', '2');
INSERT INTO `menu` VALUES (56, 54, '商品管理', '/business/product', '1', 'ShoppingOutlined', '2');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `attrs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mainPic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `morePic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `isOnShelf` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (5, '《答案之书》', '0', '[{\"key\":\"颜色\",\"value\":\"黑色\"},{\"key\":\"版本\",\"value\":\"1.0\"}]', '\\upload\\book.jpg', '\\upload\\book.jpg', '1', '24', '<p>答案之书</p>');
INSERT INTO `product` VALUES (6, '键盘', '4', '[{\"key\":\"颜色\",\"value\":\"白色\"}]', '\\upload\\jianpan.jpg', '\\upload\\jianpan.jpg', '1', '45', '<p>好键盘</p>');
INSERT INTO `product` VALUES (8, '手机', '4', '[{\"key\":\"颜色\",\"value\":\"黑色\"}]', '\\upload\\mobile.jpg', '\\upload\\mobile.jpg', '1', '1222', '<p>好手机</p>');

-- ----------------------------
-- Table structure for producttypesales
-- ----------------------------
DROP TABLE IF EXISTS `producttypesales`;
CREATE TABLE `producttypesales`  (
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of producttypesales
-- ----------------------------
INSERT INTO `producttypesales` VALUES ('图书', '100000');
INSERT INTO `producttypesales` VALUES ('数码', '300000');
INSERT INTO `producttypesales` VALUES ('服装', '80000');
INSERT INTO `producttypesales` VALUES ('电器', '500000');
INSERT INTO `producttypesales` VALUES ('家具', '600000');
INSERT INTO `producttypesales` VALUES ('食品', '100000');

-- ----------------------------
-- Table structure for province
-- ----------------------------
DROP TABLE IF EXISTS `province`;
CREATE TABLE `province`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of province
-- ----------------------------
INSERT INTO `province` VALUES (1, '江苏省', 'jiangsu');
INSERT INTO `province` VALUES (2, '浙江省', 'zhejiang');

-- ----------------------------
-- Table structure for region
-- ----------------------------
DROP TABLE IF EXISTS `region`;
CREATE TABLE `region`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 223 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of region
-- ----------------------------
INSERT INTO `region` VALUES (111, '浦口区', 'pukou', '11');
INSERT INTO `region` VALUES (112, '建邺区', 'jianye', '11');
INSERT INTO `region` VALUES (121, '姑苏区', 'gusu', '12');
INSERT INTO `region` VALUES (211, '上城区', 'shangcheng', '21');
INSERT INTO `region` VALUES (221, '龙湾区', 'longwan', '22');

-- ----------------------------
-- Table structure for salestop10
-- ----------------------------
DROP TABLE IF EXISTS `salestop10`;
CREATE TABLE `salestop10`  (
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salestop10
-- ----------------------------
INSERT INTO `salestop10` VALUES ('纸巾', '10000');
INSERT INTO `salestop10` VALUES ('耳机', '8000');
INSERT INTO `salestop10` VALUES ('羊绒大衣', '6000');
INSERT INTO `salestop10` VALUES ('短靴', '5000');
INSERT INTO `salestop10` VALUES ('化妆品', '4000');
INSERT INTO `salestop10` VALUES ('手机', '3000');
INSERT INTO `salestop10` VALUES ('电脑', '2000');
INSERT INTO `salestop10` VALUES ('键盘', '2000');
INSERT INTO `salestop10` VALUES ('维达', '1000');
INSERT INTO `salestop10` VALUES ('百草味', '1000');

-- ----------------------------
-- Table structure for salestrend
-- ----------------------------
DROP TABLE IF EXISTS `salestrend`;
CREATE TABLE `salestrend`  (
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salestrend
-- ----------------------------
INSERT INTO `salestrend` VALUES ('01-01', '1000', '1');
INSERT INTO `salestrend` VALUES ('01-02', '2000', '1');
INSERT INTO `salestrend` VALUES ('01-03', '2600', '1');
INSERT INTO `salestrend` VALUES ('01-04', '3000', '1');
INSERT INTO `salestrend` VALUES ('01-05', '4100', '1');
INSERT INTO `salestrend` VALUES ('01-06', '4500', '1');
INSERT INTO `salestrend` VALUES ('01-07', '5100', '1');
INSERT INTO `salestrend` VALUES ('01-01', '10000', '2');
INSERT INTO `salestrend` VALUES ('01-02', '13000', '2');
INSERT INTO `salestrend` VALUES ('01-03', '18000', '2');
INSERT INTO `salestrend` VALUES ('01-04', '16000', '2');
INSERT INTO `salestrend` VALUES ('01-05', '20000', '2');
INSERT INTO `salestrend` VALUES ('01-06', '26000', '2');
INSERT INTO `salestrend` VALUES ('01-07', '36000', '2');

-- ----------------------------
-- Table structure for statistics
-- ----------------------------
DROP TABLE IF EXISTS `statistics`;
CREATE TABLE `statistics`  (
  `totalTurnover` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `turnoverGrowth` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `totalQuantity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantityGrowth` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `totalVisited` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `visitedGrowth` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `totalStars` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `starGrowth` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of statistics
-- ----------------------------
INSERT INTO `statistics` VALUES ('18000', '15%', '26000', '10%', '1005623', '20%', '10236', '5%');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `account` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `area` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tel` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `relatedMenus` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '关联菜单id',
  `pwd` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (22, '果然', 'admin', 'jiangsu,nanjing,pukou', '13085450329', '1804643502@qq.com', '\\upload\\1.jpg', NULL, '123');

-- ----------------------------
-- Table structure for volumetop10
-- ----------------------------
DROP TABLE IF EXISTS `volumetop10`;
CREATE TABLE `volumetop10`  (
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of volumetop10
-- ----------------------------
INSERT INTO `volumetop10` VALUES ('图书', '20000');
INSERT INTO `volumetop10` VALUES ('耳机', '15000');
INSERT INTO `volumetop10` VALUES ('键盘', '10000');
INSERT INTO `volumetop10` VALUES ('电脑', '98000');
INSERT INTO `volumetop10` VALUES ('手机', '90000');
INSERT INTO `volumetop10` VALUES ('化妆品', '70000');
INSERT INTO `volumetop10` VALUES ('纸巾', '50000');
INSERT INTO `volumetop10` VALUES ('运动鞋', '45000');
INSERT INTO `volumetop10` VALUES ('大衣', '38000');
INSERT INTO `volumetop10` VALUES ('零食', '20000');

SET FOREIGN_KEY_CHECKS = 1;
