import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/productService"

interface HomeProps {

}

export default function Home({ }: HomeProps) {
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    return (
        <>
            <div>
                {products?.map((p) => (
                    <div key={p.id}>
                        <h2>{p.title}</h2>
                    </div>
                ))}
            </div>
        </>
    )
};
