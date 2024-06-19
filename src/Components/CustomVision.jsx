import useSWR, { mutate } from 'swr';
import { useEffect, useState } from "react";

export default function CustomVision({ image }) {
    const customVisionURL = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/c40f86f9-c0e6-46b5-9535-e3f9c3b0d6ab/classify/iterations/TurnerCars/image";

    const [showData, setShowData] = useState(false);

    useEffect(() => {
        setShowData(false);
    }, [image]);

    async function fetcher(url) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Prediction-Key": "ebd9430dfce643debe391e0384855ebd",
                "Content-Type": "application/octet-stream",
            },
            body: image
        });
        const data = await response.json();
        setShowData(true);
        return data;

    }

    const { data, error, isLoading } = useSWR(customVisionURL, fetcher);
    

     //   console.log(Object.entries(data));
    
    
    return (
        <>
            <div className='my-[100px] mx-auto w-[500px] p-[20px] border font-mono'>
                {isLoading ?
                    <h1>Loading countries data ...</h1>
                    :
                    error ?
                        <h1>Error occurred while loading data. Error code:</h1>
                        :
                        data ?
                            <div>
                            
                                <p>{showData ? Object.entries(data)[4][1][0].tagName.toUpperCase(): "Loading data"}</p>
                            </div>
                            :
                            <h1>No data to display.</h1>
                }
            </div>
        </>
    )
}