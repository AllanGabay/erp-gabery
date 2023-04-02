import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';

const UserDropdown = ({ modifications }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [lastTime, setLastTime] = useState('');

  useEffect(() => {
    const uniqueUsers = [
      ...new Set(modifications.map((modification) => modification.user)),
    ];
    setUsers(uniqueUsers);
  }, [modifications]);

  const handleUserChange = (value) => {
    setSelectedUser(value);
    const userModifications = modifications.filter(
      (modification) => modification.user === value
    );
    const latestModification = userModifications.reduce(
      (latest, current) =>
        latest.time > current.time ? latest : current,
      { time: '' }
    );
    setLastTime(latestModification.time);
  };

  const applySize = (provided, size) => ({
    ...provided,
    minHeight: size,
    height: size,
  });
  

  const customStyles = {
    control: (provided) => applySize(provided, '1rem'), // Le conteneur de contrôle principal
    valueContainer: (provided) => ({ // Conteneur pour les valeurs sélectionnées
      ...provided,
      fontSize: '0.4rem',
      padding: '0px',
      marginTop: '-0.2rem',
    }),
    indicatorsContainer: (provided) => applySize(provided, '1rem'), // Conteneur pour les icônes en bout de champ
    dropdownIndicator: (provided) => ({ // Icône de la flèche déroulante
      ...provided,
      padding: '0',
    }),
    clearIndicator: (provided) => ({ // Icône de suppression
      ...provided,
      padding: '0',
    }),
    placeholder: (provided) => ({ // Texte du placeholder
      ...provided,
      fontSize: '0.4rem',
    }),
    singleValue: (provided) => ({ // Valeur sélectionnée pour un Select simple
      ...provided,
      fontSize: '0.4rem',
    }),
    multiValue: (provided) => ({ // Conteneur de valeur pour un Select multiple
      ...provided,
      fontSize: '0.4rem',
    }),
    multiValueLabel: (provided) => ({ // Étiquette de la valeur pour un Select multiple
      ...provided,
      fontSize: '0.4rem',
    }),
    multiValueRemove: (provided) => ({ // Icône de suppression pour un Select multiple
      ...provided,
      fontSize: '0.4rem',
    }),
    input: (provided) => ({ // Zone de saisie de texte
      ...provided,
      fontSize: '0.4rem',
    }),
    menu: (provided) => ({ // Conteneur du menu déroulant
      ...provided,
      fontSize: '0.4rem',
    }),
    menuList: (provided) => ({ // Liste des options dans le menu déroulant
      ...provided,
      fontSize: '0.4rem',
    }),
    option: (provided) => ({ // Option individuelle dans le menu déroulant
      ...provided,
      fontSize: '0.4rem',
    }),
    group: (provided) => ({ // Conteneur du groupe d'options
      ...provided,
      fontSize: '0.4rem',
    }),
    groupHeading: (provided) => ({ // En-tête du groupe d'options
      ...provided,
      fontSize: '0.4rem',
    }),
  };
  

  return (
    <div>
      <div className="user-dropdown-container">
        <ReactSelect
          styles={customStyles}
          value={selectedUser ? { label: selectedUser, value: selectedUser } : null}
          onChange={(selectedOption) => handleUserChange(selectedOption.value)}
          options={users.map((user) => ({ label: user, value: user }))}
          placeholder="Sélectionnez un utilisateur"
        />
      </div>
      {selectedUser && (
        <div>
          Dernière modification: <span>{lastTime}</span>
        </div>
      )}
    </div>
  );
  
};

export default UserDropdown;
