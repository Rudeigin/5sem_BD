package lab2;

public class Furniture {
    private int id;
    private String name;
    private String color;
    private int price;
    private int shopId;

    public Furniture() {
    	
    }
    public Furniture(int _id, String _name, String _color, int _price, int _shopId) {
    	id = _id;
    	color = _color;
    	name = _name;
    	price = _price;
    	shopId = _shopId;
    }
    
    public int getId() {
    	return id;
    }
    
    public int getShopId() {
    	return shopId;
    }
    
    public void setShopId(int _shopId) {
    	shopId = _shopId;
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
