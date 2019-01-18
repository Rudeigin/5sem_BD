package lab2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ShopFace {
	static final String JDBC_DRIVER = "org.h2.Driver";
	static final String DB_URL = "jdbc:h2:file:~/base2"; 
	
	public Connection getConn() {
		try {
		Class.forName(JDBC_DRIVER).newInstance();		
		Connection con = DriverManager.getConnection(DB_URL);
		return con;
		} catch(SQLException se) {
			se.printStackTrace(); 
		} catch(Exception e) {
			e.printStackTrace(); 
		}
		return null;
	}

	public boolean getShop(int id) {
		try {
		Connection con = getConn();
        PreparedStatement ps = con.prepareStatement("SELECT * from Shop WHERE id=?");
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();
		while(rs.next()) {
			System.out.println("name: " + rs.getString("name") + " adress: " + rs.getString("adress"));
		}
		
		ps = con.prepareStatement("SELECT * from Furniture WHERE shopId=?");
		ps.setInt(1, id);
		rs = ps.executeQuery();
		while(rs.next()) {
			System.out.println("name: " + rs.getString("name") + " color: " + rs.getString("color")+ " price: " + rs.getInt("price"));
		}
			
		con.close();
		return true;
		} catch(SQLException se) {
			se.printStackTrace(); 
		} catch(Exception e) {
			e.printStackTrace(); 
		}
		return false;
	}
}
