import React, { useState, useEffect } from 'react';
import { Resource } from '../types';

interface ResourcesCmsSectionProps {
    content: Resource[];
    setContent: (updater: (prevContent: Resource[]) => Resource[]) => void;
}

const ResourceForm: React.FC<{
    editingResource: Resource | null;
    onSave: (item: Resource) => void;
    onCancel: () => void;
}> = ({ editingResource, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'Template' | 'E-Book' | 'Checklist' | 'Guide'>('Template');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (editingResource) {
            setTitle(editingResource.title);
            setDescription(editingResource.description);
            setType(editingResource.type);
            setImageUrl(editingResource.imageUrl);
        } else {
            setTitle('');
            setDescription('');
            setType('Template');
            setImageUrl('');
        }
    }, [editingResource]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: editingResource ? editingResource.id : Date.now().toString(),
            title,
            description,
            type,
            imageUrl,
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">{editingResource ? 'Edit Resource' : 'Add New Resource'}</h3>
            <form onSubmit={handleSubmit} className="bg-card shadow-lg rounded-lg p-8 space-y-6">
                 <div>
                    <label htmlFor="res-title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input type="text" id="res-title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                 <div>
                    <label htmlFor="res-description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea id="res-description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>
                 <div>
                    <label htmlFor="res-type" className="block text-sm font-medium text-gray-300 mb-2">Resource Type</label>
                    <select id="res-type" value={type} onChange={e => setType(e.target.value as any)} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Template</option>
                        <option>E-Book</option>
                        <option>Checklist</option>
                        <option>Guide</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="res-imageUrl" className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                    <input type="url" id="res-imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <div className="flex justify-end gap-4">
                     <button type="button" onClick={onCancel} className="bg-gray-700/50 hover:bg-gray-600/50 text-light font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Cancel
                    </button>
                    <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                        {editingResource ? 'Save Changes' : 'Add Resource'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const ResourcesCmsSection: React.FC<ResourcesCmsSectionProps> = ({ content, setContent }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);

    const handleAddNew = () => {
        setEditingResource(null);
        setIsFormVisible(true);
    };

    const handleEdit = (item: Resource) => {
        setEditingResource(item);
        setIsFormVisible(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this resource? This cannot be undone.')) {
            setContent(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleSave = (item: Resource) => {
        if (editingResource) {
            setContent(prev => prev.map(p => p.id === item.id ? item : p));
        } else {
            setContent(prev => [item, ...prev]);
        }
        setIsFormVisible(false);
        setEditingResource(null);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditingResource(null);
    };

    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Manage Templates & Resources</h2>
                <p className="max-w-2xl mx-auto text-gray-400">Add, edit, or delete items from the "Templates & Resources" section.</p>
            </div>

            {isFormVisible ? (
                <ResourceForm editingResource={editingResource} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <>
                    <div className="flex justify-end mb-8">
                        <button onClick={handleAddNew} className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                            + Add New Resource
                        </button>
                    </div>
                    <div className="bg-card rounded-lg shadow-lg p-4 sm:p-6">
                        <div className="space-y-4">
                            {content.length > 0 ? content.map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-background/50 rounded-md gap-4">
                                    <div className="flex items-center gap-4 flex-grow">
                                        <img src={item.imageUrl} alt={item.title} className="w-20 h-16 object-cover rounded-md hidden sm:block" />
                                        <div>
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <p className="text-sm text-primary">{item.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300 font-medium py-1 px-3 rounded-md transition duration-300">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium py-1 px-3 rounded-md transition duration-300">Delete</button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-gray-400 py-8">No resources found. Click "Add New Resource" to get started.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default ResourcesCmsSection;