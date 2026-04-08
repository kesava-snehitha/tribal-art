package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @PostMapping("/calculate")
    public CartCalculationResponse calculateCart(@RequestBody List<CartItemDTO> items) {
        double subtotal = 0;
        for (CartItemDTO item : items) {
            subtotal += item.getPrice() * item.getQuantity();
        }
        
        double tax = subtotal * 0.18; // 18% GST (same as frontend simulation)
        double shipping = subtotal > 500 || subtotal == 0 ? 0 : 50;
        double total = subtotal + tax + shipping;

        return new CartCalculationResponse(subtotal, tax, shipping, total);
    }

    public static class CartItemDTO {
        private Long id;
        private double price;
        private int quantity;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    public static class CartCalculationResponse {
        private double subtotal;
        private double tax;
        private double shipping;
        private double total;

        public CartCalculationResponse(double subtotal, double tax, double shipping, double total) {
            this.subtotal = subtotal;
            this.tax = tax;
            this.shipping = shipping;
            this.total = total;
        }

        public double getSubtotal() { return subtotal; }
        public double getTax() { return tax; }
        public double getShipping() { return shipping; }
        public double getTotal() { return total; }
    }
}
