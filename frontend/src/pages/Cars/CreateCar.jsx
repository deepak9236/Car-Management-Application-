import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../../api/car';

const CreateCar = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    images: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('tags', formData.tags);
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSubmit.append('images', formData.images[i]);
    }

    try {
      await createCar(formDataToSubmit);
      navigate('/');
    } catch (err) {
      console.error('Error creating car', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Add a New Car</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Car Title"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Car Description"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
