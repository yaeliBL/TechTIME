package com.javatpoint.service;

import com.javatpoint.model.Comment;
import com.javatpoint.model.Post;
import com.javatpoint.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.util.List;
@Component
public interface UserRepository  extends JpaRepository<User,Long> {
    User findAllById(Long iu);
    User findByMail(String m);
}
