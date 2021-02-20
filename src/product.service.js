class ProductService {
    addProduct(data) {
        db.collection("Products").doc(randomId).set({...product, id: randomId})
    }
}