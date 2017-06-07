# Task

# 3. Install Tomcat 8
- Add user to sudoers 
```sh
		$ usermod -aG sudo user
```
- Switch User to user
```sh
		$ su user
```
- Update my repositories
```sh
		$ sudo apt-get update
```
- and install Tomcat 8
```sh
		$ sudo apt-get install tomcat8
```

- Then
  - Edit server.xml, and chage 

    > <Connector port="8080"
  - To
    ><Connector address="127.0.0.1" port="9999"

- Install curl and use it to test and view the Tomcat welcome page.
```sh
		$ sudo apt-get install curl
		$ curl 127.0.0.1:8080
```
- Edit rc.local
```sh
		$ sudo nano /etc/rc.local 
```
- and add line
```sh
		$ /etc/init.d/tomcat9 start
```
Thanks to this, it will startup after reboot

-----------------------------------------------------------
# 4. Install nginx
- Install nginx
	```sh
		$ sudo apt-get install nginx
	```
		
- Make test
    ```sh
		$ curl 127.0.0.1:8
    ```
- and view the Nginx welcome page.

- Rename default.conf nginx and create a new configuration file which name is tomcat-proxy.conf
	```sh
            $ sudo nano tomcat-proxy.conf
    ```

- I rename default.conf because, I need listen 80 port, but default.conf have already listened 80 port
Edit tomcat-proxy.conf
	And reload nginx 
	```sh
		$ sudo nginx -s reload
    ```
		
- Make test and view the Tomcat welcome page.
	```sh
		$ curl 127.0.0.1:80
    ```

All right
	
- Configure nginx to serve SSL connections
I did not use  LetsEncrypt service, because my PC have not public ip
	
- Generate the SSL – Secure Socket Layer file
	```sh
	    $ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
    ```
		
		  req - PKCS#10 certificate request and certificate generating utility
		
		-x509
			This option outputs a self signed certificate instead of a certificate request. This is typically used to generate a test certificate or a self signed root CA. The extensions added to the certificate (if any) are specified in the configuration file. Unless specified using the set_serial option, a large random number will be used for the serial number.
			If existing request is specified with the -in option, it is converted to the self signed certificate otherwise new request is created.

		-days n
			When the -x509 option is being used this specifies the number of days to certify the certificate for. The default is 30 days.
			
		-newkey arg
			This option creates a new certificate request and a new private key. The argument takes one of several forms. rsa:nbits, where nbits is the number of bits, generates an RSA key nbits in size. If nbits is omitted, i.e. -newkey rsa specified, the default key size, specified in the configuration file is used.
			
		-keyout filename
			This gives the filename to write the newly created private key to. If this option is not specified then the filename present in the configuration file is used.
			
- Make test
	```sh
		$ curl -k https://127.0.0.1
    ```
- And view the Tomcat welcome page
All right
	
-------------------------------------------
	
# 5. With iptables block all incoming connections to all ports, except ssh and nginx ports. Rules must survive reboot.

- Install iptables-persistent
    ```sh
		$ sudo apt-get install iptables-persistent
    ```
  - After, edit /etc/iptables/rules.v4 and add rules

    > First rule says accept (don't drop) all connections that have been established and their related connections
    > -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT 
    I need to at least HTTP (80), HTTPS (443) and SSH (22).
    > -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT 
    > -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT 
    > -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT 
    I also have tomcat8 listening on 9999
    >  -A INPUT -s 127.0.0.1 -p tcp --dport 9999 -j ACCEPT 
    Rule says, everything else that tries to come in, drop 
    > -A INPUT -j DROP 
			
- Apply the rules
	```sh
        $ sudo iptables-restore < /etc/iptables/rules.v4
    ```
		
- Reboot system and we can see that Rules survive reboot.
-----------------------------------------------
# 6. Write a python script to parse /var/log/nginx/access.log. 

	#!/usr/bin/env python3

	import sys
	from collections import Counter

	f = open('/var/log/nginx/access.log')
	count = Counter()

	for line in f:
		count[line.strip().split()[8]]+=1

	for element in count.most_common():
		print(str(element[0]) + " " + str(element[1]))


- Use 
    ```sh
		$sudo /home/user/parser.py 
    ```
- You will see


    304 96
    200 47
    404 19
    504 5
    499 5
    400 2

# 7. Setup MySQL. Create a database. Create couple of databases and populate them with data.
-  Install mysql
    ```sh
		$ sudo apt-get install mysql-server
	```
- To log in to MySQL as the root user:
    ```sh
		$ mysql -u root -p
	```
- CREATE database testdb
    ```sh
		$ mysql> create database testdb;
		$ mysql> use testdb
	```
- Create tables apartment_house
		

    mysql> CREATE TABLE apartment_house ( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        country varchar(20) ,
        city varchar(20) ,
        street varchar(20),
    	number int
        );

- And insert data to table


    mysql> INSERT INTO apartment_house(country,city,street,number) VALUES("Russia","Moscow","Lenina",5)
    mysql> INSERT INTO apartment_house(country,city,street,number) VALUES("Russia","Moscow","Lenina",6);
    mysql> INSERT INTO apartment_house(country,city,street,number) VALUES("Russia","Moscow","Lenina",7);
    mysql> select * from apartment_house;
    +----+---------+--------+--------+--------+
    | id | country | city   | street | number |
    +----+---------+--------+--------+--------+
    |  1 | Russia  | Moscow | Lenina |      5 |
    |  2 | Russia  | Moscow | Lenina |      6 |
    |  3 | Russia  | Moscow | Lenina |      7 |
    |  4 | Russia  | Moscow | Lenina |      8 |
    |  5 | Russia  | Moscow | Lenina |      9 |
    |  6 | Russia  | Moscow | Lenina |     10 |
    |  7 | Russia  | Moscow | Lenina |     11 |
    +----+---------+--------+--------+--------+

- Create tables apartment


    mysql> 
	CREATE TABLE apartment ( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    house_id int ,
    number int 
    );
- And insert data to table


	INSERT INTO apartment(house_id,number) VALUES(1,1);
	INSERT INTO apartment(house_id,number) VALUES(1,2);
	INSERT INTO apartment(house_id,number) VALUES(1,3);
	INSERT INTO apartment(house_id,number) VALUES(1,4);
	INSERT INTO apartment(house_id,number) VALUES(1,5);
	
    mysql> select * from apartment;
    +----+----------+--------+
    | id | house_id | number |
    +----+----------+--------+
    |  1 |        1 |      1 |
    |  2 |        1 |      2 |
    |  3 |        1 |      3 |
    |  4 |        1 |      4 |
    |  5 |        1 |      5 |
    +----+----------+--------+
--------------------------------------------------------------------------------
# 8. Create another VM. Configure private network between two VMs. Do anothe MySQL installation and make in slave replica of the first VM MySQL server
##### Configure the Master Database
- Edit conf
    ```sh
    $ sudo nano /etc/mysql/my.cnf
    ```
  - Edit line,
    > bind-address  = 192.168.56.104
    > server-id = 1
    > log_bin = /var/log/mysql/mysql-bin.log
    > binlog_do_db = testdb # testdb is out Database

- Refresh MySQL
    ```sh
        $ sudo /etc/init.d/mysql stop
        $ sudo /etc/init.d/mysql start
    ```
- Open up the MySQL 
    ```sh
        $ mysql -u root -p
    ```
- and Grant privileges to the slave
    ```sh
         $ mysql> GRANT REPLICATION SLAVE ON *.* TO 'user_repl'@'%' IDENTIFIED BY 'user12345';
    ```
- And write
    ```sh
        USE testdb;
    ```
- Prevent any new changes and Exit from MySQL shell
    ```sh
		 FLUSH TABLES WITH READ LOCK;
		 exit;
	```
- And Export our database
    ```sh
		$ mysqldump -u root -p --opt newdatabase > newdatabase.sql
	```
		
##### Configure the Slave Database
- Edit conf
    ```sh
	    $ sudo nano /etc/mysql/my.cnf
	```
  - Edit line,
    >server-id = 2
    >log_bin = /var/log/mysql/mysql-bin.log
    >binlog_do_db = testdb

   - And add line
 
        >relay-log = /var/log/mysql/mysql-relay-bin.log

- Open up the MySQL 
    ```sh 
        mysql -u root -p
    ```
- and print 
>CHANGE MASTER TO MASTER_HOST='192.168.56.104',MASTER_USER='user_repl', MASTER_PASSWORD='user12345', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=  107;
- Activate the slave
>START SLAVE;
SHOW SLAVE STATUS\G
		
- Create table on master 
> USE TESTDB
CREATE TABLE test ( `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,a int ,b int );
- And go to slave-server, we can see only created table test


