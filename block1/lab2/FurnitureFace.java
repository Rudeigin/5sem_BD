package lab2;

import java.sql.*;
import java.util.HashSet;
import java.util.Set;

public class FurnitureFace {
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
	
	public Furniture extractFurnituresFromResult(ResultSet rs) throws SQLException {
		Furniture tmp = new Furniture(rs.getInt("id"),
				rs.getString("name"), rs.getString("color"), rs.getInt("price"), rs.getInt("shopId"));
		return tmp;
	}
	
	public Furniture getObj(int id) {
		try {		
			Connection con = getConn();
			Statement stm = con.createStatement();
			ResultSet rs = stm.executeQuery("SELECT * FROM Furniture WHERE id=" + id);
			
			if(rs.next()) {
				stm.close();
				con.close();
				return extractFurnituresFromResult(rs);
			}
			stm.close();
			con.close();
			
		} catch(SQLException se) {
			se.printStackTrace(); 
		} catch(Exception e) {
			e.printStackTrace(); 
		}
		return null;
	}

	public Set<Furniture> getAll() {
		try {	
			Connection con = getConn();
			Statement stm = con.createStatement();
			ResultSet rs = stm.executeQuery("SELECT * from Furniture");
			
			Set<Furniture> furnitureSet = new HashSet<Furniture>();
			while(rs.next()) {
				Furniture furniture = extractFurnituresFromResult(rs);
				furnitureSet.add(furniture);
			}
			return furnitureSet;
			
		} catch(SQLException se) {
			se.printStackTrace(); 
		} catch(Exception e) {
			e.printStackTrace(); 
		}
		return null;
	}

	public boolean delete(int id) {
		try {
			Connection con = getConn();
			Statement stm = con.createStatement();
			
			if(stm.executeUpdate("DELETE FROM Furniture WHERE id=" + id) == 1) {
				stm.close();
				con.close();
				return true;
			}
			stm.close();
			con.close();
			
		} catch(SQLException se) {
			se.printStackTrace(); 
		} catch(Exception e) {
			e.printStackTrace(); 
		}
		return false;
	}

	public boolean add(Furniture obj) {
		try {
			Connection con = getConn();
			Statement stm = con.createStatement();
			
	        if(stm.executeUpdate("INSERT INTO Furniture (name, color, price, shopId) VALUES ('" + obj.getName() + "', '" + obj.getColor() + "', "+ obj.getPrice() + ", " + obj.getShopId() + ")") == 1){
				con.close();
	        	return true;
	        }
			con.close();
			} catch(SQLException se) {
				se.printStackTrace(); 
			} catch(Exception e) {
				e.printStackTrace(); 
			}
		return false;
	}

	public boolean update(int id, Furniture obj) {
		try {
		Connection con = getConn();
        PreparedStatement ps = con.prepareStatement("UPDATE Furniture SET name=?, color=?, price=?, shopId=? WHERE id=?");
        ps.setString(1, obj.getName());
        ps.setString(2, obj.getColor());
        ps.setInt(3, obj.getPrice());
        ps.setInt(4, obj.getShopId());
        ps.setInt(5, id);
        if(ps.executeUpdate() == 1) {
			con.close();
        	return true;
        }
		con.close();
		} catch(SQLException se) {
			se.printStackTrace(); 
		} catch(Exception e) {
			e.printStackTrace(); 
		}
		return false;
	}
}

