import {
    FunctionComponent as FC,
    useState,
} from 'react';
import { Product } from '../types';

interface Props {
    product: Product;
    onSubmit: (product: Product) => void;
    onCancel: () => void;
}

const ProductEditForm: FC<Props> = ({ product, onSubmit, onCancel }) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product);

    const handleSubmit = () => {
        onSubmit(editedProduct);
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    return (
        <form className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-medium mb-4">Modifier le produit</h2>
            <div className="mb-4">
                <label htmlFor="NomProduit" className="text-gray-700">
                    Nom du produit :
                    <input
                        type="text"
                        name="NomProduit"
                        id="NomProduit"
                        value={editedProduct.NomProduit}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label htmlFor="Prix" className="text-gray-700">
                    Prix :
                    <input
                        type="number"
                        name="Prix"
                        id="Prix"
                        value={editedProduct.Prix}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label htmlFor="Stock" className="text-gray-700">
                    Stock :
                    <input
                        type="number"
                        name="Stock"
                        id="Stock"
                        value={editedProduct.Stock}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                    />
                </label>
            </div>
            <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Sauvegarder</button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleCancel}>Annuler</button>
            </div>
        </form>
    );
};

export default ProductEditForm;