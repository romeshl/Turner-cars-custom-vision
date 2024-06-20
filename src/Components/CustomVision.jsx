import useSWR, { mutate } from 'swr';
import { useEffect, useState } from "react";

export default function CustomVision({ image }) {
    const customVisionURL = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/c40f86f9-c0e6-46b5-9535-e3f9c3b0d6ab/classify/iterations/TurnerCars/image";

    const [showData, setShowData] = useState(false);

    useEffect(() => {
        setShowData(false);
    }, [image]);

    async function fetcher(url) {
        if (image) {
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
            const probability = await Object.entries(data)[4][1][0].probability;
            const vehicle = await Object.entries(data)[4][1][0].tagName.toUpperCase();
            if (probability > 0.45) {
                return "Vehicle type is: " + vehicle;
            }
            else {
                return "Unable to detect the type of vehicle. Please try a different image.";
            }
        }
        else {
            return "Please upload an image first.";
        }

    }

    const { data, error, isLoading } = useSWR(customVisionURL, fetcher);

    return (
        <>
            <div className="w-[80%] mx-auto border-2 text-center text-xl bg-blue-100 p-4 border-blue-300 rounded-xl" >
                {isLoading ?
                    <h1>Loading data ...</h1>
                    :
                    error ?
                        <h1>Error occurred while loading data. Error code:</h1>
                        :
                        data ?
                            <div>

                                <p>{showData ? data : "Loading data ..."}</p>
                            </div>
                            :
                            <h1>No data to display.</h1>
                }
            </div>
        </>
    )
}