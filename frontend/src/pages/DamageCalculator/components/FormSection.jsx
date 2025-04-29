import React from "react";

/**
 * Компонент секции формы
 * @param {Object} props - Свойства компонента
 * @param {string} props.title - Заголовок секции
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @returns {JSX.Element} - Элемент компонента
 */
const FormSection = ({ title, children }) => {
  return (
    <div className="form-section">
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );
};

export default FormSection;
