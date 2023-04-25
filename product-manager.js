const fs = require ('fs');

class ProductManager {
    constructor() {
        this.path = "./products.json"
        this.products = []
    };

    static id=0; 

    addProduct = async (title, description, price, thumbnail, code, stock) =>{
        ProductManager.id++
        
        let newProduct = {
            title,description,price,thumbnail,code,stock,
            id: ProductManager.id
        };

    this.products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async()=>{
        let result = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(result)
    };
    
    getProducts = async ()=>{
        let result2 = await this.readProducts()
        return console.log(result2)
    };

    getProductsById = async (id)=>{
        let result2 = await this.readProducts()
        if (!result2.find(products => products.id === id)){
            console.log("Error, el produto no se a sido encontrado")
        } else{
            console.log(result2.find(products => products.id === id));
    };

    };

    deleteProductById = async(id)=>{
        let result3 = await this.readProducts();
        let productFilter = result3.filter(products => products.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter));
        console.log("El producto a sido eliminado correctamente")
    };

    updateProducts = async(id,...products) =>{
        await this.deleteProductById(id); 
        let originproduct = await this.readProducts();
        let modifiedProd = [
            {...products, id},
            ...originproduct];  
            await fs.promises.writeFile(this.path, JSON.stringify(modifiedProd))
    };
    
    };
    
    
    const products = new ProductManager
    
    products.getProducts()
     products.addProduct("mandarina","las mejores","1000","https://pbs.twimg.com/media/FcF_UzhXgAAZQm8.jpg","29","37","29")
    //  products.addProduct("manzana","bien dulces","800","https://pbs.twimg.com/media/FcF_UzhXgAAZQm8.jpg","15","46","15")
    //  products.addProduct("banana","ideal para licuado","1200","https://pbs.twimg.com/media/FcF_UzhXgAAZQm8.jpg","17","28","17")
    //  products.addProduct("pera","dulces y deliciosas","900","https://pbs.twimg.com/media/FcF_UzhXgAAZQm8.jpg","45","7","45")
    
    //  products.getProductsById(29)
    //  products.deleteProductById(17)

    // products.updateProducts({
    //     title: 'mandarina',
    //     description: 'las mejores',
    //     price: '1000',
    //     thumbnail:'https://pbs.twimg.com/media/FcF_UzhXgAAZQm8.jpg',
    //     code: '29',
    //     stock: '37',
    //     id: 29
    // });