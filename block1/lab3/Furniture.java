package lab3;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "furnitures")
public class Furniture {
	@DatabaseField(generatedId = true)
	private int id;
	
	@DatabaseField(foreign = true, foreignAutoRefresh = true, columnName = "shopId")
	private Shop shop;
	
	@DatabaseField(canBeNull = false)
    private String name;
	
	@DatabaseField(canBeNull = false)
    private String color;
	
	@DatabaseField(canBeNull = false)
    private int price;
    
    public Furniture() {
    	
    }
    public Furniture(Shop _shop, String _name, String _color, int _price) {
    	shop = _shop;
    	color = _color;
    	name = _name;
    	price = _price;
    }
    
    public int getId() {
    	return id;
    }
    
    public Shop getShop() {
    	return shop;
    }
    
    public void setShop(Shop _shop) {
    	shop = _shop;
    }
    
    public String getName() {
    	return name;
    }
    public void setName(String _name) {
    	name = _name;
    }
    public String getColor() {
    	return color;
    }
    public void setColor(String _color) {
    	color = _color;
    }
    public int getPrice() {
    	return price;
    }
    public void setPrice(int _price) {
    	price = _price;
    }
}
