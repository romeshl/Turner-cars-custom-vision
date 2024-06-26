import useSWR from 'swr';

export default function CustomVision({ image  }) {
    const customVisionURL = import.meta.env.VITE_API_ENDPOINT;

    const { data, error, isLoading, isValidating } = useSWR(customVisionURL, fetcher);

    async function fetcher(url) {
        console.log("Component");
        console.log(image);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Prediction-Key": import.meta.env.VITE_PRODUCTION_KEY,
                "Content-Type": "application/octet-stream",
            },
            body: image
        });
        const data = await response.json();
        const probability = await Object.entries(data)[4][1][0].probability;
        const vehicle = await Object.entries(data)[4][1][0].tagName.toUpperCase();
        if (probability > 0.45) {
            return "Vehicle type is: " + vehicle;
        }
        else {
            return "Unable to detect the type of vehicle. Please try a different image.";
        }
    }

    return (
        <>
            <div className="w-[80%] mx-auto border-2 text-center text-xl bg-blue-100 p-4 border-blue-300 rounded-xl" >
                {isLoading || isValidating ?
                    <h1>Loading data ...</h1>
                    :
                    error ?
                        <h1>Error occurred while loading data.</h1>
                        :
                        data ?
                            <p>{data}</p>
                            :
                            <h1>No data to display.</h1>
                }
            </div>
        </>
    )
}