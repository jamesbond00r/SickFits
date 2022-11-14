import { useMutation, useQuery } from "@apollo/client"
import gql from "graphql-tag"
import Form from "./styles/Form"
import DisplayError from "./ErrorMessage"
import useForm from "../lib/useForm";

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!){
       Product(where:{id: $id}){
            id
            name
            description
            price
        }
}`

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int 
        ){
            updateProduct(
                id: $id,
                data: {
                    name: $name
                    description: $description
                    price: $price
                }
            ){
                id
                name
                description
                price
            }
        }
`

export default function UpdateProduct({ id }) {

    const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: { id }
    })

  

    const [updateProduct, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT_MUTATION)

    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

    if (loading) return <p>Loaidng...</p>
    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateProduct({
                variables: {
                    id: id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price,
                }
            }).catch(console.error)

        }}>

            <DisplayError error={error || updateError} />

            <fieldset
                aria-busy={updateLoading}
                disabled={updateLoading}
            >
                <label htmlFor="name">
                    Name
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        required
                        type="number"
                        id="price"
                        name="price"
                        placeholder="price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        required
                        id="description"
                        name="description"
                        placeholder="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Product &#9998;</button>
            </fieldset>
        </Form>
    )
}