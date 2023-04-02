import React from 'react';
import styles from './MenuPanel.module.css';

const MenuPanel = () => {
  return (
    <div className={styles.menuPanel}>
      <div className={styles.menuItem}>Ajouter une référence</div>
      {/* Ajoutez d'autres éléments de menu ici */}
    </div>
  );
};

export default MenuPanel;
