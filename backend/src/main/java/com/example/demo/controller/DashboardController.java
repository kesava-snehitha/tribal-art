package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.model.Review;
import com.example.demo.model.User;
import com.example.demo.model.WishlistItem;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getDashboardData(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Order> orders = orderRepository.findByUser(user);
        List<Review> reviews = reviewRepository.findByUser(user);
        List<WishlistItem> wishlist = wishlistRepository.findByUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("orders", orders);
        response.put("reviews", reviews);
        response.put("wishlist", wishlist);

        return ResponseEntity.ok(response);
    }
}
