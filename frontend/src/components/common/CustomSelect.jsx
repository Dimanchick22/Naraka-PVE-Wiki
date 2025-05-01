import React, { useState, useRef, useEffect } from 'react';

/**
 * Улучшенный компонент выпадающего списка
 * @param {Object} props - Свойства компонента
 * @param {Array} props.options - Массив опций [{id: string, name: string}]
 * @param {string} props.value - Текущее выбранное значение (id)
 * @param {Function} props.onChange - Функция обработчик изменений
 * @param {string} props.placeholder - Текст плейсхолдера
 * @param {string} props.className - Дополнительные классы
 * @param {boolean} props.disabled - Флаг блокировки селекта
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

  // Открытие/закрытие выпадающего списка
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Обработчик выбора опции
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.id);
    }
  };

  // Обработчик нажатия клавиш (доступность)
  const handleKeyDown = (event) => {
    if (disabled) return;
    
    // Нажатие Enter или Space открывает/закрывает список
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
    
    // Нажатие Escape закрывает список
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
    
    // Навигация с помощью стрелок
    if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault();
      
      const currentIndex = selectedOption 
        ? options.findIndex(opt => opt.id === selectedOption.id)
        : -1;
      
      let newIndex;
      if (event.key === 'ArrowDown') {
        newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      }
      
      const newOption = options[newIndex];
      if (newOption) {
        handleSelect(newOption);
      }
    }
  };

  return (
    <div 
      ref={selectRef} 
      className={`custom-select-container ${isOpen ? 'open' : ''} ${className}`}
      onKeyDown={handleKeyDown}
    >
      <div 
        className={`custom-select-selected ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={toggleDropdown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>
      </div>
      
      {isOpen && (
        <div 
          className="custom-select-options"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`custom-select-option ${selectedOption && selectedOption.id === option.id ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(option)}
              role="option"
              aria-selected={selectedOption && selectedOption.id === option.id}
              tabIndex={0}
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