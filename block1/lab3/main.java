package lab3;

import java.util.List;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.stmt.QueryBuilder;
import com.j256.ormlite.table.TableUtils;

public class main {

	private final static String DATABASE_URL = "jdbc:h2:~/fDB";

	private static Dao<Shop, Integer> shopDao;
	private static Dao<Furniture, Integer> furDao;
	
	public static void main(String[] args) throws Exception {
		JdbcConnectionSource connectionSource = null;
		try {
			connectionSource = new JdbcConnectionSource(DATABASE_URL);
			shopDao = DaoManager.createDao(connectionSource, Shop.class);
			furDao = DaoManager.createDao(connectionSource, Furniture.class);

			TableUtils.createTable(connectionSource, Shop.class);
			TableUtils.createTable(connectionSource, Furniture.class);

			Shop shop1 = new Shop ("IKEA", "tc Mega");
			shopDao.create(shop1);
			Shop shop2 = new Shop ("OBI", "tc Fantastic");
			shopDao.create(shop2);
			Shop shop3 = new Shop ("AKSON", "komsomolsk shosse");
			shopDao.create(shop3);
			
			Furniture mmbr = new Furniture (shop1, "Table", "black", 15000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop1, "Shelf", "green", 13000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop1, "Table", "red", 15000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop2, "Table", "blue", 1500);
			furDao.create(mmbr);
			mmbr = new Furniture (shop2, "Chair", "black", 15000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop2, "Shelf", "brown", 1000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop2, "Table", "red", 12000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop3, "Chair", "red", 1500);
			furDao.create(mmbr);
			mmbr = new Furniture (shop3, "Table", "red", 8000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop3, "Chair", "green", 1500);
			furDao.create(mmbr);
			mmbr = new Furniture (shop3, "Shelf", "black", 1000);
			furDao.create(mmbr);
			mmbr = new Furniture (shop3, "Shelf", "black", 1200);
			furDao.create(mmbr);
			
			List<Furniture> arr = getFurnitureByShop("AKSON", shopDao, furDao);
			for (Furniture tmp : arr) {
				String color = tmp.getColor();
				String shop = tmp.getShop().getName();
				String name = tmp.getName();
				int price = tmp.getPrice();
				System.out.println(shop+", "+name+", "+color+", "+price);
			}
			arr = getFurnitureByColor("black", furDao);
			for (Furniture tmp : arr) {
				String color = tmp.getColor();
				String shop = tmp.getShop().getName();
				String name = tmp.getName();
				int price = tmp.getPrice();
				System.out.println(shop+", "+name+", "+color+", "+price);
			}
			
			
		} finally {
			if (connectionSource != null) {
				connectionSource.close();
			}
		}
	}
	
	public static List<Furniture> getFurnitureByShop(String shop, Dao<Shop, Integer> shopDao, Dao<Furniture, Integer> furDao)
	{
		List<Furniture> temp = null;
		try {
			QueryBuilder<Shop, Integer> shopBuilder = shopDao.queryBuilder();
			shopBuilder.where().like("name", shop);
			QueryBuilder<Furniture, Integer> furBuilder = furDao.queryBuilder();
			furBuilder.join("shopId", "id", shopBuilder);
			temp = furDao.query(furBuilder.prepare());
		}
		catch (Exception e) {
		}
		return temp;
	}
	
	public static List<Furniture> getFurnitureByColor(String color, Dao<Furniture, Integer> furDao)
	{
		List<Furniture> temp = null;
		try {						
			QueryBuilder<Furniture, Integer> furBuilder = furDao.queryBuilder();
			furBuilder.where().like("color", color);
			temp = furDao.query(furBuilder.prepare());
		}
		catch (Exception e) {}
		return temp;
	}

}
