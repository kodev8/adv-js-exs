import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const statusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200
    }
];

app.get('/health', (req, res) => {
    res.status(statusCodes.OK).json({ message: 'Server is up and running' });
});

app.get('/products', (req, res) => {
    res.status(statusCodes.OK).json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === parseInt(id));
    if (!product) {
        res.status(statusCodes.NOT_FOUND).json({ error: 'Product not found' });
        return;
    }
    res.status(statusCodes.OK).json(product);
});

app.post('/products', (req, res) => {
    const { id, name, price } = req.body;
    // did not include error handling for types for simplicity
    if (!id || !name || !price) {
        res.status(statusCodes.BAD_REQUEST).json({ error: 'Missing required fields' });
        return;
    }
    products.push({ id, name, price });
    res.status(statusCodes.CREATED).json({
        message: 'Product created successfully'
    })
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const productIndex = products.findIndex(product => product.id === parseInt(id));
    if (productIndex === -1) {
        res.status(statusCodes.NOT_FOUND).json({ error: 'Product not found' });
        return;
    }
    products[productIndex] = { ...products[productIndex], name, price };
    res.status(statusCodes.OK).json({
        message: 'Product updated successfully',
        product: products[productIndex]
    });
});

app.delete('/products/:id', (req, res) => {
    // did not include error handling for unique ids for simplicity
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === parseInt(id));
    if (productIndex === -1) {
        res.status(statusCodes.NOT_FOUND).json({ error: 'Product not found' });
        return;
    }
    products.splice(productIndex, 1);
    res.status(statusCodes.NO_CONTENT).json();
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});