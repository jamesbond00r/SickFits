import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import Head from "next/head"
import Link from "next/link"
import PaginationStyles from "./styles/PaginationStyles"
import DisplayError from "./ErrorMessage"
import { perPage } from "../config"

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY{
    _allProductsMeta{
        count
    }
}`

export default function Pagination({ page }) {
    const { error, loading, data } = useQuery(PAGINATION_QUERY)

    if (loading) return null
    if (error) return <DisplayError error={error} />

    const { count } = data._allProductsMeta
    const pageCount = Math.ceil(count / perPage)

    return (<PaginationStyles>
        <Head>
            <title>Sick Fits - Page {page} </title>
        </Head>

        {page > 1 ? <Link href={`/products/${parseInt(page) - 1}`}> &#x2190; Prev</Link>
            : <a aria-disabled={true}> &#x2190; Prev</a>
        }
        <p> {page} of {pageCount}</p>
        <p>{count} Items Total</p>

        {page >= pageCount ? <a aria-disabled={true}>Next  &rarr;</a>
            : <Link href={`/products/${parseInt(page) + 1}`}>Next  &rarr;</Link>
        }

     </PaginationStyles>)
}