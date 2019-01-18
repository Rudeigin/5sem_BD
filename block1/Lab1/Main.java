import java.sql.*;

public class Main {
	static final String JDBC_DRIVER = "org.h2.Driver";
	static final String DB_URL = "jdbc:h2:file:~/base";  

	public static void main(String[] args) {
		System.out.println("Hello");
		try {
			Class.forName(JDBC_DRIVER).newInstance();
			Connection con = DriverManager.getConnection(DB_URL);
			Statement stm = con.createStatement();
			stm.executeUpdate("CREATE TABLE Furniture" + 
		            "(id INTEGER NOT NULL AUTO_INCREMENT, " + 
		            " name VARCHAR(255), " +  
		            " color VARCHAR(255), " +  
		            " price INTEGER, " +  
		            " PRIMARY KEY ( id ))");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Table', 'White', 3200)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Table', 'Black', 1000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Cupboard', 'Blue', 9000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Chair', 'Blue', 500)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Char', 'Brown', 2000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Char', 'Green', 1800)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Chair', 'Green', 400)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Table', 'Black', 10000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Shelf', 'White', 8000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Cupboard', 'Brown', 20000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Table', 'Red', 9000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Shelf', 'Brown', 200)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Chair', 'White', 500)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Cupboard', 'Brown', 5000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Shelf', 'Green', 1000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Cupboard', 'Green', 8000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Chair', 'Brown', 800)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Shelf', 'Red', 800)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Table', 'Green', 9000)");
			stm.executeUpdate("INSERT INTO Furniture (name, color, price) VALUES ('Chair', 'White', 500)");
			ResultSet result;
			result = stm.executeQuery("SELECT * FROM Furniture");
//			result = stm.executeQuery("SELECT * FROM Furniture WHERE color = 'Brown'");
//			result = stm.executeQuery("SELECT name, color FROM Furniture");
//			result = stm.executeQuery("SELECT * FROM Furniture WHERE price < 1000");
			while (result.next()){
				System.out.println(result.getString("name") + "  " +
			                       result.getString("color")+ "  " +
						           result.getString("price")+ "  " );
			}  
		} catch(Exception e) {
			e.printStackTrace(); 
		}
	}
}
