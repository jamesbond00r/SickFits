import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag"
import { useMutation } from '@apollo/client';
import DisplayError from "./ErrorMessage"
import { ALL_PRODUCTS_QUERY } from "./Products"
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
){
  createProduct(data:{
    name: $name
    description: $description
    price: $price
    status: "AVAILABLE"
    photo:{  create:{ image: $image, altText: $name } }
  })
  {
    id
    price
    description
    name

  }
}
`;

export default function CreateProduct() {

    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: "Nice Shoes",
        price: 1234,
        description: "Awsome Shoes!!!"
    });

    const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    })

    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
          const res =  await createProduct()
            clearForm();
            Router.push({
                pathname: `/product/${res.data.createProduct.id}`,
            })
            
        }}>

            <DisplayError error={error} />

            <fieldset
                aria-busy={loading}
                disabled={loading}
            >
                <label htmlFor="name">
                    Image
                    <input
                        required
                        type="file"
                        id="image"
                        name="image"
                        placeholder="Image"
                        onChange={handleChange}
                    />
                </label>
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
                <button type="submit">+ Add Product</button>
            </fieldset>
        </Form>
    )
}
