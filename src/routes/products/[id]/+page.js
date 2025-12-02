
export async function load({ page, params, url, fetch }) {
    const response = await fetch(`/api/products?id=${params.id}`)
    const products = await response.json();

    // send to +page.svelte
    return {
        product: products.length > 0 ? products[0] : null,
    };

}
