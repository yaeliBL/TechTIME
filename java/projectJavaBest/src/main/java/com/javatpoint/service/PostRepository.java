package com.javatpoint.service;

import com.javatpoint.model.Category;
import com.javatpoint.model.Post;
import com.javatpoint.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public interface PostRepository  extends JpaRepository<Post,Long> {
        Post findAllById(Long ip);
//        List<Post> findAllByUser(User u);
}
