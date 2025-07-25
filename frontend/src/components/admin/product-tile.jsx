import { Button } from "../ui/button"
import {Card, CardContent, CardFooter} from "../ui/card"


function AdminProductTile({product, setFormData, setOpenCreateProductSheet,setCurrentedEditedId ,handleDelete}) {
    return(
        <Card className="w-full max-w-sm ax-auto">
            <div className="relative">
                <img 
                src={product?.image} alt={product?.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
                />
            </div>
            <CardContent>
                <h2 className="text-xl font-bold mb-2 MT-2">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className={`${product?.salePrice > 0  ? 'line-through' : "" } text-lg font-semibold text-primary`}>${product?.price}</span>
                   {
                    product?.salePrice <= 0 ? null : <span className="text-lg font-bold">${product?.salePrice}</span>
                   }
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button onClick={() => {
                    setOpenCreateProductSheet(true)
                    setCurrentedEditedId(product?._id)
                    setFormData(product)
                }}>Edit</Button>
                <Button onClick={() => {
                    handleDelete(product._id)
                }}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AdminProductTile