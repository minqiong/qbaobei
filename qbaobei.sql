/*
Navicat MySQL Data Transfer

Source Server         : huangminqiong
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : qbaobei

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-29 12:04:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '设置用户电话号码为主键',
  `nickname` varchar(20) NOT NULL,
  `password` varchar(25) NOT NULL,
  `status` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`phone`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('18877572880', 'min', '123456', '');
INSERT INTO `user` VALUES ('18877572889', '小王八', '123456', null);
INSERT INTO `user` VALUES ('18877572888', '小王八', '123456', null);
INSERT INTO `user` VALUES ('18877572870', '小王八', '123456', null);
SET FOREIGN_KEY_CHECKS=1;
