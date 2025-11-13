const ACCESS_KEY = 'web3hub_content_access';

export const checkAccess = (): boolean => {
    try {
        const hasAccess = localStorage.getItem(ACCESS_KEY);
        return hasAccess === 'true';
    } catch (error) {
        console.error("Failed to check access from localStorage", error);
        return false;
    }
};

export const grantAccess = (): void => {
    try {
        localStorage.setItem(ACCESS_KEY, 'true');
    } catch (error) {
        console.error("Failed to grant access in localStorage", error);
    }
};