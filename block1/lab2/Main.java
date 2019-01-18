package lab2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;

public class Main {
	static final String JDBC_DRIVER = "org.h2.Driver";
	static final String DB_URL = "jdbc:h2:file:~/base2";  
	public static void main(String[] args) {
		try {
			Class.forName(JDBC_DRIVER).newInstance();
			Connection con = DriverManager.getConnection(DB_URL);
			Statement stm = con.createStatement();
			stm.executeUpdate("CREATE TABLE Furniture" + 
		            "(id INTEGER NOT NULL AUTO_INCREMENT, " + 
		            " name VARCHAR(255), " +  
		            " color VARCHAR(255), " +  
		            " price INTEGER, " +  
		            " shopId INTEGER NOT NULL)");
			stm.executeUpdate("CREATE TABLE Shop" + 
		            "(id INTEGER NOT NULL AUTO_INCREMENT, " + 
		            " name VARCHAR(255), " +  
		            " adress VARCHAR(255))");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Table', 'White', 3200, 1)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Table', 'Black', 1000, 1)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Cupboard', 'Blue', 9000, 1)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Chair', 'Blue', 500, 2)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Char', 'Brown', 2000, 2)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Char', 'Green', 1800, 2)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Chair', 'Green', 400, 2)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Table', 'Black', 10000, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Shelf', 'White', 8000, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Cupboard', 'Brown', 20000, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Table', 'Red', 9000, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Shelf', 'Brown', 200, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Chair', 'White', 500, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Cupboard', 'Brown', 5000, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Shelf', 'Green', 1000, 3)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Cupboard', 'Green', 8000, 4)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Chair', 'Brown', 800, 4)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Shelf', 'Red', 800, 4)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Table', 'Green', 9000, 4)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('Chair', 'White', 500, 4)");
			stm.executeUpdate("INSERT INTO Shop (name, adress) VALUES ('Akson', 'Komsomolskoe shosse, 14')");
			stm.executeUpdate("INSERT INTO Shop (name, adress) VALUES ('IKEA', 'TRC MEGA, pos Fediakovo')");
			stm.executeUpdate("INSERT INTO Shop (name, adress) VALUES ('Mebelnui bazar', 'Moskovskii vokzal')");
			stm.executeUpdate("INSERT INTO Shop (name, adress) VALUES ('OBI', 'TRC Fantastika')");
			
			Scanner sc = new Scanner(System.in);
			System.out.println("1 - print all \n2 - add \n3 - delete \n4 - print all in shop");
			int key = sc.nextInt();
			FurnitureFace tf = new FurnitureFace();
			
			switch(key) {
			case 1:
				for(Furniture f : tf.getAll()) {
					System.out.println("id: " + f.getId() + " name: " + f.getName() + " color: " + f.getColor() + " price: " + f.getPrice() + " shopId: " + f.getShopId());
				}
				break;
			case 2:
				Furniture fnew = new Furniture();
				sc.nextLine();
				System.out.println("Имя:");
				fnew.setName(sc.nextLine());
				System.out.println("Цвет:");
				fnew.setColor(sc.nextLine());
				System.out.println("Цена:");
				fnew.setPrice(sc.nextInt());
				System.out.println("id магазина:");
				fnew.setShopId(sc.nextInt());
				tf.add(fnew);
				break;
			case 3:
				System.out.println("Введите id");
				int idDel = sc.nextInt();
				tf.delete(idDel);
				break;
			case 4:
				System.out.println("Введите id магазина");
				int idSh = sc.nextInt();
				ShopFace sh = new ShopFace();
				sh.getShop(idSh);

				break;
			default:
				return;
			}
		} catch(Exception e) {
			e.printStackTrace(); 
		}
	}
}
