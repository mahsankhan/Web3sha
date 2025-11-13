import React, { useState, useEffect } from 'react';
import { Content } from '../types';

interface CmsSectionProps {
    content: Content[];
    setContent: (updater: (prevContent: Content[]) => Content[]) => void;
}

const CmsForm: React.FC<{
    editingContent: Content | null;
    onSave: (item: Content) => void;
    onCancel: () => void;
}> = ({ editingContent, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (editingContent) {
            setTitle(editingContent.title);
            setDescription(editingContent.description);
            setCategory(editingContent.category);
            setImageUrl(editingContent.imageUrl);
        } else {
            setTitle('');
            setDescription('');
            setCategory('');
            setImageUrl('');
        }
    }, [editingContent]);

    // FIX: Updated handleSubmit to correctly construct the Content object.
    // When editing, it now preserves the existing 'type' and 'demoComponent' properties.
    // When creating new content, it defaults to 'type: "article"' to satisfy the Content interface.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingContent) {
            onSave({
                ...editingContent,
                title,
                description,
                category,
                imageUrl,
            });
        } else {
            onSave({
                id: Date.now().toString(),
                title,
                description,
                category,
                imageUrl,
                type: 'article',
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">{editingContent ? 'Edit Content' : 'Add New Content'}</h3>
            <form onSubmit={handleSubmit} className="bg-card shadow-lg rounded-lg p-8 space-y-6">
                 <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                 <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                    <input type="url" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <div className="flex justify-end gap-4">
                     <button type="button" onClick={onCancel} className="bg-gray-700/50 hover:bg-gray-600/50 text-light font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Cancel
                    </button>
                    <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300">
                        {editingContent ? 'Save Changes' : 'Add Content'}
                    </button>
                </div>
            </form>
        </div>
    );
}

const CmsSection: React.FC<CmsSectionProps> = ({ content, setContent }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingContent, setEditingContent] = useState<Content | null>(null);

    const handleAddNew = () => {
        setEditingContent(null);
        setIsFormVisible(true);
    };

    const handleEdit = (item: Content) => {
        setEditingContent(item);
        setIsFormVisible(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this content? This cannot be undone.')) {
            setContent(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleSave = (item: Content) => {
        if (editingContent) {
            setContent(prev => prev.map(p => p.id === item.id ? item : p));
        } else {
            setContent(prev => [item, ...prev]);
        }
        setIsFormVisible(false);
        setEditingContent(null);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setEditingContent(null);
    };

    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Manage Learning Content</h2>
                <p className="max-w-2xl mx-auto text-gray-400">Add, edit, or delete articles and tutorials from the "Learn" section. Changes are saved to your browser.</p>
            </div>

            {isFormVisible ? (
                <CmsForm editingContent={editingContent} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <>
                    <div className="flex justify-end mb-8">
                        <button onClick={handleAddNew} className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                            + Add New Content
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
                                            <p className="text-sm text-gray-400">{item.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300 font-medium py-1 px-3 rounded-md transition duration-300">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium py-1 px-3 rounded-md transition duration-300">Delete</button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-gray-400 py-8">No content found. Click "Add New Content" to get started.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default CmsSection;