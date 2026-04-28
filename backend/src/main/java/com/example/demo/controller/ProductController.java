package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // A special endpoint to instantly seed the database with real products!
    @PostMapping("/seed")
    public ResponseEntity<String> seedProducts() {
        productRepository.deleteAll(); // Clear existing to reset with the exact 7 frontend products

        List<Product> products = new ArrayList<>();

        Product p1 = new Product();
        p1.setName("Wooden Basket");
        p1.setArtisan("Lakshmi Artisans");
        p1.setPrice(1299.0);
        p1.setCategory("Textiles");
        p1.setDescription("Traditional handwoven basket");
        p1.setImage("/src/assets/1.jpg");
        p1.setVerified(true);
        products.add(p1);

        Product p2 = new Product();
        p2.setName("Tribal Pottery");
        p2.setArtisan("Abhijit Pottery");
        p2.setPrice(899.0);
        p2.setCategory("Pottery");
        p2.setDescription("Authentic clay pottery");
        p2.setImage("/src/assets/2.webp");
        p2.setVerified(true);
        products.add(p2);

        Product p3 = new Product();
        p3.setName("Wooden Mask");
        p3.setArtisan("Kumar Crafts");
        p3.setPrice(2499.0);
        p3.setCategory("Sculpture");
        p3.setDescription("Carved wooden mask");
        p3.setImage("/src/assets/3.webp");
        p3.setVerified(true);
        products.add(p3);

        Product p4 = new Product();
        p4.setName("Beaded Necklace");
        p4.setArtisan("Priya Jewelry");
        p4.setPrice(649.0);
        p4.setCategory("Jewelry");
        p4.setDescription("Traditional beaded necklace");
        p4.setImage("/src/assets/4.webp");
        p4.setVerified(true);
        products.add(p4);

        Product p5 = new Product();
        p5.setName("Ceramic Plates");
        p5.setArtisan("Modern Pottery");
        p5.setPrice(1899.0);
        p5.setCategory("Pottery");
        p5.setDescription("Beautiful ceramic plates");
        p5.setImage("/src/assets/ceramic-plate.png");
        p5.setVerified(true);
        products.add(p5);

        Product p6 = new Product();
        p6.setName("Tribal Painting");
        p6.setArtisan("Saraswati Artists");
        p6.setPrice(2499.0);
        p6.setCategory("Paintings");
        p6.setDescription("Colorful tribal painting");
        p6.setImage("/src/assets/tribal-painting.png");
        p6.setVerified(true);
        products.add(p6);

        Product p7 = new Product();
        p7.setName("Wooden Sculpture");
        p7.setArtisan("Tribal Woodcrafts");
        p7.setPrice(3499.0);
        p7.setCategory("Sculpture");
        p7.setDescription("Tall hand-carved wooden sculpture");
        p7.setImage("/src/assets/wooden-sculpture.png");
        p7.setVerified(true);
        products.add(p7);

        productRepository.saveAll(products);

        return ResponseEntity.ok("Successfully seeded 7 exact frontend products into the database!");
    }
}
