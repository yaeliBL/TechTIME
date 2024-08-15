package com.javatpoint.controller;
import com.javatpoint.dto.PostDTO;
import com.javatpoint.dto.UserDTO;
import com.javatpoint.model.Comment;
import com.javatpoint.model.Post;
import com.javatpoint.model.User;
import com.javatpoint.service.CommentRepository;
import com.javatpoint.service.MapStructMapper;
import com.javatpoint.service.PostRepository;
import com.javatpoint.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;



@CrossOrigin
@RestController
@RequestMapping("/api/post")
public class PostController {
    

    private PostRepository postRepository;
private CommentRepository commentRepository;
    private MapStructMapper mapper;
    private static String UPLOAD_DIRECTORY = System.getProperty("user.dir")+"\\images\\";

    @Autowired
    public PostController(PostRepository postRepository, MapStructMapper mapper, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.mapper = mapper;
        this.commentRepository= commentRepository;
    }

    @GetMapping("/get")
    public ResponseEntity<List< PostDTO>> getPosts(){
        try {
            List<Post> posts= new ArrayList<>();
            postRepository.findAll().forEach(e->posts.add(e));
            return new ResponseEntity<>(mapper.postToDTO(posts),HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable long id){
      Post p = postRepository.findById(id).orElse(null);
      if(p != null){
          return new ResponseEntity(p,HttpStatus.OK);
      }
      else{
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }

    @PostMapping("/create")
    public ResponseEntity<Post> create(@RequestBody PostDTO p) throws IOException {
        try{
            Post newPost=postRepository.save(mapper.dtoToPost(p));
            return new ResponseEntity<>(newPost,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR)  ;
        }
    }

    @GetMapping("/getdto/{id}")
    public ResponseEntity<PostDTO> getDTO(@PathVariable long id) throws IOException {
      Post p = postRepository.findById(id).orElse(null);
      if(p != null){
          return new ResponseEntity<>(mapper.PostToDTO(p), HttpStatus.OK);
      }
      else{
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }


    @DeleteMapping ("/deletePostById")
    public ResponseEntity deletePostById(@RequestBody Post p){
        try {
            p.getComment().forEach(e-> commentRepository.deleteById(e.getId()));
            postRepository.deleteById(p.getId());
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/getByUser")
//    public ResponseEntity<List< PostDTO>> getPostsByUser(User u){
//        try {
//            List<Post> posts= new ArrayList<>();
//            postRepository.findAllByUser(u).forEach(e->posts.add(e));
//            return new ResponseEntity<>(mapper.postToDTO(posts),HttpStatus.OK);
//        }
//        catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }





}

