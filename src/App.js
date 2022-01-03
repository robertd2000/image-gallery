import { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [term, setTerm] = useState('')

  useEffect(() => {
    const f = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXEBAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
        const result = await response.json()
        setImages(result.hits)
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }  
    }

    f()
  }, [term])

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={setTerm} /> 
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No images found</h1>}
      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard  key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;
