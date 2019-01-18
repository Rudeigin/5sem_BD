package lab2;

public class Shop {
	private String name;
	private String adress;
	private int id;
	
	public Shop() {
		
	}
	
	public Shop(String _name, String _adress) {
		name = _name;
		adress = _adress;
	}
	
	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public String getAdress() {
		return adress;
	}
}
