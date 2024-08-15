package com.javatpoint.controller;

import com.javatpoint.dto.PostDTO;
import com.javatpoint.dto.UserDTO;
import com.javatpoint.model.Post;
import com.javatpoint.model.User;
import com.javatpoint.service.MapStructMapper;
import com.javatpoint.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserRepository userRepository;
    private MapStructMapper mapper;

    @Autowired
    public UserController(UserRepository userRepository, MapStructMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @GetMapping("/get")
    public ResponseEntity<List<User>> getUsers(){
        try {
            List<User> users= new ArrayList<>();
            userRepository.findAll().forEach(e->users.add(e));
            return new ResponseEntity<>(users,HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        User u = userRepository.findById(id).orElse(null);
        if(u != null){
            return new ResponseEntity<>(u, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User u){
        try{
            User newUser=userRepository.save(u);
            return new ResponseEntity<>(newUser,HttpStatus.CREATED);

        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping ("/update/{id}")
    public ResponseEntity<User> updateUser2(@PathVariable long id ,@RequestBody User u1){
        User u = userRepository.findById(id).orElse(null);
        if(u != null){
            u.setImage(u1.getImage());
            u.setFirstName(u1.getFirstName());
            u.setLastName(u1.getLastName());
            u.setStatus(u1.getStatus());
            u.setPassword(u1.getPassword());
            userRepository.save(u);
            return new ResponseEntity<>(u,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/logIn")
    public ResponseEntity userLogIn(@RequestBody User u){
        User u1=userRepository.findByMail(u.getMail());
        if(u1 != null){
            if(u1.getPassword().equals(u.getPassword()) )
                return new ResponseEntity(u1,HttpStatus.OK);
            else
                return new ResponseEntity(u1,HttpStatus.UNAUTHORIZED);
        }
        else
            return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    }