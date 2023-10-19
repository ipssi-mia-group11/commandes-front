import {
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks';
import { Product } from '../types';
import {
    ProductEditForm,
} from '../components';
import { toast } from 'react-toastify';

const ProductsPage = () => {
    const navigate = useNavigate();
    const api = useApi();

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'ID'> | null>(null);

    const handleProductCreateSubmit = async (product: Product) => {
        try {
            await api.createProduct(product);
            setIsEditPopupOpen(false);
            navigate('/products');
        } catch (error) {
            toast.error('Une erreur est survenue.');
        }
    };

    const handleProductEditSubmit = async (product: Product) => {
        try {
            await api.updateProductById(product.ID.toString(), product);
            setIsEditPopupOpen(false);
            navigate('/products');
        } catch (error) {
            toast.error('Une erreur est survenue.');
        }
    };

    const handleProductDeleteSubmit = async (product: Product) => {
        if (window.confirm('Êtes-vous sûr(e) de vouloir supprimer ce produit ?')) {
            try {
                await api.deleteProductById(product.ID.toString());
                navigate('/products');
            } catch (error) {
                toast.error('Une erreur est survenue.');
            }
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (products.length > 0) {
                return;
            }
            
            setIsLoading(true);
            try {
                const products = await api.findAllProducts();
                setProducts(products);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [api, products]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {isEditPopupOpen && (editedProduct || newProduct) && (<>
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 z-50" />
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <ProductEditForm
                        product={(editedProduct || newProduct) as Product}
                        onSubmit={editedProduct ? handleProductEditSubmit : handleProductCreateSubmit}
                        onCancel={() => {
                            setIsEditPopupOpen(false);
                            setEditedProduct(null);
                            setNewProduct(null);
                        }}
                    />
                </div>
            </>)}
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => {
                setNewProduct({
                    NomProduit: '',
                    Prix: 0,
                    Stock: 0,
                });
                setIsEditPopupOpen(true);
            }}>
                Ajouter un produit
            </button>
            <table className={'min-w-full divide-y divide-gray-200'}>
                <thead className={'bg-gray-50'}>
                    <tr className={'text-xs font-medium text-gray-500 uppercase'}>
                        <th className={'px-6 py-3 text-left tracking-wider w-full'}>Nom du produit</th>
                        <th className={'px-6 py-3 text-right tracking-wider w-auto'}>Prix</th>
                        <th className={'px-6 py-3 text-right tracking-wider w-auto'}>Quantité disponible</th>
                        <th className={'px-6 py-3 text-right tracking-wider sr-only'}>Actions</th>
                    </tr>
                </thead>
                <tbody className={'bg-white divide-y divide-gray-200'}>
                    {products.map((product) => (
                        <tr key={product.ID}>
                            <td className={'px-6 py-4 whitespace-nowrap space-x-4'}>{product.NomProduit}</td>
                            <td className={'px-6 py-4 whitespace-nowrap space-x-4 text-right'}>{product.Prix.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                            <td className={'px-6 py-4 whitespace-nowrap space-x-4 text-right'}>{product.Stock}</td>
                            <td className={'px-6 py-4 whitespace-nowrap space-x-4'}>
                                <button className={'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'} onClick={() => {
                                    setEditedProduct(product);
                                    setIsEditPopupOpen(true);
                                }}>Modifier</button>
                                <button className={'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'} onClick={() => handleProductDeleteSubmit(product)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ProductsPage;