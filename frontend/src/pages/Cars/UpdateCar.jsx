import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar } from '../../api/car';

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    images: null,
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await getCarById(id);
        setFormData({
          title: data.title,
          description: data.description,
          tags: data.tags.join(', '),
          images: null,
        });
      } catch (err) {
        console.error('Error fetching car details', err);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append('title', formData.title);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('tags', formData.tags);
    for (let i = 0; i < formData.images.length; i++) {
      updatedFormData.append('images', formData.images[i]);
    }

    try {
      await updateCar(id, updatedFormData);
      navigate(`/car/${id}`);
    } catch (err) {
      console.error('Error updating car', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Update Car</h1>
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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Update Car</button>
      </form>
    </div>
  );
};

export default UpdateCar;
