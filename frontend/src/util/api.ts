
export const apiService = {
    
    getName: async (formData: FormData): Promise<string | null> => {
        try {
            const response = await fetch('YOUR_SERVER_ENDPOINT', {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
            });

            if (response.ok) {
            const result = await response.json();
            return JSON.stringify(result);
            } else {
            console.log('Error: could not get name');
            return null;
            }
        } catch (error) {
            console.log('Processing FormData error: ' + (error instanceof Error ? error.message : String(error)));
            return null;
        }
    },

    getIngredients: async (name: string): Promise<string | null> => {
        try {
            const response = await fetch('YOUR_SERVER_ENDPOINT', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: name,
            });
    
            if (response.ok) {
            const result = await response.json();
            return JSON.stringify(result); 
            } else {
            console.log('Error: could not get ingredients');
            return null;
            }
        } catch (error) {
            console.log('Processing Name error: ' + (error instanceof Error ? error.message : String(error)));
            return null;
        }
    },

    getChat: async (name: string, ingredients: string): Promise<string | null> => {
        try {
            const response = await fetch('YOUR_SERVER_ENDPOINT', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                ingredients: ingredients
            })
            });
    
            if (response.ok) {
            const result = await response.json();
            return JSON.stringify(result);
            } else {
            console.log('Error: could not get chat text');
            return null;
            }
        } catch (error) {
            console.log('Processing chat param error: ' + (error instanceof Error ? error.message : String(error)));
            return null;
        }
    }
};