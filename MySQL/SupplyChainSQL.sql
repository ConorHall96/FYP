CREATE DATABASE IF NOT EXISTS mysql_supplychain_db;
USE mysql_supplychain_db; 
CREATE TABLE IF NOT EXISTS `tblProducts` (
  `prodId` int(10) unsigned DEFAULT NULL,
  `prodName` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

USE mysql_supplychain_db; 
select * from tblProducts;

truncate tblProducts;