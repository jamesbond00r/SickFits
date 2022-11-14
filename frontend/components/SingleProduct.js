import { gql, useQuery } from "@apollo/client"
import DisplayError from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import Head from "next/head"
import styled from "styled-components";


const ProductStyles = styled.div`
    display: grid;
    grid-auto-flow: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    justify-content: center;
    align-items: top: ;;
    gap: 2rem;
    img {
        width: 100%;
        object-fit: contain;
    }
`


const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!){
  Product(where: {
    id: $id
  }){
    name
    price
    description
    id
    photo{
        image{
            publicUrlTransformed
        }
    }
  }
}`


export default function SingleProduct({ id }) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
        variables: {
            id: id
        }
    });

    if (loading) return <p>Loading...</p>
    if (error) return <DisplayError error={error} />
    return <ProductStyles>
        <Head>
            <title>Sick Fits | {data.Product.name} </title>
        </Head>
        <img src={data.Product.photo.image.publicUrlTransformed} alt={data.Product.name} />
        <div className="details">
            <h2>{data.Product.name}</h2>
            <p>{data.Product.description}</p>
            <p>{formatMoney(data.Product.price)}</p>
        </div>


    </ProductStyles>

}