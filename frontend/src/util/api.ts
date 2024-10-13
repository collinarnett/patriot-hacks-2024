
export const apiService = {
    
    getName: async (formData: FormData): Promise<string | null> => {
        try {
            const response = await fetch('http://192.168.1.164:3000/api/image', {
            method: 'POST',
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
            const response = await fetch('http://192.168.1.164:3000/api/ingredients', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name }),
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
            const response = await fetch('http://192.168.1.164:3000/api/classification', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
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