import React, { useState, useRef, useEffect } from 'react';

/**
 * Кастомный компонент выпадающего списка
 * @param {Object} props - Свойства компонента
 * @param {Array} props.options - Массив опций [{id: string, name: string}]
 * @param {string} props.value - Текущее выбранное значение (id)
 * @param {Function} props.onChange - Функция обработчик изменений
 * @param {string} props.placeholder - Текст плейсхолдера
 * @param {string} props.className - Дополнительные классы
 * @returns {JSX.Element} - Элемент компонента
 */
const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Выберите...", 
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.id === value) || null
  );
  
  const selectRef = useRef(null);

  // Обновляем выбранную опцию при изменении значения извне
  useEffect(() => {
    const option = options.find(opt => opt.id === value);
    if (option) {
      setSelectedOption(option);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  // Закрываем dropdown при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.id);
    }
  };

  return (
    <div 
      ref={selectRef} 
      className={`custom-select-container ${isOpen ? 'open' : ''} ${className}`}
    >
      <div 
        className={`custom-select-selected ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>
      </div>
      
      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div
              key={option.id}
              className={`custom-select-option ${selectedOption && selectedOption.id === option.id ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;