import { INITIAL_RESOURCES_CONTENT } from '../constants';
import { Resource } from '../types';

const RESOURCE_CONTENT_STORAGE_KEY = 'web3hub_resource_content';

export const getResourceContent = (): Resource[] => {
    try {
        const storedContent = localStorage.getItem(RESOURCE_CONTENT_STORAGE_KEY);
        if (storedContent) {
            return JSON.parse(storedContent);
        }
        localStorage.setItem(RESOURCE_CONTENT_STORAGE_KEY, JSON.stringify(INITIAL_RESOURCES_CONTENT));
        return INITIAL_RESOURCES_CONTENT;
    } catch (error) {
        console.error("Failed to get resource content from localStorage", error);
        return INITIAL_RESOURCES_CONTENT;
    }
};

export const saveResourceContent = (content: Resource[]): void => {
    try {
        localStorage.setItem(RESOURCE_CONTENT_STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
        console.error("Failed to save resource content to localStorage", error);
    }
};