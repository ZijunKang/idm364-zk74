
export async function load({ page, params, url, fetch }) {
    // 获取数据（在服务器端和客户端都会运行）
    const response = await fetch(`/api/products`)
    const products = await response.json()
    console.log(products);

    // send to +page.svelte
    return {
        products: products,
    };

}

