import React from 'react';
import './GallerySection.css';

const galleryItems = [
  {
    id: 1,
    title: 'Award Ceremony 2023',
    image: '/assets/gallery/image1.jpg',
  },
  {
    id: 2,
    title: 'Bravery Event Highlights',
    image: '/assets/gallery/image2.jpg',
  },
  {
    id: 3,
    title: 'National Bravery Award',
    image: '/assets/gallery/image3.jpg',
  },
];

const GallerySection = () => {
  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-title">Gallery</h2>
      <p className="gallery-subtitle">Memorable Moments from Past Award Functions</p>

      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-card">
            <img src={item.image} alt={item.title} loading="lazy" />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
