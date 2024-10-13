import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiService } from '../util/api'; //

interface IngredientsProps {
  name: string,
  class: classification
}

type classification = "Unprocessed" | "Processed" | "Ultraprocessed"

const Results: React.FC = () => {
  const location = useLocation();
  const formData = location.state as FormData | null;

  // State to display image
  const [imageUrl, setImageUrl] = useState<string | null>(null);  

  // Dummy data
  const dummyName: string = "Hot Dog"
  const dummyIngredients = "Beef, Cherry Powder, Modified food starch, Yeast extract, Salt"

  const [name, setName] = useState<string>("");
  //const [ingredients, setIngredients] = useState<IngredientsProps[]>([]);
  const [ingredients, setIngredients] = useState<string>("");

  const [score, setScore] = useState<string>("");
  const [chatText, setChatText] = useState<string | null>(null);

  useEffect(() => {
    //console.log(formData)
    if (formData) {
      displayImage(formData)
      callAPIServices(formData)
    } 
  }, [formData]);

  const displayImage = async (formData: FormData) => {
    const imageBlob = formData.get('image') as string;
      if (imageBlob) {      
        setImageUrl(imageBlob);
      } else {
        console.log('Image is null, could not load FormData');
      }
  }

  // Call API services amd request data
  const callAPIServices = async(formData: FormData) => {
    try {
      // Get the name of the food in the image
      const fetchedName = await apiService.getName(formData); 
      //const fetchedName = dummyName

      //Get the ingredients off the food in the image
      if (fetchedName) {
        console.log("fetched name: ", fetchedName)
        setName(JSON.parse(fetchedName).name);

        const fetchedIngredients = await apiService.getIngredients(JSON.parse(fetchedName));

        if (fetchedIngredients) {
            setIngredients(JSON.stringify(fetchedIngredients))

          const data = JSON.parse(fetchedIngredients)
          setScore(data.score)

          const formattedIngredients = fetchedIngredients //toIngredientsProps(fetchedIngredients);
          console.log(fetchedIngredients)
          setIngredients(JSON.stringify(formattedIngredients));
        } else {
          console.log("Getting ingredients from Hot Dog didn't work")
        }

        // Get funny feedback on the food in the image :D
        if (fetchedIngredients) {
          const fetchedChatText = await apiService.getChat("Hot Dog", fetchedIngredients); 
          console.log("fetched chat text: ", fetchedChatText)
          setChatText(fetchedChatText);
        } else {
          console.log("Getting chat from name and ingredients didn't work.")
        }
      }

    } catch (error) {
      console.error("Error calling API services: ", error);
    } finally {
      //setIsProcessing(false);
      console.log("All data successfully required!")
    }
  }

  // const toIngredientsProps = (fetchedIngredients: string): IngredientsProps[] => {
  //   try {
  //     const ingredients = JSON.parse(fetchedIngredients);
  //     return ingredients.map((ingredient: any) => ({
  //       name: ingredient.name || '',
  //       class: (ingredient.class as classification) || 'Unprocessed'
  //     }));
  //   } catch (error) {
  //     console.error("Error parsing ingredients:", error);
  //     return [];
  //   }
  //}

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[700px] h-full bg-black shadow-lg p-8 overflow-y-auto">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-start mb-4">
            <div className="flex flex-col items-center mb-4">
              {imageUrl ? (
                <img src={imageUrl} alt="Product" className="w-[20.5rem] h-[20.5rem] rounded-lg object-cover mb-4" />
              ) : (
                <div className="w-full h-[20.5rem] bg-gray-500 rounded-lg mb-4"></div>
              )}
              <div className="text-white text-6xl font-bold text-center">{name}</div>
            </div>
            <div className="text-white text-4xl font-bold ml-4 mt-[10.25rem]">{score} {chatText} </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 h-4 bg-pink-500 rounded-l-full"></div>
            <div className="w-1/2 h-4 bg-blue-500 rounded-r-full"></div>
          </div>
          <div className="text-white text-sm mb-4">
            {ingredients}
          </div>
          <button className="w-full bg-pink-500 text-white py-2 rounded-full text-lg font-bold">
            Chat
          </button>
        </div>
      </div>
    </div>
  );

};

export default Results;