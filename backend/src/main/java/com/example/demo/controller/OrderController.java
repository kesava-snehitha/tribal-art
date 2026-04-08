package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(new Date());
        order.setStatus("Processing");
        order.setSubtotal(request.getSubtotal());
        order.setTax(request.getTax());
        order.setShipping(request.getShipping());
        order.setTotal(request.getTotal());

        List<OrderItem> items = new ArrayList<>();
        for (OrderRequest.ItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId()).orElse(null);
            if (product != null) {
                OrderItem item = new OrderItem();
                item.setOrder(order);
                item.setProduct(product);
                item.setQuantity(itemReq.getQuantity());
                item.setPrice(itemReq.getPrice());
                items.add(item);
            }
        }
        order.setItems(items);
        orderRepository.save(order);

        return ResponseEntity.ok(order);
    }

    public static class OrderRequest {
        private Long userId;
        private double subtotal;
        private double tax;
        private double shipping;
        private double total;
        private List<ItemRequest> items;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public double getSubtotal() { return subtotal; }
        public void setSubtotal(double subtotal) { this.subtotal = subtotal; }
        public double getTax() { return tax; }
        public void setTax(double tax) { this.tax = tax; }
        public double getShipping() { return shipping; }
        public void setShipping(double shipping) { this.shipping = shipping; }
        public double getTotal() { return total; }
        public void setTotal(double total) { this.total = total; }
        public List<ItemRequest> getItems() { return items; }
        public void setItems(List<ItemRequest> items) { this.items = items; }

        public static class ItemRequest {
            private Long productId;
            private int quantity;
            private double price;

            public Long getProductId() { return productId; }
            public void setProductId(Long productId) { this.productId = productId; }
            public int getQuantity() { return quantity; }
            public void setQuantity(int quantity) { this.quantity = quantity; }
            public double getPrice() { return price; }
            public void setPrice(double price) { this.price = price; }
        }
    }
}
