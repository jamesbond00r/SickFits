import Products from "../../components/Products";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/dist/client/router";

export default function Productspage() {
    const { query } = useRouter();
    return <div>
        <Pagination page={query.page || 1} />
        <Products page={query.page || 1} />
        <Pagination page={query.page || 1} />
    </div>
}