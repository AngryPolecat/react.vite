import { useLocation, useParams } from 'react-router-dom'

export const ProductDetails = () => {
  const location = useLocation()
  const product = location?.state ? location.state : {}

  return (
    <div className="px-6 py-10">
      {product ? (
        <>
          <h1 className="mb-6 text-3xl font-semibold text-center">Product Details</h1>
          <div className="flex flex-col items-center p-6 bg-white rounded-md">
            <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-700">Price: {product.price}$</p>
            <img className="w-40 h-40 mb-4 rounded-md" src={product.img} alt={product.name} style={{ width: '150px' }} />
          </div>
        </>
      ) : (
        <p className="text-xl font-bold text-center text-red-500">Not Found</p>
      )}
    </div>
  )
}
