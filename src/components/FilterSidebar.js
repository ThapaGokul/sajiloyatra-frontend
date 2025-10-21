// /src/components/FilterSidebar.js
import styles from './FilterSidebar.module.css';

// Accept props from the parent page
export default function FilterSidebar({ activeFilters, onFilterChange }) {
  
  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    onFilterChange(name, value);
  };

  return (
    <aside className={styles.sidebar}>
      <h3>Filters</h3>
      <div className={styles.filterGroup}>
        <h4>Area</h4>
        <div className={styles.filterOption}>
          <input 
            type="checkbox" 
            id="areaKathmandu"
            name="area"
            value="Kathmandu Valley"
            // The 'checked' status is now controlled by the parent's state
            checked={activeFilters.area.includes('Kathmandu Valley')}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="areaKathmandu">Kathmandu Valley</label>
        </div>
        <div className={styles.filterOption}>
          <input 
            type="checkbox" 
            id="areaPokhara"
            name="area"
            value="Pokhara Lakeside"
            checked={activeFilters.area.includes('Pokhara Lakeside')}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="areaPokhara">Pokhara Lakeside</label>
        </div>
      </div>
    </aside>
  );
}