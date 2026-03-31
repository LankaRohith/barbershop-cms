import { useState, useEffect } from 'react';
import { Upload, Trash2, Image, Loader2 } from 'lucide-react';
import { getAdminGallery, uploadGalleryImage, deleteGalleryImage } from '../../api';
import AdminLayout from './AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useToast } from '../../hooks/useToast.jsx';

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { addToast, ToastContainer } = useToast();

  const [formData, setFormData] = useState({
    caption: '',
    category: 'general',
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getAdminGallery();
      setImages(response.data);
    } catch (error) {
      addToast('Failed to load gallery', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.file;
    const file = fileInput.files[0];
    
    if (!file) {
      addToast('Please select an image', 'error');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      addToast('File size must be under 5MB', 'error');
      return;
    }

    setUploading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);
    formDataToSend.append('caption', formData.caption);
    formDataToSend.append('category', formData.category);

    try {
      await uploadGalleryImage(formDataToSend);
      addToast('Image uploaded successfully');
      setFormData({ caption: '', category: 'general' });
      fileInput.value = '';
      fetchImages();
    } catch (error) {
      addToast(error.response?.data?.detail || 'Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await deleteGalleryImage(id);
      addToast('Image deleted');
      fetchImages();
    } catch (error) {
      addToast('Failed to delete image', 'error');
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>;

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
            <Image className="w-8 h-8 text-barber-gold" />
            Gallery
          </h1>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="card mb-8">
          <h3 className="font-medium text-white mb-4">Upload New Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-1">
              <label className="block text-gray-400 text-sm mb-2">Image (Max 5MB)</label>
              <input
                type="file"
                name="file"
                accept="image/jpeg,image/png,image/webp"
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-barber-gold file:text-barber-900 hover:file:bg-barber-gold-light"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Caption (Optional)</label>
              <input
                type="text"
                placeholder="Image description"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input w-full"
              >
                <option value="general">General</option>
                <option value="haircuts">Haircuts</option>
                <option value="beard">Beard</option>
                <option value="shop">Shop</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload Image
              </>
            )}
          </button>
        </form>

        {/* Gallery Grid */}
        <h3 className="font-medium text-white mb-4">Gallery Images ({images.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image._id} className="group relative aspect-square overflow-hidden rounded-lg bg-barber-800">
              <img
                src={image.url}
                alt={image.caption || 'Gallery image'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <button
                  onClick={() => handleDelete(image._id)}
                  className="self-end text-white hover:text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                {image.caption && (
                  <p className="text-white text-sm truncate">{image.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="card text-center py-12">
            <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No images in gallery yet. Upload your first image above.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryManager;
