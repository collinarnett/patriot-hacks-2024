import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { apiService } from '../util/api'; //

interface FormDataProps {
  formData: FormData | null
}

interface IngredientsProps {
  name: string,
  class: classification
}

type classification = "Unprocessed" | "Processed" | "Ultraprocessed"

const Results: React.FC<FormDataProps> = ({ formData }) => {
  // State to display image
  const [imageUrl, setImageUrl] = useState<string | null>(null);  

  // State to send data (image, name, ingredients)
  //const [isProcessing, setIsProcessing] = useState(false);

  const [name, setName] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<IngredientsProps[]>([]);
  const [chatText, setChatText] = useState<string | null>(null);  

  useEffect(() => {   
    if (formData) {
      displayImage(formData)
      //callAPIServices(formData)
    } 
  }, [formData]);

  // Extract the image file from FormData and create a local URL
  const displayImage = async (formData: FormData) => {
    const imageFile = formData.get('image') as File;
      if (imageFile) {      
        console.log('Image is not null');
        const url = URL.createObjectURL(imageFile);
        setImageUrl(url);
        return () => URL.revokeObjectURL(url);


      } else {
        console.log('Image is null, could not load FormData');
      }
  }

  // Call API services amd request data
  const callAPIServices = async(formData: FormData) => {
    try {
      // Get the name of the food in the image
      const fetchedName = await apiService.getName(formData);
      setName(fetchedName); 

      // Get the ingredients off the food in the image
      if (fetchedName) {
        const fetchedIngredients = await apiService.getIngredients(fetchedName);
        if (fetchedIngredients) {
          const formattedIngredients = toIngredientsProps(fetchedIngredients);
          setIngredients(formattedIngredients);
        }

        // Get funny feedback on the food in the image :D
        if (fetchedIngredients) {
          const fetchedChatText = await apiService.getChat(fetchedName, fetchedIngredients); 
          setChatText(fetchedChatText);
        }
      }

    } catch (error) {
      console.error("Error calling API services: ", error);
    } finally {
      //setIsProcessing(false);
      console.log("All data successfully required!")
    }
  }

  const toIngredientsProps = (fetchedIngredients: string): IngredientsProps[] => {
    try {
      const ingredients = JSON.parse(fetchedIngredients);
      return ingredients.map((ingredient: any) => ({
        name: ingredient.name || '',
        class: (ingredient.class as classification) || 'Unprocessed'
      }));
    } catch (error) {
      console.error("Error parsing ingredients:", error);
      return [];
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-black text-white">
      <div className="mb-4">
        <div className="w-48 h-48 mx-auto relative">
          <div className="absolute inset-0 rounded-lg shadow-[0_0_10px_#39ff14,0_0_20px_#39ff14,0_0_30px_#39ff14,0_0_40px_#39ff14] z-10"></div>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Uploaded food" 
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gray-500 rounded-lg flex items-center justify-center">
              <span className="text-gray-300 text-sm">No image</span>
            </div>
          )}
        </div>
      </div>
      
      {name && (
        <h2 className="text-xl font-bold mb-2 text-center">
          {name}
        </h2>
      )}
      
      {ingredients.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="mb-1">
                {ingredient.name} - <span className="font-medium">{ingredient.class}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {chatText && (
        <div className="bg-blue-900 p-3 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-300">Feedback:</h3>
          <p className="text-blue-100">{chatText}</p>
        </div>
      )}
    </div>
  );

};

export default Results;