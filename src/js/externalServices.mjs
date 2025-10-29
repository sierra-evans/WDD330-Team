const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad response");
    }
}

export async function getProductByCategory(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}

export async function findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const product =await convertToJson(response);
    return product.Result;
}

export async function checkout(payload) {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
}