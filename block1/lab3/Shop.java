package lab3;

import com.j256.ormlite.dao.ForeignCollection;
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.field.ForeignCollectionField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "shops")
public class Shop {
	@DatabaseField(canBeNull = false)
	private String name;
	@DatabaseField(canBeNull = false)
	private String adress;

	@DatabaseField(generatedId = true)
	private int id;
	
	@ForeignCollectionField
	private ForeignCollection<Furniture> f;
	
	public Shop() {
		
	}
	
	public Shop(String _name, String _adress) {
		name = _name;
		adress = _adress;
	}
	
	public int getId() {
		return id;
	}
	
	public ForeignCollection<Furniture> getCollection() {
		return f;
	}
	
	public String getName() {
		return name;
	}
	
	public String getAdress() {
		return adress;
	}
	
	public void setName(String _name) {
    	name = _name;
    }
	
	public void setAdress(String _adress) {
    	adress = _adress;
    }	
}
