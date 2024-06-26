// Importing useSWR hook for data fetching
import useSWR from 'swr';

const PREDICTION_THRESHOLD = 0.45; // Setting a threshold for prediction probability

// CustomVision component definition
export default function CustomVision({ image }) {
    // Retrieving the API endpoint from environment variables
    const customVisionURL = import.meta.env.VITE_API_ENDPOINT;

    // Using the SWR hook for data fetching with a custom fetcher function
    const { data, error, isLoading, isValidating } = useSWR(customVisionURL, fetcher);

    // fetcher function to make a POST request to the custom vision API
    async function fetcher(url) {
        // Making a POST request to the custom vision API
        const response = await fetch(url, {
            method: "POST",
            headers: {
                // Using Prediction-Key from environment variables for authentication
                "Prediction-Key": import.meta.env.VITE_PRODUCTION_KEY,
                // Setting the content type as octet-stream for the image data
                "Content-Type": "application/octet-stream",
            },
            body: image // Sending the image as the request body
        });
        // Parsing the JSON response from the API
        const data = await response.json();
        // Extracting the probability and vehicle type from the response
        const probability = await Object.entries(data)[4][1][0].probability;
        const vehicle = await Object.entries(data)[4][1][0].tagName.toUpperCase();
        // Checking if the probability is greater than a threshold to ensure accuracy
        if (probability > PREDICTION_THRESHOLD) {
            // Returning the vehicle type if the probability is high enough
            return "Vehicle type is: " + vehicle;
        } else {
            // Returning an error message if the vehicle type cannot be reliably determined
            return "Unable to detect the type of vehicle. Please try a different image.";
        }
    }

    console.log(import.meta.env.VITE_API_ENDPOINT, import.meta.env.VITE_PRODUCTION_KEY);
    // Rendering the component UI
    return (
        <>
            <div className="w-[80%] mx-auto border-2 text-center text-xl bg-blue-100 p-4 border-blue-300 rounded-xl">
                {isLoading || isValidating ?
                    // Displaying a loading message while the data is being fetched
                    <h1>Loading data ...</h1>
                    :
                    error ?
                        // Displaying an error message if an error occurred during data fetching
                        <h1>Error occurred while loading data.</h1>
                        :
                        data ?
                            // Displaying the fetched data (vehicle type)
                            <p>{data}</p>
                            :
                            // Displaying a message when no data is available
                            <h1>No data to display.</h1>
                }
            </div>
        </>
    )
}