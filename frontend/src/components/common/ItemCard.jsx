// components/common/ItemCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({
  id,
  title,
  subtitle,
  description,
  thumbnail,
  detailsUrl,
  className = '',
  imageClassName = '',
  contentClassName = '',
  footerClassName = '',
  rarity = '',
  onClick,
  ...rest
}) => {
  // Определяем класс в зависимости от редкости
  const rarityClass = rarity ? `jade-${rarity.toLowerCase()}` : '';
  
  return (
    <div 
      className={`item-card ${rarityClass} ${className}`}
      onClick={onClick}
      {...rest}
    >
      <div className={`item-image-container ${imageClassName}`}>
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="item-image" />
        ) : (
          <div className="item-image-placeholder">
            <span>{title ? title.charAt(0) : '?'}</span>
          </div>
        )}
      </div>
      
      <div className={`item-content ${contentClassName}`}>
        <h3 className="item-title">{title}</h3>
        {subtitle && <p className="item-subtitle">{subtitle}</p>}
        {description && (
          <p className="item-description">
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </p>
        )}
      </div>
      
      {detailsUrl && (
        <div className={`item-footer ${footerClassName}`}>
          <Link to={detailsUrl} className="btn btn-secondary">
            Подробнее
          </Link>
        </div>
      )}
    </div>
  );
};

export default ItemCard;